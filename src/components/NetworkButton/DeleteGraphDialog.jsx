import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { FiTrash, FiCheck } from "react-icons/fi"
import { useState } from "react";
import api from '../../services/api'
import useSnackContext from "../../hooks/useSnackContext";
import { Tooltip } from "@material-ui/core";

export default function DeleteGraphDialog({ graphId, setId, updateList }) {
    const [open, setOpen] = useState(false);
    const { setSnack } = useSnackContext();

    const handleClickToOpen = () => {
        setOpen(true);
    };

    const handleToClose = () => {
        setOpen(false);
    };

    const deleteGraph = () => {
        api.get(`/excluir/grafo/${graphId}`)
            .then((response) => {
                updateList();
                setId(1);
                handleToClose();
                setSnack((prevState) => { return { ...prevState, open: true, message: "Grafo excluído com sucesso!", severity: "success" } });
            })
            .catch((error) => {
                alert(error.response.data.detail);
            })
    }

    return (
        <div>
            <Tooltip title={<p style={{ fontSize: '12px', padding: '3px' }}>Excluir Grafo</p>}>
                <div onClick={handleClickToOpen} className="crud-button">
                    <FiTrash></FiTrash>
                </div>
            </Tooltip>

            <Dialog open={open} onClose={handleToClose}>
                <DialogContent>
                    <h1>Você tem certeza que deseja excluir esse Grafo?</h1>
                </DialogContent>

                <DialogActions>
                    <button onClick={deleteGraph} className="close-button">
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