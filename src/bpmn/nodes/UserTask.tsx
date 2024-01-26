import { ReactElement } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';
import Toolbar from './Toolbar';

interface UserTaskData {
  name?: string;
  documentation?: string;
  fields?: Record<string, string>;
}

function UserTask({
  id,
  data: { name = 'Unknown Task', documentation = '', fields },
}: NodeProps<UserTaskData>): ReactElement {
  return (
    <>
      <Toolbar id={id} label={name} />
      <Handle type="target" position={Position.Left} />
      <div className="basic-node user-task">
        <h5>{name}</h5>
        {documentation ? <h6 className="subtitle">{documentation}</h6> : null}
        {fields ? (
          <div className="task-fields">
            {Object.entries(fields).map(([key, value]) => (
              <div>
                <span>{key}:</span>
                <span>{value}</span>
              </div>
            ))}
          </div>
        ) : null}
      </div>
      <Handle type="source" position={Position.Right} />
    </>
  );
}

export default UserTask;
