import axios from "axios";
import { useStoreState } from "easy-peasy";
import React, { useEffect, useState } from "react";
import { useParams, withRouter } from "react-router-dom";
import Navbar from "./Navbar";
import Pagination from "./Pagination";

const SelectedFolderGrid = () => {
  const params = useParams();
  const { token } = useStoreState((s) => s);
  const [state, setState] = useState([]);
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
              q: `"${params.folder_id}" in parents`,
              fields: "nextPageToken,files(*)", //id,name,iconLink,permissionIds
              pageToken: nextPageTokenList ? nextPageTokenList : "",
            },
          })
          .then(async (res) => {
            nextPageTokenList = res.data.nextPageToken;
            getFiles = [...getFiles, ...res.data.files];
            setState(getFiles);
            if (nextPageTokenList !== undefined) {
              getDataApi();
            }
          });
      } catch (err) {
        console.log(err);
      }
  };
  useEffect(() => {
    getDataApi();
  }, [params.folder_id]);
  return (
    <>
      <Navbar />
      <Pagination allFile={state} />
    </>
  );
};

export default withRouter(SelectedFolderGrid);
