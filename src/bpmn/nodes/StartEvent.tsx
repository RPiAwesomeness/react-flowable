import { ReactElement } from 'react';

import { NodeProps } from 'reactflow';

import CustomNodeBase from './CustomNodeBase';

interface StartEventData {
  title: string;
}

function StartEvent({
  data: { title },
}: NodeProps<StartEventData>): ReactElement {
  return (
    <CustomNodeBase
      handles={{ right: { type: 'source' } }}
      className="start-event"
      title={title}
    />
  );
}

export default StartEvent;
