import React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const FooterBox = styled(Box)({
  width: "100%",
  position: "fixed",
  bottom: 0,
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
});

const Footer = () => {
  return (
    <div>
      <FooterBox>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              copyright Todo App
            </Typography>
          </Toolbar>
        </AppBar>
      </FooterBox>
    </div>
  );
};
export default Footer;
