import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";

export default function RouteChangeTracker() {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      path: location.pathname,
      location: location.pathname,
      title: location.pathname,
    });
  }, [location]);

  return null;
}
