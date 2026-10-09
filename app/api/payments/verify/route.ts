import { NextRequest, NextResponse } from "next/server";
import { finalizePayment, validSignature } from "@/lib/razorpay-server";
export const runtime = "nodejs";
export async function POST(request: NextRequest) {
  try {
    const result = await request.json();
    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret || typeof result.razorpay_order_id !== "string" || typeof result.razorpay_payment_id !== "string" || typeof result.razorpay_signature !== "string" || !validSignature(`${result.razorpay_order_id}|${result.razorpay_payment_id}`, result.razorpay_signature, secret)) return NextResponse.json({ error: "Payment verification failed." }, { status: 400 });
    const order = await finalizePayment(result.razorpay_order_id, result.razorpay_payment_id);
    return NextResponse.json({ order });
  } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Could not verify payment." }, { status: 400 }); }
}
