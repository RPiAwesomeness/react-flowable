import { ReactElement } from 'react';
import { NodeProps } from 'reactflow';
import CustomNodeBase from './CustomNodeBase';

interface EndEventData {
  label: string;
}

function EndEvent({ data }: NodeProps<EndEventData>): ReactElement {
  return (
    <CustomNodeBase
      handles={{ left: { type: 'target' } }}
      className="end-event"
    >
      {data.label ? <p>{data.label}</p> : null}
    </CustomNodeBase>
  );
}

export default EndEvent;
