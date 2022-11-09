import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { FiTrash } from "react-icons/fi"
import { useState } from "react";
import api from '../../services/api'
import { useContext } from "react";
import LoginContext from "../../context/LoginContext";
import { useNavigate } from "react-router-dom";
import {FiEdit3} from "react-icons/fi"
import "./RenameGraphDialog.css"


export default function RenameGraphDialog({graphId,name}) {
    const [open, setOpen] = useState(false);
    const [graphName,setGraphName] = useState(name);
    let navigate = useNavigate();

    const handleClickToOpen = () => {
        setOpen(true);
        setGraphName(name);
    };

    const handleToClose = () => {
        setOpen(false);
    };

    const renameGraph = () => {
        const graph = {
            id_grafo: graphId,
            nome_grafo: graphName
        }
        api.post(`/edita/grafo`,graph)
        .then((response)=>{
            handleToClose();
            navigate(`/ListaNos/${graphId}/${graphName}`, { replace: true });
        })
        .catch((error)=>{
            alert(error.response.data.detail);
        })
    }

    return (
        <>

            <div className="editGraphName-button" onClick={handleClickToOpen}>
                <FiEdit3></FiEdit3>
            </div>
            <Dialog open={open} onClose={handleToClose}>
                <DialogContent>
                    <h1 className="dialogue-title">Renomear Grafo</h1>
                    <label htmlFor="nodeLabel" className="input-label">Nome</label>
                    <input value={graphName} onChange={(e)=>{setGraphName(e.target.value);}} className="label-input" id="graphLabel"></input>

                </DialogContent>
                <DialogActions>
                    <button onClick={renameGraph} hidden={graphName.length < 1} className="close-button">
                        Renomear
                    </button>

                    <button onClick={handleToClose} className="close-button">
                        Fechar
                    </button>
                </DialogActions>
            </Dialog>

        </>
    );
}