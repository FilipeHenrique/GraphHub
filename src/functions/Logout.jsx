import { useContext } from "react";
import LoginContext from "../context/LoginContext";


export default function Logout(){
    const context = useContext(LoginContext);
    context.setIsLogged(false);
    context.setUserId(null);
    sessionStorage.removeItem("isLogged");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("username");
}