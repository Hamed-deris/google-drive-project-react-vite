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
      <div className="flex flex-col h-40 rounded-md items-baseline border border-blue-200  hover:bg-blue-50">
        <div className="flex w-full p-3 justify-between">
          <input
            onChange={(e) => handleInsert(e, file)}
            className="h-4 w-4"
            type="checkbox"
          />
          <img className="w-8 m-1 rounded-md" src={file.iconLink} />
        </div>
        <div className=" mt-auto h-5/6 p-2 w-full bg-blue-100 break-words overflow-hidden">
          <p className=" text-gray-600 text-sm cursor-default">{file.name}</p>
        </div>
      </div>
    </ContextMenu>
  );
};

export default GridItem;
