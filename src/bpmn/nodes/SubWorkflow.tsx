import { ReactElement } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';

interface SubWorkflowData {
  label?: string;
}

function SubWorkflow({
  data: { label = 'Unknown Sub-Workflow' },
}: NodeProps<SubWorkflowData>): ReactElement {
  return (
    <div className="basic-node sub-workflow">
      <Handle type="target" position={Position.Left} />
      <h2>{label} blep</h2>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

export default SubWorkflow;
