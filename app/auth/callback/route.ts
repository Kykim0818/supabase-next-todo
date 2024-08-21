import { NextResponse } from "next/server";
import { createServerSideClient } from "@/lib/supabase";

export async function GET(request: Request) {
  const overrideOrigin = process.env.NEXT_PUBLIC_AUTH_REDIRECT_TO_HOME;

  const { searchParams, origin } = new URL(request.url);
  console.log(">>> searchParmas", searchParams);
  console.log(">>> origin", origin);

  /** 인증 코드 값 */
  const code = searchParams.get("code");
  /** 이후 route 주소 */
  const next = searchParams.get("next");
  console.log(">>> code", code);
  console.log(">>> next", next);

  if (code) {
    const supabase = await createServerSideClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) return NextResponse.redirect(`${overrideOrigin}`);

    return NextResponse.redirect(`${overrideOrigin}${next}`);
  }
  return NextResponse.redirect(`${overrideOrigin}`);
}
