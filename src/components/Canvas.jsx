import React, { useCallback, useState } from 'react';
import ReactFlow, {
    useNodesState,
    useEdgesState,
    addEdge,
    ReactFlowProvider
} from 'reactflow';
import 'reactflow/dist/style.css';
import '../App.css';

let id = 0;
const getId = () => `node_${id++}`;

const Canvas = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [rfInstance, setRfInstance] = useState(null);

    const onInit = useCallback((instance) => setRfInstance(instance), []);

    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

    const onClick = useCallback((event) => {
        if (!rfInstance) return;

        const bounds = event.target.getBoundingClientRect();
        const position = rfInstance.project({
            x: event.clientX - bounds.left,
            y: event.clientY - bounds.top,
        });

        const newNode = {
            id: getId(),
            position,


        };

        setNodes((nodes) => [...nodes, newNode]);


        const newEdge = {
            animated: true,
        };

        setEdges((edges) => [...edges, newEdge]);
    }
        , [rfInstance, nodes]);

    return (
        <div style={{ width: '100vw', height: '100vh' }} onClick={onClick}>
            <ReactFlowProvider>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onInit={onInit}
                />
            </ReactFlowProvider>
        </div>
    )
};

export default Canvas;
