import React from "react";
import * as query from "../queries";
import { useMutation } from "@apollo/client";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import {
  ListItemText,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Chip from "@mui/material/Chip";
import { IconButton } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";

const TodoListBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  backgroundColor: "white",
  maxWidth: "100%",
  alignItems: "center",
  padding: 10,
  margin: "auto",
});

const TodoItemBox = styled(Box)({
  width: 300,
  justifyContent: "space-between",
});

const TodoList = ({ dataTodos }) => {
  const [deleteTodo] = useMutation(query.DELETE_TODO);
  const [updateTodo] = useMutation(query.UPDATE_TODO);
  const todos = dataTodos?.allTodos.edges.map((edges) => edges.node);

  const deleteTodoHandle = async (id) => {
    await deleteTodo({
      variables: { id: id },
      refetchQueries: [query.GET_ALL_TODOS],
    });
  };

  const checkToggleHandle = async (id, task, isCompleted) => {
    await updateTodo({
      variables: { id: id, task: task, isCompleted: isCompleted },
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
              <ListItemIcon>
                <Checkbox
                  checked={todo.isCompleted}
                  onChange={() =>
                    checkToggleHandle(todo.id, todo.task, todo.isCompleted)
                  }
                  Name="checkedA"
                />
              </ListItemIcon>
              <ListItemText primary={todo.task} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => deleteTodoHandle(todo.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </TodoItemBox>
        ))}
      </ul>
    </TodoListBox>
  );
};
export default TodoList;
