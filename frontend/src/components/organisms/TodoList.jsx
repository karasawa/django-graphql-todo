import React, { useState, memo } from "react";
import UpdateDialog from "./UpdateDialog";
import IsCompletedCheckBox from "../atoms/IsCompletedCheckBox";
import UpdateDialogOpenButton from "../atoms/UpdateDialogOpenButton";
import DeleteTodoButton from '../atoms/DeleteTodoButton';
import * as query from "../../queries";
import { useLazyQuery, useMutation } from "@apollo/client";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import {
  ListItemText,
  ListItem,
  ListItemSecondaryAction,
} from "@mui/material";

const TodoListBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  backgroundColor: "white",
  maxWidth: "100%",
  alignItems: "center",
  margin: "auto",
});

const TodoItemBox = styled(Box)({
  width: 300,
  justifyContent: "space-between",
});

const TodoList = memo(({ dataTodos }) => {
  const [deleteTodo] = useMutation(query.DELETE_TODO);
  const [updateTodo] = useMutation(query.UPDATE_TODO);
  const [open, setOpen] = useState(false);
  const email = localStorage.getItem("email");

  const nodes = dataTodos?.allTodos.edges.map((edges) => edges.node);
  const todos = nodes.filter((node) => {
    return node.user === email;
  });

  const today = new Date();

  const [updateTodoHandle, { data: dataSingleTodo, error: errorSingleTodo }] =
    useLazyQuery(query.GET_TODO, {
      fetchPolicy: "network-only",
    });

  const deleteTodoHandle = async (id) => {
    await deleteTodo({
      variables: { id: id },
      refetchQueries: [query.GET_ALL_TODOS],
    });
  };

  const checkToggleHandle = async (id, task, isCompleted, memo, deadline) => {
    await updateTodo({
      variables: {
        id: id,
        task: task,
        isCompleted: !isCompleted,
        memo: memo,
        user: email,
        deadline: deadline,
      },
      refetchQueries: [query.GET_ALL_TODOS],
    });
  };

  return (
    <TodoListBox>
      <ul
        style={{
          listStyle: "none",
          paddingLeft: 0,
          justifyContent: "space-between",
        }}
      >
        {todos.map((todo) => (
          <TodoItemBox>
            <ListItem key={todo.id}>
              <IsCompletedCheckBox checkToggleHandle={checkToggleHandle} todo={todo} />
              <ListItemText
                primary={todo.task}
                // style={{
                //   color: today > todo.deadline ? "red" : "black",
                // }}
              />
              {/* <ListItemText primary={todo.deadline} /> */}
              <ListItemSecondaryAction>
                <UpdateDialogOpenButton updateTodoHandle={updateTodoHandle} 
                                        todo={todo} 
                                        setOpen={setOpen} 
                                        errorSingleTodo={errorSingleTodo} />
                <DeleteTodoButton deleteTodoHandle={deleteTodoHandle} todo={todo} />                        
              </ListItemSecondaryAction>
            </ListItem>
          </TodoItemBox>
        ))}
      </ul>
      <UpdateDialog open={open} setOpen={setOpen} dataSingleTodo={dataSingleTodo} />
    </TodoListBox>
  );
});
export default TodoList;
