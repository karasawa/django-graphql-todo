import React, { memo } from "react";
import Button from "@mui/material/Button";

const UpdateTodoButton = memo(({ updateContent }) => {
  return (
    <Button variant="contained" onClick={updateContent} style={{ margin: 10 }}>
      更新
    </Button>
  );
});
export default UpdateTodoButton;
