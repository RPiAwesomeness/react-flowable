import { ReactElement, useEffect } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';

function StartEvent({ data }: NodeProps): ReactElement {
  useEffect(() => {
    console.log('data', data);
  }, []);
  return (
    <div className="basicNode startEvent">
      <Handle type="source" position={Position.Right} />
      <div>
        {data.label && typeof data.label === 'string' ? (
          <p>{data.label}</p>
        ) : null}
      </div>
    </div>
  );
}

export default StartEvent;
