import React, { memo } from "react";
import CreateTodoButton from "../atoms/CreateTodoButton";
import { useRecoilState } from "recoil";
import { taskState, deadlineState, memoState } from "../../atom/todoAtom";
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

const CreateDialogFormField = memo(
  ({ register, errors, handleSubmit, addTodo }) => {
    const [task, setTask] = useRecoilState(taskState);
    const [deadline, setDeadline] = useRecoilState(deadlineState);
    const [memo, setMemo] = useRecoilState(memoState);

    return (
      <Box sx={style}>
        <div style={{ margin: 10 }}>
          <TextField
            id="task"
            label="task"
            variant="outlined"
            {...register("task")}
            error={"task" in errors}
            helperText={errors.task?.message}
            value={task}
            onChange={(e) => setTask(e.target.value)}
            size="small"
            style={{ width: 260 }}
          />
        </div>
        <div style={{ margin: 10 }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              id="deadline"
              label="deadline"
              {...register("deadline")}
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
            {...register("memo")}
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            style={{ width: "100%" }}
          />
        </div>
        <CreateTodoButton
          handleSubmit={handleSubmit}
          addTodo={addTodo}
          task={task}
        />
      </Box>
    );
  }
);
export default CreateDialogFormField;
