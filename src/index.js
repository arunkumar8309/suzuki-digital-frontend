import React, { Suspense, lazy, useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import LoaderComponent from "./Components/Loader/Loader";

// Lazy load the App component
const LazyApp = lazy(() => import("./App"));

const root = ReactDOM.createRoot(document.getElementById("root"));

const Index = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Delay for 5 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      <React.StrictMode>
        <Suspense fallback={<LoaderComponent />}>
          {loading ? <LoaderComponent /> : <LazyApp />}
        </Suspense>
      </React.StrictMode>
    </BrowserRouter>
  );
};

root.render(<Index />);
