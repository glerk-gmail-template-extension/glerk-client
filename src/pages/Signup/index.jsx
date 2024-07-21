import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useSetAtom } from "jotai";

import axios from "../../api/axiosConfig";
import { toastMessageAtom, isLoggedInAtom } from "../../lib/atoms";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export default function Signup() {
  const navigate = useNavigate();
  const setToastMessage = useSetAtom(toastMessageAtom);
  const setIsLoggedIn = useSetAtom(isLoggedInAtom);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  const handleSignupSuccess = async (response) => {
    const idToken = response.credential;

    try {
      const res = await axios.post("/v1/oauth/signup", { idToken });

      const token = res.headers.authorization.split(" ")[1];
      localStorage.setItem("token", token);
      setIsLoggedIn(true);

      navigate("/");
    } catch (error) {
      const { status } = error.response;

      if (status === 404 || status === 409) {
        setToastMessage(error.response.data);
      } else {
        console.error("Error during signup:", error);
      }
    }
  };

  const handleSignupError = (error) => {
    console.error(error);
  };

  return (
    <main className="flex items-center justify-center h-screen bg-ghost-white">
      <section className="p-12 bg-white rounded-lg w-100 h-120 shadow-3xl">
        <header className="text-4xl text-center font-roboto">Glerk</header>
        <div className="my-10">
          <p className="font-light">REGISTER NOW 🌱</p>
          <p className="text-2xl font-bold tracking-wide">Sign Up For Free</p>
        </div>
        <div>
          <p className="text-sm font-light">
            ALREADY HAS AN ACCOUNT?
            <Link
              to="/login"
              className="ml-1 underline text-primary hover:font-medium"
            >
              LOG IN
            </Link>
          </p>
        </div>
        <div className="my-10">
          <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <GoogleLogin
              text="signup_with"
              width="300px"
              shape="pill"
              onSuccess={handleSignupSuccess}
              onError={handleSignupError}
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
