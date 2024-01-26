import { ReactElement } from 'react';

import { NodeProps } from 'reactflow';

import CustomNodeBase from './CustomNodeBase';
import { MdAdd } from 'react-icons/md';

interface ExclusiveGatewayData {
  condition: string;
}

function ExclusiveGateway({
  data: { condition = 'N/A' },
}: NodeProps<ExclusiveGatewayData>): ReactElement {
  return (
    <CustomNodeBase
      handles={{
        left: { type: 'target' },
        right: { type: 'source', title: 'success' },
        bottom: { type: 'source', title: 'failure' },
      }}
      className="exclusive-gateway"
      title={condition}
    >
      <div style={{ width: 48, height: 48 }}>
        <MdAdd style={{ width: '100%', height: '100%' }} />
      </div>
    </CustomNodeBase>
  );
}

export default ExclusiveGateway;
