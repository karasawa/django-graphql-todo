import React, { useEffect } from "react";
import * as query from "../queries";
import { useQuery } from "@apollo/client";
import TodoList from "./TodoList";
import Header from "./Header";
import Footer from "./Footer";
import Dialog from "./Dialog";
import InputForm from "./InputForm";

const Home = () => {
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

  return (
    <div>
      <Header />
      <InputForm />
      <Dialog />
      <TodoList dataTodos={dataTodos} />
      <Footer />
    </div>
  );
};
export default Home;
