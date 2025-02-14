import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import createMiddleware from "next-intl/middleware";
import {routing} from "./i18n/routing";

// export function middleware(request: NextRequest) {
//   // TODO: Feel free to remove this block
//   if (request.headers?.get("host")?.includes("next-enterprise.vercel.app")) {
//     return NextResponse.redirect("https://blazity.com/open-source/nextjs-enterprise-boilerplate", { status: 301 })
//   }
// }

export default createMiddleware(routing);

export const config = {
  matcher: ['/', '/(zh|en)/:path*']
}
