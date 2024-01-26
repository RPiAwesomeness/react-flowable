import { ReactElement } from 'react';

import { NodeProps } from 'reactflow';

import CustomNodeBase from './CustomNodeBase';

interface EndEventData {
  title: string;
}

function EndEvent({ data: { title } }: NodeProps<EndEventData>): ReactElement {
  return (
    <CustomNodeBase
      handles={{ left: { type: 'target' } }}
      className="end-event"
      title={title}
    />
  );
}

export default EndEvent;
