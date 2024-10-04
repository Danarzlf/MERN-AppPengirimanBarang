// Error404.jsx
import React from "react";
import "../../components/styles/Error404.css";

const Error404 = () => {
  return (
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <h1>Oops!</h1>
        </div>
        <h2>404 - Page not found</h2>
        <p>
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <a href="/">Go To Homepage</a>
      </div>
    </div>
  );
};

export default Error404;
