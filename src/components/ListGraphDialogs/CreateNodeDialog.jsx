import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { useState } from "react";
import { FiPlusCircle } from "react-icons/fi"
import useSnackContext from "../../hooks/useSnackContext";
import api from '../../services/api'

export default function CreateNodeDialogue({ graphId, getNodesList }) {
    const [open, setOpen] = useState(false);
    const [label,setLabel] = useState('');

    const {setSnack} = useSnackContext();

    const handleClickToOpen = () => {
        setLabel('');
        setOpen(true);
    };

    const handleToClose = () => {
        setOpen(false);
    };

    const createNode = () => {
        api.get(`/criar/no/${label}/${graphId}`)
            .then((response) => {
                getNodesList();
                handleToClose();
                setSnack((prevState)=>{return {...prevState, open: true, message: "Nó criado com sucesso!", severity: "success"}});
            })
            .catch((error) => {
                alert(error.response.data.detail);
        })
    }

    return (
        <div>
            <button className="create-button"
                onClick={handleClickToOpen}>
                <FiPlusCircle ></FiPlusCircle>
            </button>
            <Dialog open={open} onClose={handleToClose}>
                <DialogContent>
                    <h1 className="dialogue-title">Criar Nó</h1>
                    <label htmlFor="nodeLabel" className="input-label">Label</label>
                    <input value={label} onChange={(e)=>{setLabel(e.target.value);}} className="label-input" id="nodeLabel"></input>
                </DialogContent>

                <DialogActions>
                    <button onClick={createNode} hidden={label.length < 1} className="close-button">
                        Criar
                    </button>

                    <button onClick={handleToClose} className="close-button">
                        Fechar
                    </button>
                </DialogActions>
            </Dialog>
        </div>
    );
}