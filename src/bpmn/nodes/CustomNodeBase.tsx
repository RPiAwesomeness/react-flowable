import { PropsWithChildren, ReactElement, useId, useMemo } from 'react';
import { Handle, HandleType, Position, useReactFlow } from 'reactflow';

interface CustomNodeBaseProps extends PropsWithChildren {
  nodeId: string;
  handles?: { [P in Position]?: HandleType };
  className?: string;
}

function CustomNodeBase({
  nodeId,
  children,
  handles = {},
  className = '',
}: CustomNodeBaseProps): ReactElement {
  const id = useId();

  const { getNode } = useReactFlow();
  const node = useMemo(() => getNode(nodeId), [nodeId]);
  const [width, height] = useMemo(
    () => [node?.width ?? 32, node?.height ?? 32],
    [node?.width, node?.height],
  );

  return (
    <div
      style={{
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width,
        height,
      }}
    >
      <div id={`${nodeId}-toolbar-portal`} />
      {Object.entries(handles).map(([pos, type]) => (
        <Handle
          key={`${id}-handle-${pos}`}
          position={pos as Position}
          type={type}
        />
      ))}
      <div className={['basic-node', className].join(' ')}>{children}</div>
    </div>
  );
}

export default CustomNodeBase;
