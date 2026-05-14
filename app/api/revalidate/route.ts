import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { ACTOR_CACHE_TAG } from "@/lib/actor-service";
import { canRevalidate } from "@/lib/policy";

export async function POST(request: NextRequest) {
  const token = request.headers.get("x-revalidate-token");
  const viewer = token && token === process.env.REVALIDATE_TOKEN
    ? { roles: ["admin" as const] }
    : { roles: ["public" as const] };

  if (!canRevalidate(viewer)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({ slug: "kashis-ray", locale: "en" }));
  const slug = typeof body.slug === "string" ? body.slug : "kashis-ray";
  const locale = typeof body.locale === "string" ? body.locale : "en";

  revalidateTag(ACTOR_CACHE_TAG, "max");
  revalidatePath(`/${locale}/actors/${slug}`);

  return NextResponse.json({
    ok: true,
    revalidated: {
      tag: ACTOR_CACHE_TAG,
      path: `/${locale}/actors/${slug}`
    }
  });
}
