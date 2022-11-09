import DeleteGraphDialog from './DeleteGraphDialog';
import { FiSettings, FiDownloadCloud, FiLock, FiUnlock } from "react-icons/fi"
import './NetworkButton.css'
import { Link } from 'react-router-dom';
import api from '../../services/api';

export default function NetworkButton({ onClick, id, setId, setStatus, editGraph, deleteGraph, label, nodes, edges, className, isPublic, updateList }) {

    const downloadGraphTxt = () => {
        api.get(`/download/${id}`)
            .then((response) => {
                const file = new Blob([response.data], { type: 'text/plain;charset=utf-8' });
                const fileURL = window.URL.createObjectURL(file);
                let alink = document.createElement('a');
                alink.href = fileURL;
                alink.download = `${label}.txt`;
                alink.click();
            })
            .catch((error) => {
                alert(error);
            })
    }

    const changePublicStatus = () => {
        api.get(`/edita/grafo/visibility/${id}`)
            .then(response => {
                updateList();
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
                    <div className='crud-button'>
                        <Link to={`/ListaNos/${id}/${label}`} style={{ textDecoration: 'none', color: 'unset' }}>
                            <FiSettings></FiSettings>
                        </Link>
                    </div>
                }
                {setStatus &&
                    <button className='crud-button' onClick={() => { changePublicStatus() }}>
                        {isPublic == true ? <FiUnlock /> : <FiLock />}
                    </button>
                }
                <button className='crud-button' onClick={() => { downloadGraphTxt() }}><FiDownloadCloud /></button>
                {deleteGraph &&
                    <DeleteGraphDialog graphId={id} updateList={updateList} setId={setId}></DeleteGraphDialog>
                }
            </div>

        </div>
    );
}