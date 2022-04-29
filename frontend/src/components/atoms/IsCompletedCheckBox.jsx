import React, { memo } from "react";
import Checkbox from "@mui/material/Checkbox";
import { ListItemIcon } from "@mui/material";

const IsCompletedCheckBox = memo(({ checkToggleHandle, todo }) => {
  return (
    <ListItemIcon>
      <Checkbox
        checked={todo.isCompleted}
        onChange={() =>
          checkToggleHandle(
            todo.id,
            todo.task,
            todo.isCompleted,
            todo.memo,
            todo.deadline
          )
        }
        Name="checkedA"
      />
    </ListItemIcon>
  );
});
export default IsCompletedCheckBox;
