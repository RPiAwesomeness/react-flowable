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
    <div className="userTask basicNode">
      <Handle type="target" position={Position.Left} />
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
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

export default UserTask;
