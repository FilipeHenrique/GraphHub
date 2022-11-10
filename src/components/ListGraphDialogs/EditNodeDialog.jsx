import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { FiSettings } from "react-icons/fi"
import { useEffect, useState } from "react";
import api from '../../services/api'
import useSnackContext from "../../hooks/useSnackContext";

export default function EditNodeDialogue({ nodeId, nodeLabel, getNodesList }) {
    const [open, setOpen] = useState(false);
    const [label,setLabel] = useState('');
    const { setSnack } = useSnackContext();

    const handleClickToOpen = () => {
        setLabel(nodeLabel);
        setOpen(true);
    };

    const handleToClose = () => {
        setOpen(false);
    };

    const editNode = () => {
        api.get(`/editar/no/${nodeId}/${label}`)
            .then((response) => {
                getNodesList();
                handleToClose();
                setSnack((prevState)=>{return {...prevState, open: true, message: "Nó editado com sucesso!", severity: "success"}});
            })
            .catch((error) => {
                alert(error.response.data.detail);
        })
    }

    return (
        <div>
            <div onClick={handleClickToOpen} className="crud-button">
                <FiSettings></FiSettings>
            </div>
            <Dialog open={open} onClose={handleToClose}>
                <DialogContent>
                    <h1 className="dialogue-title">Editar Nó</h1>
                    <label htmlFor="nodeLabel" className="input-label">Label</label>
                    <input value={label} onChange={(e)=>{setLabel(e.target.value);}} type="text" minLength={1} className="label-input" id="nodeLabel"></input>
                </DialogContent>

                <DialogActions>
                    <button hidden={label.length < 1} onClick={editNode} className="close-button">
                        Salvar
                    </button>

                    <button onClick={handleToClose} className="close-button">
                        Fechar
                    </button>
                </DialogActions>
            </Dialog>
        </div>
    );
}