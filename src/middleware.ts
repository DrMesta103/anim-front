import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const routeConfig: Record<string, { requiresAuth: boolean; allowedRoles?: string[] }> = {
  "/admin": { requiresAuth: true, allowedRoles: ["admin"] },
  "/secretary": { requiresAuth: true, allowedRoles: ["secretary"] },
  "/login": { requiresAuth: false },
};

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const pathname = req.nextUrl.pathname;

  const backendUrl =
    process.env.INTERNAL_BACKEND_URL ||
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    process.env.NEXT_PUBLIC_BACKEND_URL_LOCAL ||
    "http://localhost:4000";

  let role: string | undefined = undefined;

  if (token) {
    try {
      const res = await fetch(`${backendUrl}/auth/role`, {
        method: "GET",
        headers: {
          cookie: `token=${token}`,
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      });

      if (res.ok) {
        const json = await res.json();
        role = json?.data?.role || json?.role;
      } else {
        console.error(`Middleware auth check failed (status ${res.status}) for ${pathname}`);
      }
    } catch (err) {
      console.error("Middleware fetch error:", err);
    }
  }

  for (const path in routeConfig) {
    if (pathname.startsWith(path)) {
      if (!routeConfig[path].requiresAuth) {
        if (role) {
          return NextResponse.redirect(new URL(`/${role}`, req.url));
        }
        return NextResponse.next();
      }

      if (!role || !routeConfig[path].allowedRoles?.includes(role)) {
        if (role) {
          return NextResponse.redirect(new URL(`/${role}`, req.url));
        }
        const loginUrl = new URL("/login", req.url);
        loginUrl.searchParams.set("redirectedFrom", pathname);
        return NextResponse.redirect(loginUrl);
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|static|favicon.ico).*)"],
};
