import React, { memo } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";

const DeleteTodoButton = memo(({ deleteTodoHandle, todo }) => {
  return (
    <IconButton
      edge="end"
      aria-label="delete"
      onClick={() => deleteTodoHandle(todo.id)}
    >
      <DeleteIcon />
    </IconButton>
  );
});
export default DeleteTodoButton;
