import React, { useEffect, memo } from "react";
import * as query from "../../queries";
import TodoList from "../organisms/TodoList";
import Header from "../organisms/Header";
import Footer from "../organisms/Footer";
import UpdateDialog from "../organisms/UpdateDialog";
import CreateDialog from "../organisms/CreateDialog";
import { useQuery } from "@apollo/client";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Home = memo(() => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!Cookies.get("token")) {
      localStorage.removeItem("email");
      navigate("/");
    }
  }, [Cookies.get('token')]);

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
      <CreateDialog />
      <UpdateDialog />
      <TodoList dataTodos={dataTodos} />
      <Footer />
    </div>
  );
});
export default Home;
