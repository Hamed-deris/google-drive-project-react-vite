import { useStoreActions } from "easy-peasy";
import React from "react";
import ContextMenu from "./ContextMenu";

const GridItem = ({ file }) => {
  const { pushInserted, popInserted } = useStoreActions((a) => a); //action=>action
  const handleInsert = (e, file) => {
    if (e.target.checked) {
      pushInserted(file);
    } else {
      popInserted(file);
    }
  };
  return (
    <ContextMenu file={file}>
      <div className="flex flex-col h-60 rounded-md items-baseline border border-blue-200  hover:bg-blue-50">
        <div className="flex w-full p-3 justify-between">
          <input onChange={(e) => handleInsert(e, file)} className="" type="checkbox" />
          <img className="w-8 m-2" src={file.iconLink} />
        </div>
        <div className=" mt-auto h-3/5 w-full bg-blue-200 break-words overflow-hidden">
          <p className=" text-gray-600 m-2">{file.name}</p>
        </div>
      </div>
    </ContextMenu>
  );
};

export default GridItem;
