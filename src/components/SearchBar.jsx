import axios from "axios";
import { useStoreActions, useStoreState } from "easy-peasy";
import React, { useEffect, useRef, useState } from "react";
import SignOut from "./SignOut";

const SearchBar = () => {
  const { setSearchedFile } = useStoreActions((a) => a);
  const { token, searchedFile } = useStoreState((s) => s);
  const AUTH_TOKEN = `Bearer ${token}`;
  const [searchedValue, setSearchedValue] = useState(null);
  const [searching, setSearching] = useState(false);
  const [searchingDone, setSearchingDone] = useState(false);
  const searchedRef = useRef();
  let getFiles = [];
  let nextPageTokenList = "";
  const getDataApi = async () => {
    if (token) setSearching(true);
    try {
      await axios
        .get(`https://www.googleapis.com/drive/v3/files`, {
          headers: { Authorization: AUTH_TOKEN },
          params: {
            pageSize: 100,
            q: `name contains "${searchedValue}"`,
            fields: "nextPageToken,files(*)", //id,name,iconLink,permissionIds
            pageToken: nextPageTokenList ? nextPageTokenList : "",
          },
        })
        .then(async (res) => {
          nextPageTokenList = res.data.nextPageToken;
          getFiles = [...getFiles, ...res.data.files];
          setSearchedFile(getFiles);
          if (nextPageTokenList !== undefined) {
            getDataApi();
          }
          if (getFiles.length === 0) {
            setSearchingDone(true);
          }
        });
    } catch (err) {
      console.log(err);
    } finally {
      setSearching(false);
    }
  };
  useEffect(() => {
    if (searchedValue !== null) {
      getDataApi();
    }
  }, [searchedValue]);
  return (
    <div className="flex">
      <input
        ref={searchedRef}
        className=" flex-grow pl-3 rounded-l-lg p-2 border-l border-t border-b focus:outline-none  focus:border-blue-700 border-blue-600"
        type="text"
        placeholder="Search..."
      />
      {searching && (
        <div className="border-t border-b self-center py-2  bg-white border-blue-600  ">
          Searching...
        </div>
      )}
      {searchingDone && (
        <div className="border-t border-b self-center py-2  bg-white border-blue-600  ">
          no file found!{" "}
        </div>
      )}
      <button
        onClick={() => {
          setSearchedValue(null);
          setSearchedFile([]);
          setSearchingDone(false);
          searchedRef.current.value = null;
        }}
        className="border-t border-b  bg-white border-blue-600  "
      >
        <svg
          className="stroke-current text-gray-300 hover:text-blue-500 mx-2 w-6"
          viewBox="0 0 20 20"
        >
          <path
            fill="none"
            d="M12.71,7.291c-0.15-0.15-0.393-0.15-0.542,0L10,9.458L7.833,7.291c-0.15-0.15-0.392-0.15-0.542,0c-0.149,0.149-0.149,0.392,0,0.541L9.458,10l-2.168,2.167c-0.149,0.15-0.149,0.393,0,0.542c0.15,0.149,0.392,0.149,0.542,0L10,10.542l2.168,2.167c0.149,0.149,0.392,0.149,0.542,0c0.148-0.149,0.148-0.392,0-0.542L10.542,10l2.168-2.168C12.858,7.683,12.858,7.44,12.71,7.291z M10,1.188c-4.867,0-8.812,3.946-8.812,8.812c0,4.867,3.945,8.812,8.812,8.812s8.812-3.945,8.812-8.812C18.812,5.133,14.867,1.188,10,1.188z M10,18.046c-4.444,0-8.046-3.603-8.046-8.046c0-4.444,3.603-8.046,8.046-8.046c4.443,0,8.046,3.602,8.046,8.046C18.046,14.443,14.443,18.046,10,18.046z"
          ></path>
        </svg>
      </button>
      <button
        onClick={() => {
          if (
            searchedRef.current.value !== "" &&
            searchedRef.current.value !== null
          )
            setSearchedValue(searchedRef.current.value);
        }}
        className="border rounded-r-lg  mr-1 border-blue-600 "
      >
        <svg
          className="stroke-current text-gray-300 hover:text-blue-500 w-6 mx-2 "
          viewBox="0 0 20 20"
        >
          <path
            fill="none"
            d="M18.109,17.776l-3.082-3.081c-0.059-0.059-0.135-0.077-0.211-0.087c1.373-1.38,2.221-3.28,2.221-5.379c0-4.212-3.414-7.626-7.625-7.626c-4.212,0-7.626,3.414-7.626,7.626s3.414,7.627,7.626,7.627c1.918,0,3.665-0.713,5.004-1.882c0.006,0.085,0.033,0.17,0.098,0.234l3.082,3.081c0.143,0.142,0.371,0.142,0.514,0C18.25,18.148,18.25,17.918,18.109,17.776zM9.412,16.13c-3.811,0-6.9-3.089-6.9-6.9c0-3.81,3.089-6.899,6.9-6.899c3.811,0,6.901,3.09,6.901,6.899C16.312,13.041,13.223,16.13,9.412,16.13z"
          ></path>
        </svg>
      </button>
      <SignOut />
      {/* link to google drive */}
      <a
        href="https://accounts.google.com/signin/v2/identifier?service=wise&passive=true&continue=http%3A%2F%2Fdrive.google.com%2F%3Futm_source%3Den&utm_medium=button&utm_campaign=web&utm_content=gotodrive&usp=gtd&ltmpl=drive&flowName=GlifWebSignIn&flowEntry=ServiceLogin"
        className="border flex rounded-lg px-4 p-1 content-center border-blue-600 text-blue-600
      hover:bg-blue-600 ml-1 hover:text-white"
      >
        <p className="text-lg mr-2">Go to</p>
        <svg
          className="w-6"
          viewBox="0 0 87.3 78"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z"
            fill="#0066da"
          />
          <path
            d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0 -1.2 4.5h27.5z"
            fill="#00ac47"
          />
          <path
            d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z"
            fill="#ea4335"
          />
          <path
            d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z"
            fill="#00832d"
          />
          <path
            d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z"
            fill="#2684fc"
          />
          <path
            d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z"
            fill="#ffba00"
          />
        </svg>
      </a>
    </div>
  );
};

export default SearchBar;
