import React, { memo } from "react";
import UpdateTodoButton from "../atoms/UpdateTodoButton";
import { useRecoilState } from "recoil";
import { deadlineState, memoState } from "../../atom/todoAtom";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

const UpdateDialogFormField = memo(({ dataSingleTodo, updateContent }) => {
  const [deadline, setDeadline] = useRecoilState(deadlineState);
  const [memo, setMemo] = useRecoilState(memoState);

  return (
    <Box sx={style}>
      <div style={{ margin: 10 }}>
        <TextField
          id="task"
          label="task"
          variant="outlined"
          size="small"
          style={{ width: 260 }}
          disabled
          value={dataSingleTodo ? dataSingleTodo.todo.task : ""}
        />
      </div>
      <div style={{ margin: 10 }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="deadline"
            value={deadline}
            onChange={(newValue) => {
              setDeadline(newValue);
            }}
            renderInput={(params) => <TextField {...params} size="small" />}
          />
        </LocalizationProvider>
      </div>
      <div style={{ margin: 10 }}>
        <TextField
          id="memo"
          multiline
          rows={2}
          label="memo"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          style={{ width: "100%" }}
        />
      </div>
      <UpdateTodoButton updateContent={updateContent} />
    </Box>
  );
});
export default UpdateDialogFormField;
