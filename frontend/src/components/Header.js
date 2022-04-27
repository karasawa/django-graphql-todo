import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Cookies from "js-cookie";

const Header = memo(() => {
  const navigate = useNavigate();

  let token;
  if (Cookies.get("token")) {
    token = (
      <Button color="inherit" onClick={() => logout()}>
        ログアウト
      </Button>
    );
  } else {
    token = <></>;
  }

  const logout = async () => {
    await Cookies.remove("token");
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
            {token}
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
});
export default Header;
