import React, { memo } from "react";
import Button from "@mui/material/Button";

const CreateTodoButton = memo(({ handleSubmit, addTodo, task }) => {
  return (
      <Button
        variant="contained"
        onClick={handleSubmit(addTodo)}
        style={{ margin: 10 }}
        disabled={task.length > 0 ? false : true}
      >
        追加
      </Button>
  );
});
export default CreateTodoButton;
