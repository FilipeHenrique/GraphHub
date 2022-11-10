import { useContext } from "react";
import SnackbarContext from "../context/SnackContext";

export default function useSnackContext(){
    const context = useContext(SnackbarContext);
    return context;
}