import React, { useState } from "react";
import * as query from "../queries";
import { useLazyQuery, useMutation } from "@apollo/client";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import {
  ListItemText,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import Dialog from "./Dialog";
import { useRecoilValue } from "recoil";
import { emailState } from "../atom/authAtom";

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
  const [open, setOpen] = useState(false);
  const [deleteTodo] = useMutation(query.DELETE_TODO);
  const [updateTodo] = useMutation(query.UPDATE_TODO);
  const email = localStorage.getItem("email");
  const nodes = dataTodos?.allTodos.edges.map((edges) => edges.node);
  const todos = nodes.filter((node) => {
    return node.user === email;
  });

  const [
    writeMemoHandle,
    {
      data: dataSingleTodo,
      loading: loadingSingleTodo,
      error: errorSingleTodo,
    },
  ] = useLazyQuery(query.GET_TODO, {
    fetchPolicy: "network-only",
  });

  const deleteTodoHandle = async (id) => {
    await deleteTodo({
      variables: { id: id },
      refetchQueries: [query.GET_ALL_TODOS],
    });
  };

  const checkToggleHandle = async (id, task, isCompleted, memo) => {
    await updateTodo({
      variables: {
        id: id,
        task: task,
        isCompleted: !isCompleted,
        memo: memo,
        user: email,
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
              <ListItemIcon>
                <Checkbox
                  checked={todo.isCompleted}
                  onChange={() =>
                    checkToggleHandle(
                      todo.id,
                      todo.task,
                      todo.isCompleted,
                      todo.memo
                    )
                  }
                  Name="checkedA"
                />
              </ListItemIcon>
              <ListItemText primary={todo.task} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="start"
                  aria-label="memo"
                  onClick={async () => {
                    try {
                      await writeMemoHandle({
                        variables: { id: todo.id },
                      });
                      setOpen(true);
                    } catch {
                      console.log(errorSingleTodo);
                    }
                  }}
                >
                  <BorderColorIcon />
                </IconButton>
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
      <Dialog open={open} setOpen={setOpen} dataSingleTodo={dataSingleTodo} />
    </TodoListBox>
  );
};
export default TodoList;
