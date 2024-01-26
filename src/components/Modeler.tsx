import { ReactElement, useCallback, useState } from 'react';

import ReactFlow, {
  Background,
  DefaultEdgeOptions,
  MarkerType,
  MiniMap,
  ReactFlowProps,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { initialEdges, initialNodes } from 'initialData';
import { Node, bpmnNodeTypes } from '../bpmn/nodes';
import '../bpmn/nodes/nodeStyles.css';
import SideBar, { SideBarProps } from './SideBar';

const defaultEdgeOptions: DefaultEdgeOptions = {
  zIndex: 500,
  style: { strokeWidth: 2, stroke: 'black' },
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: 'black',
  },
};

const connectionLineStyle = {
  strokeWidth: 3,
  stroke: 'black',
};

function Modeler(): ReactElement {
  const { screenToFlowPosition } = useReactFlow();

  const [nodeId, setNodeId] = useState(initialNodes.length);
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const handleNodeAdd = useCallback<SideBarProps['onNodeAdd']>(
    (type, label, data) => {
      const newNode: Node = {
        type,
        id: `node-${nodeId}`,
        position: screenToFlowPosition({ x: 0, y: 0 }),
        data: { ...data, label },
      };

      setNodes((nodes) => nodes.concat(newNode));
      setNodeId((prev) => prev + 1);
    },
    [nodeId],
  );

  const handleNodesChange = useCallback<
    Required<ReactFlowProps>['onNodesChange']
  >((changes) => setNodes((nds) => applyNodeChanges(changes, nds)), []);
  const handleEdgesChange = useCallback<
    Required<ReactFlowProps>['onEdgesChange']
  >((changes) => {
    console.log('edges', changes);
    setEdges((eds) => applyEdgeChanges(changes, eds));
  }, []);

  const handleConnect = useCallback<Required<ReactFlowProps>['onConnect']>(
    (params) => {
      console.log('connect', params, edges);
      setEdges((eds) => addEdge(params, eds));
    },
    [edges],
  );

  return (
    <div
      style={{
        flex: 1,
        padding: 16,
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <SideBar edges={edges} nodes={nodes} onNodeAdd={handleNodeAdd} />
      <ReactFlow
        fitView
        nodes={nodes}
        edges={edges}
        nodeTypes={bpmnNodeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        connectionLineStyle={connectionLineStyle}
        onNodesChange={handleNodesChange}
        onEdgesChange={handleEdgesChange}
        onConnect={handleConnect}
      >
        <Background />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}

export default Modeler;
