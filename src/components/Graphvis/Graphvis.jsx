import Graph from "react-graph-vis";


export default function Graphvis({nodes, edges}) {
  
    const graph = {nodes,edges};

    
    const options = {
      
      layout: {
        hierarchical: false,
        improvedLayout: false
      },
      edges: {
        color: "#000000",
        smooth: {
          type: 'curvedCW',
          roundness: 0.15
        }
      },
      nodes: {
        shape: "dot",
        color: "lightgreen"
      },
      height: "500px",
      physics: {

        // keep nodes physics enabled
        enabled: true,

        barnesHut: {
          springLength: 120,
        },

        // nodes don't start shaking on the lib
        stabilization: {
          enabled: true,
        },
      },
    };
  
    const events = {
      select: function(event) {
        var { nodes, edges } = event;
      }
    };
    
    return (
      <>
        <Graph
          graph={graph}
          options={options}
          events={events}
          getNetwork={network => {
            //  if you want access to vis.js network api you can set the state in a parent component using this property
          }}
        />
      </>
    );
  }