import React, { useState, useEffect } from "react";
import * as query from "../queries";
import { useMutation } from "@apollo/client";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Modal from "@mui/material/Modal";
import { useRecoilState } from "recoil";
import { taskState, deadlineState, memoState } from "../atom/todoAtom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

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

const InputForm = () => {
  const [createTodo] = useMutation(query.CREATE_TODO);
  const [task, setTask] = useRecoilState(taskState);
  const [deadline, setDeadline] = useRecoilState(deadlineState);
  const [memo, setMemo] = useRecoilState(memoState);
  const [open, setOpen] = useState(false);
  const email = localStorage.getItem("email");

  const addTodo = async () => {
    await createTodo({
      variables: {
        task: task,
        memo: memo,
        user: email,
        deadline: deadline,
      },
      refetchQueries: [query.GET_ALL_TODOS],
    });
    await setTask("");
    await setDeadline(null);
    await setMemo("");
    setOpen(false);
  };

  const handleOpen = () => {
    setTask("");
    setDeadline(null);
    setMemo("");
    setOpen(true);
  };

  const handleClose = () => {
    setTask("");
    setDeadline(null);
    setMemo("");
    setOpen(false);
  };

  return (
    <div>
      <AddTodoBox>
        <Button variant="contained" onClick={handleOpen}>
          Add Todo
        </Button>
      </AddTodoBox>
      <>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div style={{ margin: 10 }}>
              <TextField
                id="outlined-basic"
                label="task"
                variant="outlined"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                size="small"
                style={{ width: 260 }}
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
                  renderInput={(params) => (
                    <TextField {...params} size="small" />
                  )}
                />
              </LocalizationProvider>
            </div>
            <div style={{ margin: 10 }}>
              <TextField
                id="outlined-multiline-static"
                multiline
                rows={2}
                label="memo"
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                style={{ width: "100%" }}
              />
            </div>
            <div>
              <Button
                variant="contained"
                onClick={addTodo}
                style={{ margin: 10 }}
                disabled={task.length > 0 ? false : true}
              >
                追加
              </Button>
            </div>
          </Box>
        </Modal>
      </>
    </div>
  );
};
export default InputForm;
