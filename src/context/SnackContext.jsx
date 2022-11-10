import { createContext, useState } from 'react';

export const SnackbarContext = createContext({});

export const SnackBarProvider = ({children}) => {

    const [snack, setSnack] = useState({
        message: '',
        open: false,
        severity: 'success'
    });
    
    return(
        <SnackbarContext.Provider value={{snack, setSnack}}>
                {children}
        </SnackbarContext.Provider>
    );
}

export default SnackbarContext;
