import React, { useState } from "react";
import * as query from "../queries";
import { useQuery, useMutation } from "@apollo/client";
import TodoList from "./TodoList";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Header from "./Header";
import Footer from "./Footer";

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

const Home = () => {
  const [input, setInput] = useState("");
  const [createTodo] = useMutation(query.CREATE_TODO);

  const {
    data: dataTodos,
    loading: loadingTodos,
    error: errorTodos,
  } = useQuery(query.GET_ALL_TODOS);

  if (loadingTodos) {
    return "Loading...";
  }

  if (errorTodos) {
    console.log(errorTodos);
  }

  const addTodo = async () => {
    await createTodo({
      variables: { task: input },
      refetchQueries: [query.GET_ALL_TODOS],
    });
    setInput("");
  };

  return (
    <div>
      <Header />
      <AddTodoBox component="form" noValidate autoComplete="off">
        <TextField
          id="outlined-basic"
          label="todo"
          variant="outlined"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          size="small"
        />
        <Button variant="contained" onClick={addTodo} style={{ margin: 10 }}>
          追加
        </Button>
      </AddTodoBox>
      <TodoList dataTodos={dataTodos} />
      <Footer />
    </div>
  );
};
export default Home;
