import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { paymentDb, prepareOrder, razorpay } from "@/lib/razorpay-server";
export const runtime = "nodejs";
export async function POST(request: NextRequest) {
  try {
    const order = await prepareOrder(await request.json());
    const amount = Math.round(order.totalAmount * 100);
    const gateway = await razorpay("orders", { amount, currency: "INR", receipt: randomUUID() });
    const { error } = await paymentDb().from("payment_attempts").insert({ razorpay_order_id: gateway.id, amount, order_data: order });
    if (error) throw new Error("Could not prepare payment. Apply the Razorpay database migration before trying again.");
    return NextResponse.json({ id: gateway.id, amount, keyId: process.env.RAZORPAY_KEY_ID });
  } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Could not start payment." }, { status: 400 }); }
}
