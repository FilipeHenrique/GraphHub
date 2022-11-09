import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { useEffect } from 'react';
import api from '../../services/api'
import "./ListNodesPage.css"
import DeleteNodeDialogue from '../../components/ListGraphDialogs/DeleteNodeDialog';
import EditNodeDialogue from '../../components/ListGraphDialogs/EditNodeDialog';
import DeleteEdgesDialogue from '../../components/ListGraphDialogs/DeleteEdgesDialog';
import EditEdgeDialogue from '../../components/ListGraphDialogs/EditEdgeDialog';
import RenameGraphDialog from '../../components/RenameGraphDialog/RenameGraphDialog';
import CreateNodeDialogue from '../../components/ListGraphDialogs/CreateNodeDialog';
import CreateEdgeDialogue from '../../components/ListGraphDialogs/CreateEdgeDialog';


export default function ListNodesPage() {

    let { graphId, graphName } = useParams();

    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);

    const [listView, setListView] = useState("nodes");

    const nodeButtons = (rowData) => {
        return (
            <div className='listNodesPage-buttons_container'>
                <EditNodeDialogue nodeId={rowData.id} nodeLabel={rowData.label} getNodesList={getNodesList}></EditNodeDialogue>
                <DeleteNodeDialogue nodeId={rowData.id} getNodesList={getNodesList} getEdgesList={getEdgesList}></DeleteNodeDialogue>
            </div>
        );
    };

    const edgeButtons = (rowData) => {
        return (
            <div className='listNodesPage-buttons_container'>
                <EditEdgeDialogue edgeId={rowData.id} edgeWeight={rowData.peso} getEdgesList={getEdgesList} ></EditEdgeDialogue>
                <DeleteEdgesDialogue edgeId={rowData.id} getEdgesList={getEdgesList}></DeleteEdgesDialogue>
            </div>
        );
    };

    const getNodesList = () => {
        api.get(`/lista/nos/${graphId}`)
            .then((response) => {
                setNodes(response.data);
            })
            .catch((error) => {
                alert(error);
            })
    }

    const getEdgesList = () => {
        api.get(`/lista/aresta/${graphId}`)
            .then((response) => {
                setEdges(response.data);
            })
            .catch((error) => {
                alert(error);
            })
    }

    useEffect(() => {
        getNodesList();
        getEdgesList();
    }, [])

    return (
        <>
            <div className='listNodesPage-container'>
                <div className='listNodesPage-titleEdit_container'>
                    <h1 className="listNodesPage-title">{graphName}</h1>
                    <RenameGraphDialog graphId={graphId} name={graphName}></RenameGraphDialog>
                </div>
                <div className='listNodesPage-topbuttons_container'>
                    <div className='listNodesPage-switch'>
                        <div
                            className={listView === "nodes" ? "listNodesPage-switch_selected " : "listNodesPage-switch_unselected "}
                            onClick={() => { setListView("nodes") }}
                        >Nós</div>
                        <div
                            className={listView === "edges" ? "listNodesPage-switch_selected " : "listNodesPage-switch_unselected "}
                            onClick={() => { setListView("edges") }}
                        >Arestas</div>
                    </div>
                    {listView === "nodes" && <CreateNodeDialogue getNodesList={getNodesList} graphId={graphId}></CreateNodeDialogue>}
                    {listView === "edges" && <CreateEdgeDialogue getEdgesList={getEdgesList} graphId={graphId}></CreateEdgeDialogue>}
                </div>
                {listView === "nodes" && <DataTable value={nodes} paginator rows={10} rowsPerPageOptions={[5, 10, 20]} onPage={0} showGridlines responsiveLayout="scroll">
                    <Column field="id" header="Id" style={{ width: '5%', fontSize: '14px' }}></Column>
                    <Column field="label" header="Label" style={{ fontSize: '14px' }}></Column>
                    <Column body={nodeButtons} header="Opções" style={{ width: '20%', fontSize: '14px' }}></Column>
                </DataTable>}

                {listView === "edges" && <DataTable value={edges} emptyMessage="O grafo não possui arestas" paginator rows={10} rowsPerPageOptions={[5, 10, 20]} onPage={0} showGridlines responsiveLayout="scroll">
                    <Column field="id" header="Id" style={{ width: '15%', fontSize: '14px' }}></Column>
                    <Column field="Source" header="Nó de Origem" style={{ width: '15%', fontSize: '14px' }}></Column>
                    <Column field="Target" header="Nó de Destino" style={{ width: '15%', fontSize: '14px' }}></Column>
                    <Column field="peso" header="Peso da Aresta" style={{ width: '10%', fontSize: '14px' }}></Column>
                    <Column body={edgeButtons} header="Opções" style={{ width: '10%', fontSize: '14px' }}></Column>
                </DataTable>}
            </div>
        </>
    );
}