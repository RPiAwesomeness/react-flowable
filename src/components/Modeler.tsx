import { ReactElement, useCallback, useState } from 'react';

import ReactFlow, {
  Background,
  Controls,
  Edge,
  ReactFlowProps,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { bpmnNodeTypes } from '../bpmn/nodes';
import '../bpmn/nodes/nodeStyles.css';
import { Node } from '../bpmn/nodes';
import Header from './Header';

const initialNodes: Node[] = [
  {
    id: '1',
    data: { label: 'Hello' },
    position: { x: 0, y: 0 },
    type: 'input',
  },
  {
    id: '2',
    data: { label: 'World' },
    position: { x: 100, y: 100 },
  },
  {
    id: '3',
    data: { label: '', name: 'Test' },
    position: { x: 150, y: 150 },
    type: 'userTask',
  },
  {
    id: '4',
    data: { label: 'START' },
    position: { x: 200, y: 200 },
    type: 'startEvent',
  },
];

const initialEdges: Edge[] = [
  { id: '1-2', source: '1', target: '2', label: 'to the', type: 'step' },
];

function Modeler(): ReactElement {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const handleNodesChange = useCallback<
    Required<ReactFlowProps>['onNodesChange']
  >((changes) => setNodes((nds) => applyNodeChanges(changes, nds)), []);
  const handleEdgesChange = useCallback<
    Required<ReactFlowProps>['onEdgesChange']
  >((changes) => setEdges((eds) => applyEdgeChanges(changes, eds)), []);

  const handleConnect = useCallback<Required<ReactFlowProps>['onConnect']>(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [],
  );

  return (
    <div
      style={{
        flex: 1,
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Header edges={edges} nodes={nodes} />
      <ReactFlow
        fitView
        nodes={nodes}
        edges={edges}
        nodeTypes={bpmnNodeTypes}
        onNodesChange={handleNodesChange}
        onEdgesChange={handleEdgesChange}
        onConnect={handleConnect}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default Modeler;
