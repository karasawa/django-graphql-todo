import React from "react";
import * as query from "../queries";
import { useMutation } from "@apollo/client";

const TodoList = ({ dataTodos }) => {
  const [deleteTodo] = useMutation(query.DELETE_TODO);
  const todos = dataTodos?.allTodos.edges.map((edges) => edges.node);

  const deleteTodoHandle = async (id) => {
    await deleteTodo({
      variables: { id: id },
      refetchQueries: [query.GET_ALL_TODOS],
    });
  };

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          {todo.task}
          <button onClick={() => deleteTodoHandle(todo.id)}>削除</button>
        </li>
      ))}
    </ul>
  );
};
export default TodoList;
