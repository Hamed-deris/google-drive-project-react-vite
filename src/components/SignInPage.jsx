import axios from "axios";
import { useStoreActions, useStoreState } from "easy-peasy";
import React from "react";
import { useHistory } from "react-router-dom";
import me from "./credentials";
export default function SignInPage() {
  const { token, code, codeResponse, toggleView, allFile } = useStoreState(
    (store) => store
  );
  const { setCode, setToken, setCodeResponse } = useStoreActions(
    (action) => action
  );

  const history = useHistory();
  const urlLink = `${me.auth_uri}?scope=${me.scope}&include_granted_scopes=true&response_type=code&state=state_parameter_passthrough_value&redirect_uri=${me.redirect_uris[0]}&client_id=${me.client_id}&prompt=consent&access_type=offline`;
  // _________________________________________________________________________________

  //  send request to google drive for authontcation
  const handleSignIn = () => {
    window.location.href = urlLink;
  };

  // send code and get first token
  const GetToken = async () => {
    try {
      await axios
        .post(me.token_uri, {
          code: JSON.parse(sessionStorage.getItem("code")),
          client_id: me.client_id,
          client_secret: me.client_secret,
          redirect_uri: me.redirect_uris[0],
          grant_type: "authorization_code",
        })
        .then((res) => {
          setCodeResponse(res.data);
          setToken(res.data.access_token);
          sessionStorage.setItem("codeResponse", JSON.stringify(res.data));
          sessionStorage.setItem(
            "oauth2Token",
            JSON.stringify(res.data.access_token)
          );
          // handleRefreshToken;
        });
    } catch (res) {
      console.log(res);
    }
  };

  // handle get token
  const handleGetToken = () => {
    if (sessionStorage.getItem("code") !== null) {
      GetToken();
    } else {
      setTimeout(() => {
        handleGetToken();
      }, 2000);
    }
  };

  //  get token and save to sessionStorage and global state ((context.token))
  const handleGetCode = () => {
    if (code === null && token === null) {
      let frag = window.location;
      let urlParams = {};
      let regex = /([^&=]+)=([^&]*)/g,
        m;
      while ((m = regex.exec(frag))) {
        urlParams[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
      }
      if (Object.keys(urlParams).length > 0) {
        setCode(urlParams.code);
        sessionStorage.setItem("code", JSON.stringify(urlParams.code));
        history.push("/");
        handleGetToken();
      }
    }
  };
  window.onload = () => handleGetCode();
  return (
    <div className="flex flex-col h-screen gap-6 my-auto justify-center items-center bg-gray-50">
      <header className="text-xl text-gray-800">
        Hello dear, For see your Google drive data please Sign in.
      </header>
      <button
        onClick={() => handleSignIn()}
        className="px-5 py-2 border-2 text-xl text-gray-800 rounded-lg hover:bg-blue-600 hover:text-white"
      >
        sign in
      </button>
    </div>
  );
}
