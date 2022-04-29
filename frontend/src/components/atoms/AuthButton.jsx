import React, { memo } from "react";
import Button from "@mui/material/Button";

const AuthButton = memo(({isLogin}) => {
  return (
      <Button type="submit">
        {isLogin ? "Login with JWT" : "Create new user"}
      </Button>
  );
});
export default AuthButton;
