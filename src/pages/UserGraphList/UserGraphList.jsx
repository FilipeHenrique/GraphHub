import { useState, useEffect, useContext, useRef, useCallback } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useAutoAnimate } from '@formkit/auto-animate/react'

import api from '../../services/api'

import {FiDownload, FiLogOut} from "react-icons/fi"
import Graphvis from '../../components/Graphvis/Graphvis'
import NetworkButton from '../../components/NetworkButton/NetworkButton';
import UploadFileDialog from '../../components/UploadFIle/UploadFIleDialog';
import CreateGraphDialog from '../../components/CreateGraphDialog/CreateGraphDialog';

import LoginContext from '../../context/LoginContext';
import { toPng } from 'html-to-image';
import useSnackContext from '../../hooks/useSnackContext';




export default function UserGraphList() {

    let { userName } = useParams();

    const [id, setId] = useState(1);

    const context = useContext(LoginContext);

    const [graphList, setGraphList] = useState([]);
    const [filteredGraph, setFilteredGraph] = useState([]);

    const ref = useRef(null);
    const {setSnack} = useSnackContext();

    const getData = () => {
        api.get(`/pesquisa/listagem/${userName}`)
            .then((response) => {
                setFilteredGraph(response.data.graphTimeLine);
                setGraphList(response.data.graphTimeLine);
            })
        .catch((error)=>{
          alert(error.response.data.detail);
        })
    }

    const downloadImage = useCallback(() => {
        if (ref.current === null) {
            return
        }

        toPng(ref.current, { cacheBust: true, })
            .then((dataUrl) => {
                const link = document.createElement('a')
                link.download = 'network-snapshot.png'
                link.href = dataUrl
                link.click()
                setSnack({ open: true, message: "Imagem baixada com sucesso!", severity: "success"});
            })
            .catch((err) => {
                console.log(err)
            })
    }, [ref])

    let location = useLocation();
    
    useEffect(() => {
        getData();
    }, [location]);

    return (
        <>
            <div className='main-page'>
                <div className="graph-list-header">
                    {/* <input type="text" className='page-filter' placeholder='Buscar...' onChange={event => { filter(event.target.value) }}></input> */}
                    <h1>{userName}</h1>
                    <div>
                        <a href='' className='tertiary-button' onClick={() => { context.Logout(); }}>Sair <FiLogOut></FiLogOut></a>
                    </div>

                </div>


                <div className='page-container'>
                    <div className='page-buttons-container' /*ref={parent}*/>
                        {
                            filteredGraph && filteredGraph.map((graph, index) =>
                                <NetworkButton
                                    id={graph.id}
                                    label={graph.nome}
                                    key={index}
                                    nodes={graph.nodesNumber}
                                    edges={graph.edgesNumber}
                                    isPublic={graph.isPublic}
                                    setId={setId}
                                    onClick={(e) => { e.preventDefault(); setId(index + 1); }}
                                    updateList={getData}    
                                    forkable                       
                                    className={id === index + 1 ? 'network-button-selected' : 'network-button-container'}
                                />
                            )
                        }

                    </div>
                    {
                        graphList.length > 0 ?
                            <div className='page-graph-container'>
                                <span className='page-graph-id-label'>
                                    <h2 className='page-graph-id-label-text'>#{id}</h2>
                                </span>
                                <button className='page-graph-download-network-button' onClick={downloadImage}><FiDownload /></button>
                                {graphList.map((graph, index) =>
                                    id === index + 1 ?
                                        <div style={{backgroundColor: 'white'}} ref={ref}>
                                            <Graphvis key={graph.id} nodes={graph.nodes} edges={graph.edges}></Graphvis>
                                        </div>
                                        :
                                        <>
                                        </>
                                )}
                            </div>
                            : <h1>Usuário não possui grafos cadastrados.</h1>
                    }

                </div>
            </div>

        </>
    );
}