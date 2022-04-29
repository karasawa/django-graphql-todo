import React, { memo } from "react";
import { IconButton } from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";

const UpdateDialogOpenButton = memo(
  ({ updateTodoHandle, todo, setOpen, errorSingleTodo }) => {
    return (
      <IconButton
        edge="start"
        aria-label="memo"
        onClick={async () => {
          try {
            await updateTodoHandle({
              variables: { id: todo.id },
            });
            setOpen(true);
          } catch {
            console.log(errorSingleTodo);
          }
        }}
      >
        <BorderColorIcon />
      </IconButton>
    );
  }
);
export default UpdateDialogOpenButton;
