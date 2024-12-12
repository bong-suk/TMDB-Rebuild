import { useEffect } from "react";
import { useUser } from "../contexts/UserContext";
import { useSupabase } from "../contexts/useSupabaseAuth";

const useAuthSession = () => {
  const { setUser } = useUser();
  const supabase = useSupabase();
  const user = useUser().user;

  // async/await을 사용하여 초기 세션 확인
  const initializeSession = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session) {
      setUser({
        id: session.user.id,
        email: session.user.email,
        profileImageUrl: session.user.user_metadata.profileImageUrl,
      });
    }
  };

  initializeSession(); // useAuthSession 호출 시 실행

  useEffect(() => {
    // 세션 변경 감지
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      // 현재 user 상태와 비교하여 변경된 경우에만 setUser 호출
      const isUserChanged =
        (session && !user) || // user 정보를 외부에서 가져와 사용
        (!session && user) ||
        (session &&
          user &&
          (session.user.id !== user.id ||
            session.user.email !== user.email ||
            session.user.user_metadata.profileImageUrl !==
              user.profileImageUrl));

      if (isUserChanged) {
        if (session) {
          setUser({
            id: session.user.id,
            email: session.user.email,
            profileImageUrl: session.user.user_metadata.profileImageUrl,
          });
        } else {
          setUser(null);
        }
      }
    });

    // 컴포넌트 unmount 시 리스너 제거
    return () => subscription.unsubscribe();
  }, [setUser, supabase.auth]); // dependency array에 setUser와 supabase.auth 추가
};

export default useAuthSession;
