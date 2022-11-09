import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { FiTrash } from "react-icons/fi"
import { useState } from "react";
import api from '../../services/api'
import { useContext } from "react";
import LoginContext from "../../context/LoginContext";
import {FiPlus} from "react-icons/fi"

export default function CreateGraphDialog({ getData}) {
    const [open, setOpen] = useState(false);
    const [graphName,setGraphName] = useState('');
    const [isPublic,setIsPublic] = useState(true);
    const context = useContext(LoginContext);

    const handleClickToOpen = () => {
        setOpen(true);
        setGraphName('');
    };

    const handleToClose = () => {
        setOpen(false);
    };

    const createGraph = () => {
        const graph = {
            user_id: context.userId,
            publico: isPublic,
            nome_grafo: graphName
        }

        api.post(`/cadastro/grafo_vazio`,graph)
        .then((response)=>{
            getData();
            handleToClose();
        })
        .catch((error)=>{
            alert(error.response.data.detail);
        })
    }

    return (
        <div>
            <button className="tertiary-button"
                onClick={handleClickToOpen}>
                Criar Grafo <FiPlus></FiPlus>
            </button>
            <Dialog open={open} onClose={handleToClose}>
                <DialogContent>
                    <h1 className="dialogue-title">Criar Grafo</h1>
                    
                    <div className="graphUpload-visibility_container">
                        <p>Visibilidade do grafo</p>
                        <div className='graphUpload-radios_container'>
                            <input type="radio" value="Público" name="ispublic"
                                checked={isPublic === true}
                                onChange={() => { setIsPublic(true) }} /> Público
                            <input type="radio" value="Privado" name="ispublic" onChange={() => { setIsPublic(false) }} /> Privado
                        </div>
                    </div>

                    <label htmlFor="nodeLabel" className="input-label">Nome</label>
                    <input value={graphName} onChange={(e)=>{setGraphName(e.target.value);}} className="label-input" id="graphLabel"></input>

                </DialogContent>
                <DialogActions>
                    <button onClick={createGraph} hidden={graphName.length < 1} className="close-button">
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