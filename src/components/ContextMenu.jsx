import axios from "axios";
import { useStoreState } from "easy-peasy";
import React, { useRef } from "react";

const ContextMenu = ({ children }) => {
  const contextRef = useRef();
  const { token, contextFile } = useStoreState((s) => s);
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
    window.open(contextFile.webViewLink.replace("drivesdk", "view"), "_blank");
  };

  const handleShare = () => {
    try {
      axios
        .post(
          `https://www.googleapis.com/drive/v3/files/${contextFile.id}/permissions?`,
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
          if (res.status === 200) {
            navigator.clipboard.writeText(
              contextFile.webViewLink.replace("drivesdk", "view")
            );
            console.log(contextFile.webViewLink.replace("drivesdk", "view"));
            alert("share link is copy in your clipboard");
          }
        });
    } catch (rej) {
      console.log(rej);
    }
  };
  return (
    <div onContextMenu={(e) => handleContextMenu(e)}>
      <div
        ref={contextRef}
        className="fixed hidden z-50 w-40 bg-blue-600 p-1.5 rounded-lg"
        onMouseLeave={() => handleMouseLeave()}
      >
        {contextFile.mimeType !== "application/vnd.google-apps.folder" && (
          <div
            onClick={() => {
              handleShowInNewPage();
            }}
            className=" cursor-default rounded-t-md w-full text-left px-2 py-1 text-white hover:bg-blue-700"
          >
            Open in new tab
          </div>
        )}
        <div
          onClick={() => {
            handleShare();
          }}
          className="cursor-default rounded-b-md w-full text-left px-2 py-1 text-white hover:bg-blue-700"
        >
          share
        </div>
      </div>
      {children}
    </div>
  );
};

export default ContextMenu;
