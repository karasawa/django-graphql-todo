import { gql } from "@apollo/client";

export const GET_ALL_TODOS = gql`
  query {
    allTodos {
      edges {
        node {
          id
          task
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
