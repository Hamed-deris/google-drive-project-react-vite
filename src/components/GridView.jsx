import React from "react";
import { useHistory } from "react-router-dom";
import GridItem from "./GridItem";

const GridView = ({ currentPageItems }) => {
  const history = useHistory();
  const handleSelectedFolder = (file) => {
    history.push(`/${file.name}/${file.id}`);
  };
  return (
    <div className=" grid grid-cols-2 md:grid-cols-6 lg:grid-cols-8 sm:grid-cols-4  gap-1">
      {currentPageItems &&
        currentPageItems.map((file) => (
          <div
            key={"00" + file.id}
            onDoubleClick={() => {
              file.mimeType === "application/vnd.google-apps.folder" &&
                handleSelectedFolder(file);
            }}
          >
            <GridItem file={file} />
          </div>
        ))}
    </div>
  );
};
export default GridView;
