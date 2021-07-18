import axios from "axios";
import { useStoreActions, useStoreState } from "easy-peasy";
import React, { useEffect, useRef, useState } from "react";
import ContextMenu from "./ContextMenu";
import ListView from "./ListView";

const ListItem = ({ file }) => {
  const { pushInserted, popInserted } = useStoreActions((action) => action);
  const { token } = useStoreState((store) => store);
  const [filesChild, setFilesChild] = useState([]);
  const childRef = useRef();
  const iconRotate = useRef();
  let [showChild, setShowChild] = useState(false);

  // handleShowFile toggle childe file

  // handleInsert
  const handleInsert = (e, file) => {
    if (e.target.checked) {
      pushInserted(file);
    } else {
      popInserted(file);
    }
  };

  // -------------------------------------------------------------------------------------------
  let getFiles = [];
  let nextPageTokenList = "";
  const getDataApi = async () => {
    const AUTH_TOKEN = `Bearer ${token}`;
    if (token)
      try {
        await axios
          .get(`https://www.googleapis.com/drive/v3/files`, {
            headers: { Authorization: AUTH_TOKEN },
            params: {
              pageSize: 100,
              q: `"${file.id}" in parents`,
              fields: "nextPageToken,files(*)", //id,name,iconLink,permissionIds
              pageToken: nextPageTokenList ? nextPageTokenList : "",
            },
          })
          .then(async (res) => {
            nextPageTokenList = res.data.nextPageToken;
            getFiles = [...getFiles, ...res.data.files];
            setFilesChild(getFiles);
            if (nextPageTokenList !== undefined) {
              getDataApi();
            }
          });
      } catch (err) {
        console.log(err);
      }
  };
  // -------------------------------------------------------------------------------------------
  // -------------------------------------------------------------------------------------------
  useEffect(() => {
    if (showChild) {
      iconRotate.current.classList.add("rotate-90");
      iconRotate.current.classList.add("text-blue-600");
      getDataApi();
    } else {
      if (iconRotate.current) {
        iconRotate.current.classList.remove("rotate-90");
        iconRotate.current.classList.remove("text-blue-600");
      }
    }
  }, [showChild]);
  // -------------------------------------------------------------------------------------------
  return (
    <ContextMenu file={file}>
      <div>
        <div className="flex space-x-2 items-center border-b border-blue-200 p-1 hover:bg-blue-50">
          <div className="flex-grow-0 w-6">
            {file.mimeType === "application/vnd.google-apps.folder" && (
              <svg
                onClick={() => setShowChild(!showChild)}
                ref={iconRotate}
                className="cursor-pointer mx-auto transform bg-gray-100 transition-all delay-75 stroke-current text-gray-400 w-4 z-10"
                viewBox="0 0 20 20"
              >
                <path d="M12.522,10.4l-3.559,3.562c-0.172,0.173-0.451,0.176-0.625,0c-0.173-0.173-0.173-0.451,0-0.624l3.248-3.25L8.161,6.662c-0.173-0.173-0.173-0.452,0-0.624c0.172-0.175,0.451-0.175,0.624,0l3.738,3.736C12.695,9.947,12.695,10.228,12.522,10.4 M18.406,10c0,4.644-3.764,8.406-8.406,8.406c-4.644,0-8.406-3.763-8.406-8.406S5.356,1.594,10,1.594C14.643,1.594,18.406,5.356,18.406,10M17.521,10c0-4.148-3.374-7.521-7.521-7.521c-4.148,0-7.521,3.374-7.521,7.521c0,4.147,3.374,7.521,7.521,7.521C14.147,17.521,17.521,14.147,17.521,10"></path>
              </svg>
            )}
          </div>
          <input
            className=" w-4 h-4 "
            onChange={(e) => handleInsert(e, file)}
            type="checkbox"
          />
          <img className="w-5" src={file.iconLink} />
          <p className="text-gray-700 cursor-default">{file.name}</p>
        </div>
        {showChild && (
          <div ref={childRef} className="ml-4">
            {filesChild.length === 0 && (
              <div className="flex justify-center mb-2 mt-1  text-gray-400">
                nothing here
              </div>
            )}
            {filesChild && <ListView currentPageItems={filesChild} />}
          </div>
        )}
      </div>
    </ContextMenu>
  );
};

export default ListItem;
