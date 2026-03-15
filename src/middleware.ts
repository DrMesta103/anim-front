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

  const role = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL_LOCAL}/auth/role`, {
    method: "GET",
    headers: {
      cookie: `token=${token}`,
    },
  })
    .then((res) => res.json())
    .then((res) => res.data.role)
    .catch(() => undefined);

  for (const path in routeConfig) {
    if (path.startsWith(pathname)) {
      console.log(path, routeConfig[path], role);
      if (!routeConfig[path].requiresAuth) {
        if (role) {
          return NextResponse.redirect(new URL(`/${role}`, req.url));
        }
        return NextResponse.next();
      }
      if (!routeConfig[path].allowedRoles?.includes(role)) {
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
