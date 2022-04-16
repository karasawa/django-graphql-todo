import React, { useState } from "react";
import * as query from "../queries";
import { useQuery, useMutation } from "@apollo/client";
import TodoList from "./TodoList";

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
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={addTodo}>追加</button>
      <TodoList dataTodos={dataTodos} />
    </div>
  );
};
export default Home;
