import { ReactElement } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';

interface EndEventData {
  label: string;
}

function EndEvent({ data }: NodeProps<EndEventData>): ReactElement {
  return (
    <>
      <Handle type="target" position={Position.Left} />
      <div className="basic-node end-event">
        {data.label ? <p>{data.label}</p> : null}
      </div>
    </>
  );
}

export default EndEvent;
