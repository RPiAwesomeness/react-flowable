import { ReactElement } from 'react';
import { NodeProps } from 'reactflow';
import CustomNodeBase from './CustomNodeBase';

interface UserTaskData {
  name?: string;
  documentation?: string;
  fields?: Record<string, string>;
}

function UserTask({
  data: { name = 'Unknown Task', documentation = '', fields },
}: NodeProps<UserTaskData>): ReactElement {
  return (
    <CustomNodeBase
      resizable
      handles={{ left: { type: 'target' }, right: { type: 'source' } }}
      className="user-task"
    >
      <h5>{name}</h5>
      {documentation ? <h6 className="subtitle">{documentation}</h6> : null}
      {fields ? (
        <div className="task-fields">
          {Object.entries(fields).map(([key, value]) => (
            <div key={key}>
              <span>{key}:</span>
              <span>{value}</span>
            </div>
          ))}
        </div>
      ) : null}
    </CustomNodeBase>
  );
}

export default UserTask;
