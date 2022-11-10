import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { FiSettings } from "react-icons/fi"
import { useEffect, useState } from "react";
import api from '../../services/api'
import useSnackContext from "../../hooks/useSnackContext";

export default function EditEdgeDialogue({ edgeWeight, edgeId, getEdgesList }) {
    const [open, setOpen] = useState(false);
    const [weight,setWeight] = useState('');
    const {setSnack} = useSnackContext();

    const handleClickToOpen = () => {
        setWeight(edgeWeight);
        setOpen(true);
    };

    const handleToClose = () => {
        setOpen(false);
    };

    const editEdge = () => {
        api.get(`/editar/aresta/${edgeId}/${weight}`)
            .then((response) => {
                getEdgesList();
                handleToClose();
                setSnack((prevState)=>{return {...prevState, open: true, message: "Aresta editada com sucesso!", severity: "success"}});
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
                <h1 className="dialogue-title">Editar Aresta</h1>
                    <label htmlFor="nodeLabel" className="input-label">Peso</label>
                    <input value={weight} pattern="[0-9]*"onChange={(e) => { if(e.target.validity.valid)setWeight(e.target.value);}} className="label-input" id="nodeLabel"></input>  
                </DialogContent>

                <DialogActions>
                    <button onClick={editEdge} hidden={weight.length < 1} className="close-button">
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