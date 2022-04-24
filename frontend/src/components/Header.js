import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
// import { useCookies } from "react-cookie";
import { useRecoilState } from "recoil";

const Header = () => {
  // const [cookies, setCookie, removeCookie] = useCookies([]);
  const navigate = useNavigate();

  let token;
  if (localStorage.getItem("token")) {
    token = (
      <Button color="inherit" onClick={() => logout()}>
        ログアウト
      </Button>
    );
  } else {
    token = <></>;
  }

  const logout = async () => {
    await localStorage.removeItem("token");
    await localStorage.removeItem("email");
    navigate("/");
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Todo App
            </Typography>
            {/* <Button color="inherit" onClick={() => logout()}>
              ログアウト
            </Button> */}
            {token}
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};
export default Header;
