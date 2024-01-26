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
      handles={{ left: 'target', right: 'source' }}
      className="sub-workflow"
    >
      <h5>{label}</h5>
    </CustomNodeBase>
  );
}

export default SubWorkflow;
