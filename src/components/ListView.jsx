import React from "react";
import ListItem from "./ListItem";
const ListView = ({ currentPageItems }) => {
  return (
    <div className=" flex flex-col ">
      <div className="h-4/5">
        {currentPageItems &&
          currentPageItems.map((file, id) => (
            <div key={id + "0" + file.id} className="flex items-baseline">
              <div className="flex-grow">
                <ListItem file={file} />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ListView;
