"use client";
import useHydrate from "@/hooks/useHydrate";
import { createSupabaseBrowserClient } from "@/lib/client/supabase";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useCallback, useEffect } from "react";

const AuthUI = () => {
  const [user, setUser] = useState()
  const supabase = createSupabaseBrowserClient();
  const isMount = useHydrate();

  const getUserInfo = useCallback(async () => {
    const result = await supabase.auth.getUser();
    console.log(result);
    if(result?.data?.user) setUser(result?.data?.user)
  }, [ supabase ]);

  const handleLogout = async () => {
    supabase.auth.signOut();
    window.location.reload();
  }

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: process.env.NEXT_PUBLIC_AUTH_REDIRECT_TO,
      }
    })
  }

  const handleGithubLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: process.env.NEXT_PUBLIC_AUTH_REDIRECT_TO,
      }
    })
  }

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo])

  if(!isMount) return null;

  return (
    <section className="w-full">
      <div>{user ? `로그인 됨 ${user?.email}` : "로그아웃"}</div>
      <>
        {user && <button className="border-2 border-black" onClick={handleLogout}>로그아웃</button>}
      </>
      <div className="mx-auto max-w-[500px]">
        AuthUId
        <Auth
          redirectTo={process.env.NEXT_PUBLIC_AUTH_REDIRECT_TO}
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          onlyThirdPartyProviders
          providers={["google", "github"]}
        />
      </div>
    </section>
  );
};
export default AuthUI;
