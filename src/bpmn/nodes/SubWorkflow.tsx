import { ReactElement } from 'react';
import { Handle, NodeProps, NodeResizer, Position } from 'reactflow';

interface SubWorkflowData {
  label?: string;
}

function SubWorkflow({
  selected,
  data: { label = 'Unknown Sub-Workflow' },
}: NodeProps<SubWorkflowData>): ReactElement {
  return (
    <>
      <Handle type="target" position={Position.Left} />
      <div className="sub-workflow">
        <h5>{label}</h5>
      </div>
      <Handle type="source" position={Position.Right} />
      <NodeResizer isVisible={selected} minWidth={200} minHeight={100} />
    </>
  );
}

export default SubWorkflow;
