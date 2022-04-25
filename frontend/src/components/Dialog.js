import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import * as query from "../queries";
import { useMutation } from "@apollo/client";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useRecoilState } from "recoil";
import { deadlineState, memoState } from "../atom/todoAtom";

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

const Dialog = (props) => {
  const { open, setOpen, dataSingleTodo } = props;
  const [deadline, setDeadline] = useRecoilState(deadlineState);
  const [memo, setMemo] = useRecoilState(memoState);
  const [updateTodo] = useMutation(query.UPDATE_TODO);
  const email = localStorage.getItem("email");

  useEffect(() => {
    setMemo(dataSingleTodo ? dataSingleTodo.todo.memo : "");
    setDeadline(dataSingleTodo ? dataSingleTodo.todo.deadline : null);
  }, [open]);

  const handleClose = async () => {
    await setMemo("");
    await setDeadline(null);
    setOpen(false);
  };

  const updateContent = async () => {
    await updateTodo({
      variables: {
        id: dataSingleTodo.todo.id,
        task: dataSingleTodo.todo.task,
        isCompleted: dataSingleTodo.todo.isCompleted,
        memo: memo,
        user: email,
        deadline: deadline,
      },
      refetchQueries: [query.GET_ALL_TODOS],
    });
    await setMemo("");
    await setDeadline(null);
    setOpen(false);
  };

  return (
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
              value={dataSingleTodo ? dataSingleTodo.todo.task : ""}
              size="small"
              style={{ width: 260 }}
              disabled
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
              onClick={updateContent}
              style={{ margin: 10 }}
            >
              更新
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};
export default Dialog;
