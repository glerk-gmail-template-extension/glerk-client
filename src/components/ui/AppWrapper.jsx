import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAtom } from "jotai";

import App from "../../App";
import ToastMessage from "./ToastMessage";

import { toastMessageAtom, userAsyncAtom } from "../../lib/atoms";
import RouteChangeTracker from "../ga/RouteChangeTracker";

export default function AppWrapper() {
  const [toastMessage] = useAtom(toastMessageAtom);
  const [user, fetchUser] = useAtom(userAsyncAtom);

  const location = useLocation();
  const isAuthPath = ["/signup", "/login"].some(
    (url) => url === location.pathname,
  );

  useEffect(() => {
    const checkIsLoggedIn = async () => {
      await fetchUser();
    };

    checkIsLoggedIn();
  }, []);

  return (
    <div className="relative">
      <RouteChangeTracker />
      {isAuthPath && <Outlet />}
      {!isAuthPath && (user ? <App /> : <Navigate to="/signup" />)}
      {toastMessage.message && (
        <ToastMessage
          message={toastMessage.message}
          isWarning={toastMessage.isWarning}
        />
      )}
    </div>
  );
}
