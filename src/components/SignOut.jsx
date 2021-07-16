import axios from "axios";
import { useStoreActions, useStoreState } from "easy-peasy";
import React from "react";
import { useHistory } from "react-router-dom";

const SignOut = () => {
  const { token } = useStoreState((store) => store);
  const { setToken, setCode, setCodeResponse } = useStoreActions((action) => action);
  const history = useHistory();
  const handleRevoke = async () => {
    try {
      await axios
        .post(`https://oauth2.googleapis.com/revoke?`, {
          token: token,
        })
        .then((res) => console.log(res));
    } catch (res) {
      console.log(res);
    }
  };
  const handleSignOut = () => {
    handleRevoke();
    sessionStorage.removeItem("code");
    sessionStorage.removeItem("codeResponse");
    sessionStorage.removeItem("oauth2Token");
    setCodeResponse(null);
    setCode(null);
    setToken(null);
    history.push("/");
  };
  return (
    <button className="border rounded-lg px-4 text-white bg-blue-600 hover:bg-blue-700" onClick={() => handleSignOut()}>
      Sign Out
    </button>
  );
};
export default SignOut;
