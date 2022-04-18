import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation ($password: String!, $email: String!) {
    createUser(input: { password: $password, email: $email }) {
      password
      email
    }
  }
`;

export const GET_TOKEN = gql`
  mutation ($password: String!, $email: String!) {
    tokenAuth(password: $password, email: $email) {
      token
    }
  }
`;

export const GET_ALL_TODOS = gql`
  query {
    allTodos {
      edges {
        node {
          id
          task
          isCompleted
        }
      }
    }
  }
`;

export const CREATE_TODO = gql`
  mutation ($task: String!) {
    createTodo(input: { task: $task }) {
      todo {
        id
        task
      }
    }
  }
`;

export const DELETE_TODO = gql`
  mutation ($id: ID!) {
    deleteTodo(input: { id: $id }) {
      todo {
        id
        task
      }
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation ($id: ID!, $task: String!, $isCompleted: Boolean!) {
    updateTodo(input: { id: $id, task: $task, isCompleted: $isCompleted }) {
      todo {
        id
        task
        isCompleted
      }
    }
  }
`;
