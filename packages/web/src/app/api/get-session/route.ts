import { auth } from "@/actions";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  return NextResponse.json({ session });
}
