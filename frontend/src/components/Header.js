import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const Header = () => {
  const navigate = useNavigate();

  const logout = async () => {
    await localStorage.removeItem("token");
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
            <Button color="inherit" onClick={() => logout()}>
              ログアウト
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};
export default Header;
