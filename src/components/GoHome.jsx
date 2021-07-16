import React from "react";
import { useHistory } from "react-router-dom";

export const GoHome = () => {
  const history = useHistory();
  const handleGoHome = () => {
    history.push("/");
  };
  return (
    <div
      className="border cursor-pointer rounded-lg px-4 p-2 border-blue-600 text-blue-600
  hover:bg-blue-600 mr-auto hover:text-white"
      onClick={() => handleGoHome()}
    >
      Home
    </div>
  );
};
