-- Apply after product-size-stock.sql. Payment data is available only to the server.
CREATE TABLE IF NOT EXISTS public.payment_attempts (
  razorpay_order_id TEXT PRIMARY KEY,
  amount BIGINT NOT NULL CHECK (amount > 0),
  order_data JSONB NOT NULL,
  razorpay_payment_id TEXT UNIQUE,
  order_id UUID REFERENCES public.orders(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.payment_attempts ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.payment_attempts FROM anon, authenticated;
GRANT ALL ON public.payment_attempts TO service_role;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS razorpay_order_id TEXT UNIQUE;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS razorpay_payment_id TEXT UNIQUE;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS payment_status TEXT;

CREATE OR REPLACE FUNCTION public.finalize_razorpay_order(gateway_order_id TEXT, gateway_payment_id TEXT)
RETURNS JSONB LANGUAGE plpgsql SECURITY INVOKER SET search_path = public AS $$
DECLARE attempt public.payment_attempts%ROWTYPE; result JSONB;
BEGIN
  SELECT * INTO attempt FROM public.payment_attempts WHERE razorpay_order_id = gateway_order_id FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'Unknown payment order'; END IF;
  IF attempt.order_id IS NOT NULL THEN
    IF attempt.razorpay_payment_id IS DISTINCT FROM gateway_payment_id THEN RAISE EXCEPTION 'Payment mismatch'; END IF;
    SELECT to_jsonb(o) INTO result FROM public.orders o WHERE id = attempt.order_id;
    RETURN result;
  END IF;
  result := public.place_order_with_stock(attempt.order_data);
  UPDATE public.orders SET razorpay_order_id = gateway_order_id, razorpay_payment_id = gateway_payment_id, payment_status = 'Paid' WHERE id = (result->>'id')::UUID;
  UPDATE public.payment_attempts SET order_id = (result->>'id')::UUID, razorpay_payment_id = gateway_payment_id WHERE razorpay_order_id = gateway_order_id;
  SELECT to_jsonb(o) INTO result FROM public.orders o WHERE id = (result->>'id')::UUID;
  RETURN result;
END;
$$;
REVOKE ALL ON FUNCTION public.finalize_razorpay_order(TEXT, TEXT) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.finalize_razorpay_order(TEXT, TEXT) TO service_role;
