import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => req.cookies.getAll(),
        setAll: (cookies) => {
          cookies.forEach(({ name, value, options }) => {
            res.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const pathname = req.nextUrl.pathname;

  if (pathname.includes("/admin/dashboard")) {
    if (!session) {
      return NextResponse.redirect(
        new URL(`/${pathname.split("/")[1]}/admin/login`, req.url)
      );
    }

    const adminEmails =
      process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(",") || [];

    if (!adminEmails.includes(session.user.email ?? "")) {
      return NextResponse.redirect(
        new URL(`/${pathname.split("/")[1]}/admin/login`, req.url)
      );
    }
  }

  return res;
}

export const config = {
  matcher: ["/:lang*/admin/:path*"],
};
