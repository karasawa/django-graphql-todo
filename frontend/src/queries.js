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
          deadline
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
      deadline
    }
  }
`;

export const CREATE_TODO = gql`
  mutation (
    $task: String!
    $memo: String!
    $user: String
    $deadline: DateTime
  ) {
    createTodo(
      input: { task: $task, memo: $memo, user: $user, deadline: $deadline }
    ) {
      todo {
        id
        task
        user
        deadline
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
    $deadline: DateTime
  ) {
    updateTodo(
      input: {
        id: $id
        task: $task
        isCompleted: $isCompleted
        memo: $memo
        user: $user
        deadline: $deadline
      }
    ) {
      todo {
        id
        task
        isCompleted
        memo
        user
        deadline
      }
    }
  }
`;
