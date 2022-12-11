import DeleteGraphDialog from './DeleteGraphDialog';
import { FiSettings, FiDownloadCloud, FiLock, FiUnlock } from "react-icons/fi"
import './NetworkButton.css'
import { Link } from 'react-router-dom';
import api from '../../services/api';
import useSnackContext from '../../hooks/useSnackContext';
import { BiGitRepoForked } from 'react-icons/bi'
import { useContext } from 'react';
import LoginContext from '../../context/LoginContext';
import Tooltip from '@mui/material/Tooltip';

export default function NetworkButton({ onClick, id, setId, setStatus, editGraph, deleteGraph, label, nodes, edges, className, isPublic, updateList, forkable }) {

    const { setSnack } = useSnackContext();
    const { userId } = useContext(LoginContext);

    const downloadGraphTxt = () => {
        api.get(`/download/${id}`)
            .then((response) => {
                const file = new Blob([response.data], { type: 'text/plain;charset=utf-8' });
                const fileURL = window.URL.createObjectURL(file);
                let alink = document.createElement('a');
                alink.href = fileURL;
                alink.download = `${label}.txt`;
                alink.click();
                setSnack((prevState) => { return { ...prevState, open: true, message: "Download Completo!", severity: "success" } });
            })
            .catch((error) => {
                alert(error);
            })
    }

    const changePublicStatus = () => {
        api.get(`/edita/grafo/visibility/${id}`)
            .then(response => {
                updateList();
                setSnack((prevState) => { return { ...prevState, open: true, message: "Visibilidade alterada com sucesso!", severity: "success" } });
            })
            .catch(error => {
                alert(error);
            })
    }

    const forkGraph = () => {
        api.get(`/fork/${id}/${userId}`)
            .then(response => {
                setSnack((prevState) => { return { ...prevState, open: true, message: "Fork realizado com sucesso!", severity: "success" } });
            })
            .catch(error => {
                alert(error);
            })
    }

    return (
        <div className="network-button-flex">

            <div onClick={onClick} className={`${className}`}>
                <h2 className='network-button-id'>#{label}</h2>
                <p className='network-button-timestamp'> Nós: {nodes}</p>
                <p className='network-button-timestamp'> Arestas: {edges}</p>
            </div>

            <div className='network-button_options'>
                {editGraph &&
                    <Tooltip title={<p style={{ fontSize: '12px', padding: '3px' }}>Editar Grafo</p>}>
                        <div className='crud-button'>
                            <Link to={`/ListaNos/${id}/${label}`} style={{ textDecoration: 'none', color: 'unset' }}>
                                <FiSettings></FiSettings>
                            </Link>
                        </div>
                    </Tooltip>
                }
                {setStatus &&
                    <Tooltip title={<p style={{ fontSize: '12px', padding: '3px' }}>Alterar Privacidade</p>}>
                        <button className='crud-button' onClick={() => { changePublicStatus() }}>
                            {isPublic == true ? <FiUnlock /> : <FiLock />}
                        </button>
                    </Tooltip>

                }
                <Tooltip title={<p style={{ fontSize: '12px', padding: '3px' }}>Baixar .txt</p>}>
                    <button className='crud-button' onClick={() => { downloadGraphTxt() }}><FiDownloadCloud /></button>
                </Tooltip>

                {deleteGraph &&
                        <DeleteGraphDialog graphId={id} updateList={updateList} setId={setId}></DeleteGraphDialog>
                }
                {
                    forkable &&
                    <Tooltip title={<p style={{ fontSize: '12px', padding: '3px' }}>Forkar Grafo</p>}>
                        <button className='crud-button' onClick={() => { forkGraph(); }}>
                            <BiGitRepoForked></BiGitRepoForked>
                        </button>
                    </Tooltip>
                }
            </div>

        </div>
    );
}