import React from "react";
import SearchBar from "./SearchBar";
import StateBar from "./StateBar";

const Navbar = () => {
  return (
    <div className=" sticky top-0 z-20 space-y-4 pt-8 flex flex-col h-40 bg-gray-50">
      <SearchBar />
      <StateBar />
    </div>
  );
};

export default Navbar;
