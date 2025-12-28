import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  const { data, error } = await supabase
    .from("visit_events")
    .select("country");

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  // GROUP MANUAL
  const grouped = data.reduce(
    (acc: Record<string, number>, row) => {
      const key = row.country ?? "Unknown";
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    },
    {}
  );

  
  const result = Object.entries(grouped)
    .map(([country, count]) => ({
      country,
      count,
    }))
    .sort((a, b) => b.count - a.count);

  return NextResponse.json(result);
}
