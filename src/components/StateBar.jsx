import { useStoreActions, useStoreState } from "easy-peasy";
import React from "react";
import { GoHome } from "./GoHome";

const StateBar = () => {
  const { toggleView, inserted } = useStoreState((store) => store);
  const { setToggleView } = useStoreActions((action) => action);
  //toggleView, setToggleView;
  return (
    <div className="flex gap-1">
      <button
        onClick={() => {
          setToggleView(!toggleView);
        }}
        className="flex border rounded-lg px-3 p-2 border-blue-600 "
      >
        {!toggleView && (
          <div className="flex flex-col gap-1 m-auto">
            <span className="block w-4 h-0.5 bg-blue-600"></span>
            <span className="block w-4 h-0.5 bg-blue-600"></span>
            <span className="block w-4 h-0.5 bg-blue-600"></span>
          </div>
        )}
        {toggleView && (
          <div className="grid grid-cols-2 m-auto gap-0.5">
            <span className="block w-2 h-2 bg-blue-600"></span>
            <span className="block w-2 h-2 bg-blue-600"></span>
            <span className="block w-2 h-2 bg-blue-600"></span>
            <span className="block w-2 h-2 bg-blue-600"></span>
          </div>
        )}
      </button>
      <GoHome />
      <button
        onClick={() => console.log(inserted)}
        className="border rounded-lg px-4 p-2 border-blue-600 text-blue-600 hover:bg-blue-600 ml-auto hover:text-white"
      >
        Insert
      </button>
      <span className="border rounded-lg px-4 p-2 border-blue-600 text-blue-600  ">
        Selected Item = {inserted.length}
      </span>
    </div>
  );
};

export default StateBar;
