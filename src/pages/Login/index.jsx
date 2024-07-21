import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useSetAtom } from "jotai";

import axios from "../../api/axiosConfig";
import { toastMessageAtom, isLoggedInAtom } from "../../lib/atoms";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export default function Login() {
  const navigate = useNavigate();
  const setToastMessage = useSetAtom(toastMessageAtom);
  const setIsLoggedIn = useSetAtom(isLoggedInAtom);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  const handleLoginSuccess = async (response) => {
    const idToken = response.credential;

    try {
      const res = await axios.post("/v1/oauth/login", { idToken });

      const token = res.headers.authorization.split(" ")[1];
      localStorage.setItem("token", token);
      setIsLoggedIn(true);

      navigate("/");
    } catch (error) {
      const { status } = error.response;

      if (status === 404) {
        setToastMessage(error.response.data);
      } else {
        console.error("Error during signup:", error);
      }
    }
  };

  const handleLoginError = (error) => {
    console.error(error);
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
            DON&#39;T HAVE AN ACCOUNT?{" "}
            <Link
              to="/signup"
              className="ml-1 underline text-primary hover:font-medium"
            >
              SIGN UP
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
            By continuing, you agree to the{" "}
            <a href="/" className="font-normal">
              Terms of use
            </a>
            ,
          </p>
          <p>
            <a href="/" className="font-normal">
              Privacy Policy
            </a>{" "}
            preplaced.
          </p>
        </div>
      </section>
    </main>
  );
}
