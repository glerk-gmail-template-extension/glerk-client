import googleLogo from "../../assets/images/google.png";

export default function Login() {
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
            <a href="/" className="underline text-primary hover:font-medium">
              SING UP
            </a>
          </p>
        </div>
        <div className="my-10">
          <button className="flex items-center justify-center space-x-2 w-full py-2.5 px-5 text-sm font-medium rounded-lg border border-stroke">
            <img src={googleLogo} alt="google logo" className="w-5 h-5" />
            <span>Continue With Google</span>
          </button>
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
