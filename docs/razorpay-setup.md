# Razorpay checkout setup

The supplied Razorpay test keys and public Supabase credentials are saved in `.env.local`.

1. Add `SUPABASE_SERVICE_ROLE_KEY` to `.env.local` from the Supabase project's API settings. This is a server secret; never use a `NEXT_PUBLIC_` prefix.
2. Apply `migrations/product-size-stock.sql` if it has not been applied, then `migrations/razorpay-payments.sql` in the Supabase SQL editor.
3. Restart the development server so it loads the new environment variables.
4. Test a successful payment, cancellation, failed payment, and repeated verification. A successful payment creates one order and reduces stock once; cancellation retains the cart. The browser saves a successful payment receipt until confirmation, so retrying checkout verifies that receipt before opening another payment.

Prices, coupons and stock are checked on the server. The payment secret is never returned to the browser. Orders and inventory are committed together after capture, using a server-only database function. Payment status and gateway IDs are stored on the order.

Stock is rechecked when payment completes. If another customer has bought the last unit during payment, confirmation stays pending with the payment ID shown to the customer. Support must resolve availability or refund through Razorpay. If the browser closes before receiving the payment receipt, support must reconcile the payment in Razorpay with the saved record in `payment_attempts`.

The configured `rzp_test_` keys do not collect real money. Switch to live credentials in the deployment environment when ready.
