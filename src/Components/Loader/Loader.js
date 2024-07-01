import React from "react";
import "./LoaderStyle.css";
const Loader = () => {
  return (
    <>
      <section className="loader-main-section">
        <div className="loading">
          <svg
            viewBox="0 0 187.3 93.7"
            height="200px"
            width="300px"
            className="svgbox"
          >
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="pink" />
                <stop offset="100%" stopColor="blue" />
              </linearGradient>
            </defs>
            <path
              stroke="url(#gradient)"
              d="M93.9,46.4c9.3,9.5,13.8,17.9,23.5,17.9s17.5-7.8,17.5-17.5s-7.8-17.6-17.5-17.5c-9.7,0.1-13.3,7.2-22.1,17.1c-8.9,8.8-15.7,17.9-25.4,17.9s-17.5-7.8-17.5-17.5s7.8-17.5,17.5-17.5S86.2,38.6,93.9,46.4z"
            />
          </svg>
        </div>
      </section>
    </>
  );
};

export default Loader;
