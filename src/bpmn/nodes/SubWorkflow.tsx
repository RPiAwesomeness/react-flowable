import { ReactElement } from 'react';
import { NodeProps } from 'reactflow';
import CustomNodeBase from './CustomNodeBase';

interface SubWorkflowData {
  label?: string;
}

function SubWorkflow({
  data: { label = 'Unknown Sub-Workflow' },
}: NodeProps<SubWorkflowData>): ReactElement {
  return (
    <CustomNodeBase
      resizable
      handles={{ left: { type: 'target' }, right: { type: 'source' } }}
      className="sub-workflow"
    >
      <h5 style={{ position: 'relative', top: -32 }}>{label}</h5>
    </CustomNodeBase>
  );
}

export default SubWorkflow;
