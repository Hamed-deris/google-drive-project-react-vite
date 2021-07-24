import axios from "axios";
import { useStoreActions, useStoreState } from "easy-peasy";
import React, { useEffect, useState } from "react";
import me from "./credentials";
import Navbar from "./Navbar";
import Pagination from "./Pagination";
import SignInPage from "./SignInPage";
const Home = () => {
  const { token, code, codeResponse, allFile, searchedFile } = useStoreState(
    (store) => store
  );
  const { setAllFile, setToken } = useStoreActions((action) => action);
  const [searchedFiles, setSearchedFiles] = useState([]);
  // ----------------------------------------------------------------------refresh token
  const handleGetRefreshToken = async () => {
    try {
      await axios
        .post(me.token_uri, {
          client_id: me.client_id,
          client_secret: me.client_secret,
          redirect_uri: me.redirect_uris[0],
          refresh_token: codeResponse.refresh_token,
          grant_type: "refresh_token",
        })
        .then((res) => {
          setToken(res.data.access_token);
          sessionStorage.setItem(
            "oauth2Token",
            JSON.stringify(res.data.access_token)
          );
        });
    } catch (res) {
      console.log(res);
    }
  };

  // handle refresh token
  function handleRefreshToken() {
    if (code && token && codeResponse.refresh_token) {
      setTimeout(() => {
        handleGetRefreshToken();
      }, 60000);
    } else {
      setInterval(() => {
        handleRefreshToken();
      }, 600000);
    }
  }
  // getDataApi ( token file id)
  let getFiles = [],
    nextPageToken = "";
  const getDataApi = async () => {
    const AUTH_TOKEN = `Bearer ${token}`;
    if (token)
      try {
        await axios
          .get(`https://www.googleapis.com/drive/v3/files`, {
            headers: { Authorization: AUTH_TOKEN },
            params: {
              pageSize: 100,
              q: `'root' in parents`,
              fields:
                "nextPageToken,files(id,name,mimeType,iconLink,webViewLink,webContentLink)", //id,name,iconLink,permissionIds
              pageToken: nextPageToken ? nextPageToken : "",
            },
          })
          .then(async (res) => {
            nextPageToken = res.data.nextPageToken;
            getFiles = [...getFiles, ...res.data.files];
            setAllFile([...getFiles]);
            if (nextPageToken !== undefined) {
              getDataApi();
            }
          });
      } catch (err) {
        console.log(err);
      }
  };

  // ---  --- --- --- ---  --- --- ---  ---  --- --- ---  ---  useEffect
  https: useEffect(() => {
    getDataApi();
  }, [token]);

  useEffect(() => {
    handleRefreshToken();
  }, []);
  useEffect(() => {
    setSearchedFiles(searchedFile);
  }, [searchedFile]);

  // ---  --- --- --- ---  --- --- ---  ---  --- --- ---  ---  --- --- ---  ---  --- --- ---

  if (code === null && token === null) {
    return <SignInPage />;
  } else if (code !== null && token === null) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-800">
        Please wait is loading...
      </div>
    );
  } else {
    return (
      <>
        <Navbar />
        {searchedFile.length !== 0 && <Pagination allFile={searchedFiles} />}
        {searchedFile.length === 0 && <Pagination allFile={allFile} />}
      </>
    );
  }
};
export default Home;
