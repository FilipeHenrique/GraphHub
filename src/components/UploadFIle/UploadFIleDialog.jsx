import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import { useState } from "react";
import UploadFile from "./UploadFile";
import {FiUploadCloud} from "react-icons/fi"

export default function UploadFileDialog({getData}) {
    const [open, setOpen] = useState(false);

    const handleClickToOpen = () => {
        setOpen(true);
    };

    const handleToClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <button className="tertiary-button"
                onClick={handleClickToOpen}>
                Upload <FiUploadCloud></FiUploadCloud>
            </button>
            <Dialog open={open} onClose={handleToClose}>
                <DialogContent>
                    <UploadFile getData={getData}></UploadFile>
                </DialogContent>
                <DialogActions>
                    <button onClick={handleToClose} className="close-button">
                        Fechar
                    </button>
                </DialogActions>
            </Dialog>
        </div>
    );
}