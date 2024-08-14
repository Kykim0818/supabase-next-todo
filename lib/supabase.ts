import { Database } from "@/types/database.types";
import { createServerClient } from "@supabase/ssr";
import { getCookie, setCookie } from 'cookies-next';
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// ServerActions ,RouterHandler
// 서버컴포넌트가 아니여야 쿠키를 조작할 수 있다.
export const createServerSideClient = async (serverComponent = false) => {
  const cookieStore = cookies();
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      // cookies 관련 해당 추상화된 요청들이 들어오면 아래와 같은 내용이 실행되게 하겠다는 의미
      cookies: {
        get: (key) => cookieStore.get(key)?.value,
        set: (key, value, options) => {
          if (serverComponent) return;
          cookieStore.set(key, value, options);
        },
        remove: (key, options) => {
          if (serverComponent) return;
          cookieStore.set(key, "", options);
        },
      },
    }
  );
};

// - RSC
export const createServerSideClientRSC = async () => {
  return createServerSideClient(true);
};

// - Middleware
export const createServerSideMiddleware = async (
  req: NextRequest,
  res: NextResponse
) => {
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      // cookies 관련 해당 추상화된 요청들이 들어오면 아래와 같은 내용이 실행되게 하겠다는 의미
      cookies: {
        get: (key) => getCookie(key, { req, res}),
        set: (key, value, options) => {
          setCookie(key, value, {req,res, ...options});
        },
        remove: (key, options) => {
          setCookie(key, "", {req,res, ...options});
        },
      },
    }
};
