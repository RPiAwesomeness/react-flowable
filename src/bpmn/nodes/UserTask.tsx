import { ReactElement } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';

interface UserTaskData {
  name?: string;
  documentation?: string;
}

function UserTask({
  data: { name = 'Unknown Task', documentation = '' },
}: NodeProps<UserTaskData>): ReactElement {
  return (
    <>
      <Handle type="target" position={Position.Left} />
      <div className="basic-node user-task">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <h2>{name}</h2>
          <p>{documentation}</p>
        </div>
      </div>
      <Handle type="source" position={Position.Right} />
    </>
  );
}

export default UserTask;
