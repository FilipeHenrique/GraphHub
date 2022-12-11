import { useState, useEffect, useContext, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAutoAnimate } from '@formkit/auto-animate/react'


import './GraphvisPage.css'
import api from '../../services/api'

import {FiCamera, FiLogOut} from "react-icons/fi"
import Graphvis from '../../components/Graphvis/Graphvis'
import NetworkButton from '../../components/NetworkButton/NetworkButton';
import UploadFileDialog from '../../components/UploadFIle/UploadFIleDialog';
import CreateGraphDialog from '../../components/CreateGraphDialog/CreateGraphDialog';

import LoginContext from '../../context/LoginContext';
import { toPng } from 'html-to-image';
import useSnackContext from '../../hooks/useSnackContext';




export default function GraphvisPage() {

    const [id, setId] = useState(1);

    const context = useContext(LoginContext);

    // const [parent] = useAutoAnimate();

    const [graphList, setGraphList] = useState([]);
    const [filteredGraph, setFilteredGraph] = useState([]);

    const ref = useRef(null);

    const {setSnack} = useSnackContext();

    const getData = () => {
        api.get(`/lista/grafos/${context.userId}`)
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

    useEffect(() => {
        getData();
    }, [])

    return (
        <>
            <div className='main-page'>
                
                <div className="graph-list-header">
                    {/* <input type="text" className='page-filter' placeholder='Buscar...' onChange={event => { filter(event.target.value) }}></input> */}
                    <h1>{context.userName}</h1>
                    <div>
                        <CreateGraphDialog getData={getData}></CreateGraphDialog>
                        <UploadFileDialog getData={getData}></UploadFileDialog>
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
                                    setStatus
                                    editGraph
                                    deleteGraph
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
                                <button className='page-graph-download-network-button' onClick={downloadImage}><FiCamera /></button>
                                {graphList.map((graph, index) =>
                                    id === index + 1 ?
                                        <div style={{backgroundColor: 'white'}} ref={ref}>
                                            <Graphvis key={index} nodes={graph.nodes} edges={graph.edges}></Graphvis>
                                        </div>
                                        :
                                        <>
                                        </>
                                )}
                            </div>
                            : <h1>Você não possui grafos cadastrados.</h1>
                    }

                </div>
            </div>

        </>
    );
}