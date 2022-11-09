import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { FiTrash } from "react-icons/fi"
import { useState } from "react";
import api from '../../services/api'

export default function DeleteEdgesDialogue({ edgeId, getEdgesList }) {
    const [open, setOpen] = useState(false);

    const handleClickToOpen = () => {
        setOpen(true);
    };

    const handleToClose = () => {
        setOpen(false);
    };

    const deleteEdge = () => {
        api.get(`/deletar/aresta/${edgeId}`)
            .then((response) => {
                getEdgesList();
                handleToClose();
            })
            .catch((error) => {
                alert(error);
        })
    }

    return (
        <div>
            <div onClick={handleClickToOpen} className="crud-button">
                <FiTrash></FiTrash>
            </div>
            <Dialog open={open} onClose={handleToClose}>
                <DialogContent>
                    <h1 className="dialogue-title">Você tem certeza que deseja excluir essa Aresta?</h1>
                </DialogContent>

                <DialogActions>
                    <button onClick={deleteEdge} className="close-button">
                        Excluir
                    </button>

                    <button onClick={handleToClose} className="close-button">
                        Fechar
                    </button>
                </DialogActions>
            </Dialog>
        </div>
    );
}