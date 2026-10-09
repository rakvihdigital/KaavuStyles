-- Repair the installed function without changing orders or stock.
-- gen_random_uuid is built into PostgreSQL and does not require the uuid-ossp search path.
DO $$
DECLARE definition TEXT;
BEGIN
  SELECT pg_get_functiondef('public.place_order_with_stock(jsonb)'::regprocedure) INTO definition;
  EXECUTE replace(definition, 'uuid_generate_v4()', 'gen_random_uuid()');
END;
$$;
NOTIFY pgrst, 'reload schema';
