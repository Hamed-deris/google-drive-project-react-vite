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
    window.open(file.webViewLink.replace("drivesdk", "view"), "_blank");
  };

  const handleEmbed = () => {
    const { id } = file;
    console.log(id);
    try {
      axios
        .post(
          `https://www.googleapis.com/drive/v3/files/${id}/permissions?`,
          {
            role: "reader",
            type: "anyone",
            field: "role",
          },
          {
            headers: { Authorization: AUTH_TOKEN },
          }
        )
        .then((res) => {
          console.log(res);
        });
      // navigator.clipboard.writeText(eventContext.webViewLink);
      // console.log(eventContext.webViewLink);
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
        <div
          onClick={() => {
            handleShowInNewPage();
          }}
          className=" cursor-default rounded-t-md w-full text-left px-2 py-1 text-white hover:bg-blue-700"
        >
          Open in new page
        </div>
        <div
          onClick={() => {
            handleEmbed();
          }}
          className="cursor-default rounded-b-md w-full text-left px-2 py-1 text-white hover:bg-blue-700"
        >
          Embed and share
        </div>
      </div>
      {children}
    </div>
  );
};

export default ContextMenu;
