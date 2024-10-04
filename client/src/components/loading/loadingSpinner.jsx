import React from "react";

// Material Tailwind Component
import { Spinner } from "@material-tailwind/react";

const LoadingSpinner = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Spinner className="h-16 w-16" color="blue" />
    </div>
  );
};

export default LoadingSpinner;
