import React from "react";
import { useLocation } from "react-router-dom";
import { GoHome } from "./GoHome";

const NotFound = () => {
  const location = useLocation();
  return (
    <div>
      <header className="text-3xl my-10">Not Found Pages</header>

      <div className="my-6">
        Path Not Found :
        <p className="text-xl font-bold"> {location.pathname}</p>
      </div>
      <div className="flex justify-center w-30">
        <GoHome />
      </div>
    </div>
  );
};

export default NotFound;
