import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";

const usePageTracking = () => {
  const location = useLocation();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const measurementId = import.meta.env.VITE_MEASUREMENT_ID;

    if (!window.location.href.includes("localhost") && measurementId) {
      ReactGA.initialize(measurementId);
      setInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (initialized) {
      ReactGA.send({
        hitType: "pageview",
        page: location.pathname + location.search,
      });
    }
  }, [initialized, location]);
};

export default usePageTracking;
