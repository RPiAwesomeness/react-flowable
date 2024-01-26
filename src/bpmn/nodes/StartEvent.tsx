import { ReactElement } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';

interface StartEventData {
  label: string;
}

function StartEvent({ data }: NodeProps<StartEventData>): ReactElement {
  return (
    <div className="basic-node start-event">
      <Handle type="source" position={Position.Right} />
      <div>{data.label ? <p>{data.label}</p> : null}</div>
    </div>
  );
}

export default StartEvent;
