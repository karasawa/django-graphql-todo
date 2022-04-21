import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import * as query from "../queries";
import { useMutation } from "@apollo/client";

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
  const [memo, setMemo] = useState("");
  const [updateTodo] = useMutation(query.UPDATE_TODO);

  useEffect(() => {
    setMemo(dataSingleTodo ? dataSingleTodo.todo.memo : "");
  }, [open]);

  const handleClose = () => {
    setMemo("");
    setOpen(false);
  };

  const addMemo = async () => {
    await updateTodo({
      variables: {
        id: dataSingleTodo.todo.id,
        task: dataSingleTodo.todo.task,
        isCompleted: dataSingleTodo.todo.isCompleted,
        memo: memo,
      },
      refetchQueries: [query.GET_ALL_TODOS],
    });
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
          <div>
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
              onClick={addMemo}
              style={{ margin: 10 }}
            >
              更新
            </Button>
          </div>
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
        </Box>
      </Modal>
    </>
  );
};
export default Dialog;
