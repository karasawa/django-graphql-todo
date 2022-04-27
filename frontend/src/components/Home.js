import React, { useEffect, memo } from "react";
import * as query from "../queries";
import { useQuery } from "@apollo/client";
import TodoList from "./TodoList";
import Header from "./Header";
import Footer from "./Footer";
import Dialog from "./Dialog";
import InputForm from "./InputForm";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Home = memo(() => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!Cookies.get("token")) {
      localStorage.removeItem("email");
      navigate("/");
    }
  }, []);

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
});
export default Home;
