import { ReactElement } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';
import Toolbar from './Toolbar';

interface EndEventData {
  label: string;
}

function EndEvent({ id, data }: NodeProps<EndEventData>): ReactElement {
  return (
    <>
      <Toolbar id={id} label={data.label ?? 'End Event'} />
      <Handle type="target" position={Position.Left} />
      <div className="basic-node end-event">
        {data.label ? <p>{data.label}</p> : null}
      </div>
    </>
  );
}

export default EndEvent;
