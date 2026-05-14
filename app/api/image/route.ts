import { NextRequest, NextResponse } from "next/server";
import { verifyImageSignature } from "@/lib/signed-image";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const src = request.nextUrl.searchParams.get("src") ?? "";
  const sig = request.nextUrl.searchParams.get("sig") ?? "";
  const allowed = src.startsWith("/images/") && !src.includes("..");

  if (!allowed || !(await verifyImageSignature(src, sig))) {
    return new NextResponse("Invalid image signature", { status: 403 });
  }

  const response = NextResponse.redirect(new URL(src, request.url));
  response.headers.set("Cache-Control", "public, max-age=31536000, immutable, stale-while-revalidate=86400");
  response.headers.set("X-Content-Type-Options", "nosniff");
  return response;
}
