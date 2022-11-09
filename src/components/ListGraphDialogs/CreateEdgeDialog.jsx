import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { FiPlusCircle } from "react-icons/fi"
import { useEffect, useState } from "react";
import api from '../../services/api'

export default function CreateEdgeDialogue({ graphId, getEdgesList }) {
    const [open, setOpen] = useState(false);
    const [nodes, setNodes] = useState([]);
    const [origin, setOrigin] = useState(null);
    const [target, setTarget] = useState(null);
    const [weight, setWeight] = useState('');

    const handleClickToOpen = () => {
        setOrigin(null);
        setTarget(null);
        setWeight('');
        setOpen(true);
    };

    const handleToClose = () => {
        setOpen(false);
    };

    const handleOrigin = (event) => {
        setOrigin(event.target.value);
    };

    const handleTarget = (event) => {
        setTarget(event.target.value);
    };

    const createEdge = () => {
        api.get(`/criar/aresta/${target}/${origin}/${weight}/${graphId}`)
            .then((response) => {
                getEdgesList();
                handleToClose();
            })
            .catch((error) => {
                alert(error.response.data.detail);
        })
    }

    useEffect(() => {
        api.get(`/lista/nos/${graphId}`)
            .then((response) => {
                setNodes(response.data);
            })
            .catch((error) => {
                alert(error);
            })
    }, [])

    return (
        <div>
            <button className="create-button"
                onClick={handleClickToOpen}>
                <FiPlusCircle ></FiPlusCircle>
            </button>
            <Dialog open={open} onClose={handleToClose}>
                <DialogContent>
                    <h1 className="dialogue-title">Criar Aresta</h1>
                    <div className="select-container">
                        <label htmlFor="selectOrigin" className="input-label">Origem</label>
                        <select onChange={handleOrigin} defaultValue={''}>
                            <option hidden></option>
                            {nodes?.map((item, index) => {
                                return <option key={"origin" + index} value={item.id}>{item.label}</option>;
                            })}
                        </select>
                    </div>
                    <div className="select-container">
                        <label htmlFor="selectTarget" className="input-label">Destino</label>
                        <select onChange={handleTarget} id="selectTarget">
                            <option hidden></option>
                            {nodes?.map((item, index) => {
                                return <option key={"target" + index} value={item.id}>{item.label}</option>;
                            })}
                        </select>
                    </div>
                    <div className="select-container">
                        <label htmlFor="weight" className="input-label">Peso</label>
                        <input value={weight} pattern="[0-9]*"onChange={(e) => { if(e.target.validity.valid)setWeight(e.target.value);}} className="label-input" id="weight" type="text"></input>
                    </div>
                </DialogContent>

                <DialogActions>
                    <button onClick={createEdge} className="close-button">
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