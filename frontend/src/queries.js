import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation ($password: String!, $email: String!) {
    createUser(input: { password: $password }) {
      user {
        id
        email
      }
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
          memo
          user
        }
      }
    }
  }
`;

export const GET_TODO = gql`
  query ($id: ID!) {
    todo(id: $id) {
      id
      task
      isCompleted
      memo
    }
  }
`;

export const CREATE_TODO = gql`
  mutation ($task: String!, $memo: String!, $user: String) {
    createTodo(input: { task: $task, memo: $memo, user: $user }) {
      todo {
        id
        task
        user
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
  mutation (
    $id: ID!
    $task: String!
    $isCompleted: Boolean!
    $memo: String
    $user: String
  ) {
    updateTodo(
      input: {
        id: $id
        task: $task
        isCompleted: $isCompleted
        memo: $memo
        user: $user
      }
    ) {
      todo {
        id
        task
        isCompleted
        memo
        user
      }
    }
  }
`;
