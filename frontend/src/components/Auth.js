import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import * as query from "../queries";
// import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const LoginBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  backgroundColor: "white",
  maxWidth: "100%",
  height: 660,
  alignItems: "center",
  borderRadius: 1,
});

const LoginField = styled(TextField)({
  width: 280,
  margin: 10,
});

const Auth = () => {
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [getToken] = useMutation(query.GET_TOKEN);
  const [createUser] = useMutation(query.CREATE_USER);
  const navigate = useNavigate();
  // const [cookies, setCookie, removeCookie] = useCookies([]);
  const [email, setEmail] = useState("");

  const authUser = async (e) => {
    e.preventDefault();
    if (isLogin) {
      const result = await getToken({
        variables: { password: password, email: email },
      });
      // await setCookie("token", result.data.tokenAuth.token, {httpOnly: true});
      await localStorage.setItem("token", result.data.tokenAuth.token);
      if (localStorage.getItem("token")) {
        await localStorage.setItem("email", email);
        navigate("home");
      }
    } else {
      await createUser({
        variables: { password: password, email: email },
      });
      await setIsLogin(true);
      await setEmail("");
      setPassword("");
    }
  };

  return (
    <div>
      <Header />
      <form onSubmit={authUser}>
        <LoginBox>
          <div>
            <LoginField
              label="email"
              variant="outlined"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              size="small"
            />
          </div>
          <div>
            <LoginField
              label="password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              size="small"
            />
          </div>
          <div>
            <Button type="submit">
              {isLogin ? "Login with JWT" : "Create new user"}
            </Button>
          </div>
          <div>
            <Button onClick={() => setIsLogin(!isLogin)}>switch</Button>
          </div>
        </LoginBox>
      </form>
      <Footer />
    </div>
  );
};
export default Auth;
