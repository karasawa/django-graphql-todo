import React, { useState } from "react";
import * as query from "../queries";
import { useMutation } from "@apollo/client";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const AddTodoBox = styled(Box)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  backgroundColor: "white",
  maxWidth: "100%",
  alignItems: "center",
  padding: 10,
  margin: 1,
});

const InputForm = () => {
  const [input, setInput] = useState("");
  const [createTodo] = useMutation(query.CREATE_TODO);
  const email = localStorage.getItem("email");
  const [deadline, setDeadline] = useState("");

  const addTodo = async () => {
    await createTodo({
      variables: { task: input, memo: "", user: email },
      refetchQueries: [query.GET_ALL_TODOS],
    });
    setInput("");
  };

  return (
    <div>
      <AddTodoBox component="form" noValidate autoComplete="off">
        <TextField
          id="outlined-basic"
          label="todo"
          variant="outlined"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          size="small"
        />
        {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Basic example"
            value={deadline}
            onChange={(newValue) => {
              setDeadline(newValue);
            }}
            renderInput={(params) => <TextField {...params} size="small" />}
          />
        </LocalizationProvider> */}
        <Button
          variant="contained"
          onClick={addTodo}
          style={{ margin: 10 }}
          disabled={input.length > 0 ? false : true}
        >
          追加
        </Button>
      </AddTodoBox>
    </div>
  );
};
export default InputForm;
