import { ReactElement, useCallback, useState } from 'react';

import ReactFlow, {
  Background,
  ConnectionLineType,
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
  type: ConnectionLineType.SmoothStep,
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
  const { addNodes } = useReactFlow();

  const [nodeId, setNodeId] = useState(initialNodes.length);
  const [nodes] = useNodesState(initialNodes);
  const [edges] = useEdgesState(initialEdges);

  const handleNodeAdd = useCallback<SideBarProps['onNodeAdd']>(
    (type, label, data, width, height) => {
      const newNode: Node = {
        type,
        width,
        height,
        id: `node-${nodeId}`,
        position: { x: 32, y: 32 },
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
        connectionLineType={ConnectionLineType.SmoothStep}
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
