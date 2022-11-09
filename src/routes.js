import React from "react";
import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import Navbar from "./components/Header/Navbar";
import LoginContext from "./context/LoginContext";
import GraphvisPage from "./pages/GraphvisPage/GraphvisPage";
import { HomePage } from "./pages/HomePage/HomePage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { SignUpPage } from "./pages/SignUpPage/SignUpPage";
import ListNodesPage from "./pages/ListNodesPage/ListNodesPage";
import UserGraphList from "./pages/UserGraphList/UserGraphList";

export default function AppRoutes() {
  const context = useContext(LoginContext);
  return (
    <>
      <Navbar />
      <Routes>

        {context.isLogged ?
          <>
            <Route path="/" exact element={<GraphvisPage />} />
            <Route path="/ListaNos/:graphId/:graphName" exact element={<ListNodesPage />} />
            <Route path="/ListaGrafos/:userName" exact element={<UserGraphList />} />
          </>

          : 
          <>
              <Route path="/" exact element={<HomePage />} />
              <Route path="/Login" exact element={<LoginPage />} />
              <Route path="/Cadastro" exact element={<SignUpPage />} />
          </>
        }
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </>
  );
}
