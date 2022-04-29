import React, { memo } from "react";
import LogOutButton from '../atoms/LogOutButton';
import Cookies from "js-cookie";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";


const Header = memo(() => {

  let token;
  if (Cookies.get("token")) {
    token = <LogOutButton />;
  } else {
    token = <></>;
  }

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
