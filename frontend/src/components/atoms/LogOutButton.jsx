import React, { memo } from "react";
import Button from "@mui/material/Button";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const LogOutButton = memo(() => {
  const navigate = useNavigate();

  const logout = async () => {
    await Cookies.remove("token");
    await localStorage.removeItem("email");
    navigate("/");
  };

  return (
      <Button color="inherit" onClick={() => logout()}>
        ログアウト
      </Button>
  );
});
export default LogOutButton;
