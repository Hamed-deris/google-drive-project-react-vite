import axios from "axios";
import { useStoreState } from "easy-peasy";
import React, { useRef } from "react";

const ContextMenu = ({ children, file }) => {
  const contextRef = useRef();
  const { token } = useStoreState((s) => s);
  const AUTH_TOKEN = `Bearer ${token}`;
  const handleContextMenu = (e) => {
    e.preventDefault();
    contextRef.current.style.left = `${e.clientX - 20}px`;
    contextRef.current.style.top = `${e.clientY - 20}px`;
    contextRef.current.classList.remove("hidden");
  };
  const handleMouseLeave = () => {
    contextRef.current.classList.add("hidden");
  };
  const handleShowInNewPage = () => {
    window.open(file.webViewLink, "_blank");
  };
  const handleEmbed = async () => {
    try {
      axios
        .post(
          `https://www.googleapis.com/drive/v3/files/${file.id}/permissions?`,
          {
            role: "reader",
            type: "anyone",
          },
          {
            headers: { Authorization: AUTH_TOKEN },
          }
        )
        .then((res) => console.log(res));
    } catch (rej) {
      console.log(rej);
    }
  };
  return (
    <div onContextMenu={(e) => handleContextMenu(e)}>
      <div
        ref={contextRef}
        className="fixed hidden z-50  bg-blue-600 p-1.5 rounded-lg"
        onMouseOut={() => handleMouseLeave()}
      >
        <button
          onClick={() => {
            handleShowInNewPage();
            handleMouseLeave();
          }}
          className=" block rounded-t-md w-full text-left px-2 py-1 text-white hover:bg-blue-700"
        >
          Open in new page
        </button>
        <button
          onClick={() => {
            handleMouseLeave();
            handleEmbed();
          }}
          className="block rounded-b-md w-full text-left px-2 py-1 text-white hover:bg-blue-700"
        >
          Embed
        </button>
      </div>
      {children}
    </div>
  );
};

export default ContextMenu;
