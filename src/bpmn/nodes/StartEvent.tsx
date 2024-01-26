import { ReactElement } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';
import Toolbar from './Toolbar';

interface StartEventData {
  label: string;
}

function StartEvent({ id, data }: NodeProps<StartEventData>): ReactElement {
  return (
    <>
      <Toolbar id={id} label={data.label ?? 'Start Event'} />
      <div className="basic-node start-event">
        {data.label ? <p>{data.label}</p> : null}
      </div>
      <Handle type="source" position={Position.Right} />
    </>
  );
}

export default StartEvent;
