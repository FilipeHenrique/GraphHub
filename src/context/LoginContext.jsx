// https://dev.to/rafacdomin/autenticacao-no-react-com-context-api-e-hooks-4bia

import React, { createContext, useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import api from '../services/api';

const LoginContext = createContext({});

export const LoginProvider = ({ children }) => {

    const [userId,setUserId] = useState(sessionStorage.getItem("userId"));
    const [userName,setUserName] = useState(sessionStorage.getItem("username"));
    const [isLogged, setIsLogged] = useState(sessionStorage.getItem("isLogged"));

    let navigate = useNavigate();
   
    function Login(data) {
        api.get(`/users/${data.username}/${data.password}`)
        .then((response)=>{
          sessionStorage.setItem("isLogged",true);
          sessionStorage.setItem("userId",response.data.user_id);
          sessionStorage.setItem("username",response.data.username);
          setIsLogged(true);
          setUserId(response.data.user_id);
          setUserName(response.data.username);
          navigate("/", { replace: true }) 
        })
        .catch((error)=>{
          alert(error.response.data.detail);
        })
    }

    function Logout(){
      setIsLogged(false);
      setUserId(null);
      setUserName(null);
      sessionStorage.clear();
      navigate("/", { replace: true }) 
    }

    return (
      <LoginContext.Provider value={{ isLogged: false, Login,userId,setUserId,isLogged,setIsLogged,Logout,userName,setUserName}}>
        {children}
      </LoginContext.Provider>
    );
};

export default LoginContext;