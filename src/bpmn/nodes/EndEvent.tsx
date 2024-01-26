import { ReactElement } from 'react';
import { NodeProps } from 'reactflow';
import CustomNodeBase from './CustomNodeBase';

interface EndEventData {
  label: string;
}

function EndEvent({ id, data }: NodeProps<EndEventData>): ReactElement {
  return (
    <CustomNodeBase
      nodeId={id}
      handles={{ left: 'target' }}
      className="end-event"
    >
      {data.label ? <p>{data.label}</p> : null}
    </CustomNodeBase>
  );
}

export default EndEvent;
