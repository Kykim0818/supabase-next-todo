import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  console.log("middleware 통과함");
  return response;
}

/** middleware 동작처리에 대한 설정 */
export const config = {
  matcher: ["/", "/todo-no-rls", "/api/:path*"],
};
