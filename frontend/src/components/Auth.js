import { useMutation } from "@apollo/client";
import React, { useState, useEffect } from "react";
import * as query from "../queries";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [getToken] = useMutation(query.GET_TOKEN);
  const navigate = useNavigate();
  //   const [cookies, setCookie, removeCookie] = useCookies([]);

  const authUser = async (e) => {
    e.preventDefault();
    const result = await getToken({
      variables: { password: password, email: email },
    });
    await localStorage.setItem("token", result.data.tokenAuth.token);
    console.log(localStorage.getItem("token"));
    if (localStorage.getItem("token")) {
      navigate("home");
    }
  };

  return (
    <div>
      <form onSubmit={authUser}>
        <div>
          <label>Email: </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">
          {isLogin ? "Login with JWT" : "Create new user"}
        </button>

        <div>
          <button onClick={() => setIsLogin(!isLogin)}>switch</button>
        </div>
      </form>
    </div>
  );
};
export default Auth;
