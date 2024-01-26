import { ReactElement } from 'react';
import { NodeProps } from 'reactflow';
import CustomNodeBase from './CustomNodeBase';

interface StartEventData {
  label: string;
}

function StartEvent({ id, data }: NodeProps<StartEventData>): ReactElement {
  return (
    <CustomNodeBase nodeId={id} handles={{ right: 'source' }} className="start-event">
      {data.label ? <p>{data.label}</p> : null}
    </CustomNodeBase>
  );
}

export default StartEvent;
