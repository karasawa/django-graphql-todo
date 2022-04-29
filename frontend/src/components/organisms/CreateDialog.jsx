import React, { useState, memo } from "react";
import CreateDialogOpenButton from "../atoms/CreateDialogOpenButton";
import CreateDialogFormField from "../molecures/CreateDialogFormField";
import * as query from "../../queries";
import { useMutation } from "@apollo/client";
import { useRecoilState } from "recoil";
import { taskState, deadlineState, memoState } from "../../atom/todoAtom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Modal from "@mui/material/Modal";

const schema = yup.object().shape({
  task: yup.string().required("必須項目です"),
});

const CreateDialog = memo(() => {
  const [createTodo] = useMutation(query.CREATE_TODO);
  const [task, setTask] = useRecoilState(taskState);
  const [deadline, setDeadline] = useRecoilState(deadlineState);
  const [memo, setMemo] = useRecoilState(memoState);
  const [open, setOpen] = useState(false);
  const email = localStorage.getItem("email");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

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
      <CreateDialogOpenButton handleOpen={handleOpen} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <CreateDialogFormField
          register={register}
          errors={errors}
          handleSubmit={handleSubmit}
          addTodo={addTodo}
        />
      </Modal>
    </div>
  );
});
export default CreateDialog;
