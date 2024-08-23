import { createServerSideClient } from "@/lib/supabase";

/**
 * 변수가 추가된 이유 (배경)
- 2.1 서버 액션의 경우에는 서버 사이드 랜더링 도중에 호출될 수 있습니다. 이러한 환경에서는 서버는 쿠키 조작이 불가능 합니다.
- 또 다른 경우에는요.  
- 2.2 서버 액션은 라우터 핸들러, 혹은 미들웨어에서도 호출될 수 있습니다. 이러한 환경에서는 서버는 쿠키 조작이 가능합니다.    
3.serverComponent 변수가 추가된 이유 (해결)  
- 2.1 같은 환경을 분기처리하기 위해 serverComponent 변수가 추가 되었습니다.  
- 서버 액션은 다양한 컨텍스트에서 활용될 수 있으므로 액션의 호출된 컨텍스트가 붙게되는겁니다.!  
 */
export const getUser = async ({ serverComponent = false }) => {
  const supabase = await createServerSideClient(serverComponent);
  const user = await supabase.auth.getUser();
  return user?.data?.user;
};
