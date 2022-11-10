import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";
import useSnackContext from "../../hooks/useSnackContext";

export const SnackComponent = () => {

    const { snack, setSnack } = useSnackContext();

    const handleClose = () => {
        setSnack((prevState)=>{
            return {...prevState,open: false}
        })
    }

    return (
        <Snackbar open={snack.open} onClose={handleClose} autoHideDuration={1500} >
            <Alert severity={snack.severity} 
                sx={
                    { minWidth: '200px', alignItems: 'center', fontSize: '14px', boxShadow: '5px 6px 19px 4px rgba(30, 30, 30, 0.20)' }
                }
            >
                {snack.message}
            </Alert>
        </Snackbar >
    );
}