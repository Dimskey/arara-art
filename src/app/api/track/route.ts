import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "edge";
export const dynamic = "force-dynamic";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const data = {
    ip:
      req.headers.get("x-real-ip") ??
      req.headers.get("x-forwarded-for"),

    country:
      req.headers.get("x-vercel-ip-country") ?? "Unknown",

    country_region:
      req.headers.get("x-vercel-ip-country-region"),

    city:
      req.headers.get("x-vercel-ip-city"),

    page:
      req.headers.get("referer") ?? "/",

    user_agent:
      req.headers.get("user-agent"),

  };

  const { error } = await supabase
    .from("visit_events")
    .insert(data);

  if (error) {
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
