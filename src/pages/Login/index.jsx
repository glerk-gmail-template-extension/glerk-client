import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useSetAtom, useAtom } from "jotai";

import axios from "../../api/axiosConfig";
import { toastMessageAtom, userAsyncAtom } from "../../lib/atoms";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export default function Login() {
  const navigate = useNavigate();
  const setToastMessage = useSetAtom(toastMessageAtom);
  const [user, fetchUser] = useAtom(userAsyncAtom);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const handleLoginSuccess = async (response) => {
    const idToken = response.credential;

    try {
      await axios.post("/v1/oauth/login", { idToken });
      await fetchUser();

      navigate("/");
    } catch (error) {
      const { status } = error.response;

      if (status === 404) {
        setToastMessage({ message: error.response.data, isWarning: true });
      } else {
        console.error("Error during login:", error);
      }
    }
  };

  const handleLoginError = (error) => {
    console.error("Error during login:", error);
  };

  return (
    <main className="flex items-center justify-center h-screen bg-ghost-white">
      <section className="p-12 bg-white rounded-lg w-100 h-120 shadow-3xl">
        <header className="text-4xl text-center font-roboto">Glerk</header>
        <div className="my-10">
          <p className="font-light">WELCOME BACK 🙌</p>
          <p className="text-2xl font-bold tracking-wide">Log In To Glerk</p>
        </div>
        <div>
          <p className="text-sm font-light">
            계정이 없으신가요?{" "}
            <Link
              to="/signup"
              className="ml-1 underline text-primary hover:font-medium"
            >
              회원가입으로 이동
            </Link>
          </p>
        </div>
        <div className="my-10">
          <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <GoogleLogin
              text="signin_with"
              width="300px"
              shape="pill"
              onSuccess={handleLoginSuccess}
              onError={handleLoginError}
            />
          </GoogleOAuthProvider>
        </div>
        <div className="text-xs text-center font-extralight">
          <p>
            동의 후에는, 해당 서비스의{" "}
            <a href="/" className="font-normal">
              이용약관
            </a>{" "}
            및{" "}
          </p>
          <p>
            <a href="/" className="font-normal">
              개인정보처리방침
            </a>
            에 따라 정보가 관리됩니다.
          </p>
        </div>
      </section>
    </main>
  );
}
