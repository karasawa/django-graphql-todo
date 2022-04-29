import React, { useState, memo } from "react";
import Header from "../organisms/Header";
import Footer from '../organisms/Footer';
import AuthButton from "../atoms/AuthButton";
import AuthFormField from '../molecures/AuthFormField'
import { useMutation } from "@apollo/client";
import * as query from "../../queries";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Cookies from "js-cookie";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
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

const schema = yup.object().shape({
  email: yup
    .string()
    .email("メールアドレスの形式が正しくありません")
    .required("必須項目です"),
  password: yup.string().min(8, "8文字以上で入力してください"),
});

const Auth = memo(() => {
  const [getToken] = useMutation(query.GET_TOKEN);
  const [createUser] = useMutation(query.CREATE_USER);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const authUser = async () => {
    if (isLogin) {
      const result = await getToken({
        variables: { password: password, email: email },
      });
      await Cookies.set("token", result.data.tokenAuth.token);
      if (Cookies.get("token")) {
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
      <form onSubmit={handleSubmit(authUser)}>
        <LoginBox>
          <AuthFormField register={register} 
                          errors={errors} 
                          email={email} 
                          setEmail={setEmail} 
                          password={password} 
                          setPassword={setPassword}/>
          <div>
            <AuthButton isLogin={isLogin} />
          </div>
          <div>
            <Button onClick={() => setIsLogin(!isLogin)}>switch</Button>
          </div>
        </LoginBox>
      </form>
      <Footer />
    </div>
  );
});
export default Auth;
