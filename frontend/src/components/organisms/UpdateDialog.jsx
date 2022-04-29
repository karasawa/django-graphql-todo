import React, { useEffect, memo } from "react";
import UpdateDialogFormField from '../molecures/UpdateDialogFormField';
import * as query from "../../queries";
import { useMutation } from "@apollo/client";
import { useRecoilState } from "recoil";
import { deadlineState, memoState } from "../../atom/todoAtom";
import Modal from "@mui/material/Modal";

const UpdateDialog = memo(({open, setOpen, dataSingleTodo}) => {
  const [updateTodo] = useMutation(query.UPDATE_TODO);
  const [deadline, setDeadline] = useRecoilState(deadlineState);
  const [memo, setMemo] = useRecoilState(memoState);
  const email = localStorage.getItem("email");

  useEffect(() => {
    setMemo(dataSingleTodo ? dataSingleTodo.todo.memo : "");
    setDeadline(dataSingleTodo ? dataSingleTodo.todo.deadline : null);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

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

  const handleClose = async () => {
    await setMemo("");
    await setDeadline(null);
    setOpen(false);
  };

  return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      > 
        <UpdateDialogFormField dataSingleTodo={dataSingleTodo} updateContent={updateContent} />
      </Modal>
  );
});
export default UpdateDialog;
