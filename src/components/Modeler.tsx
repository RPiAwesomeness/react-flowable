import { ReactElement, useCallback, useState } from 'react';

import ReactFlow, {
  Background,
  Controls,
  DefaultEdgeOptions,
  MarkerType,
  MiniMap,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { initialEdges, initialNodes } from 'initialData';
import { Node, bpmnNodeTypes } from '../bpmn/nodes';
import '../bpmn/nodes/nodeStyles.css';
import SideBar, { SideBarProps } from './SideBar';
import Toolbar from 'bpmn/nodes/Toolbar';

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
  const { screenToFlowPosition, addNodes } = useReactFlow();

  const [nodeId, setNodeId] = useState(initialNodes.length);
  const [nodes] = useNodesState(initialNodes);
  const [edges] = useEdgesState(initialEdges);

  const handleNodeAdd = useCallback<SideBarProps['onNodeAdd']>(
    (type, label, data, width, height) => {
      const newNode: Node = {
        type,
        id: `node-${nodeId}`,
        position: screenToFlowPosition({ x: 32, y: 32 }),
        style: { width, height },
        data: { ...data, label },
      };

      addNodes(newNode);
      setNodeId((prev) => prev + 1);
    },
    [nodeId],
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
        defaultNodes={initialNodes}
        defaultEdges={initialEdges}
        nodeTypes={bpmnNodeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        connectionLineStyle={connectionLineStyle}
      >
        <Background />
        <Controls />
        <MiniMap />
        <Toolbar />
      </ReactFlow>
    </div>
  );
}

export default Modeler;
