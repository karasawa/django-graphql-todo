import React, { memo } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const AddTodoBox = styled(Box)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  backgroundColor: "white",
  maxWidth: "100%",
  alignItems: "center",
  padding: 15,
  margin: 1,
});

const CreateDialogOpenButton = memo(({ handleOpen }) => {
  return (
    <AddTodoBox>
      <Button variant="contained" onClick={handleOpen}>
        Todoを追加
      </Button>
    </AddTodoBox>
  );
});
export default CreateDialogOpenButton;
