import {
  HTMLAttributes,
  PropsWithChildren,
  ReactElement,
  useId,
  useState,
} from 'react';
import {
  Handle,
  HandleType,
  NodeResizer,
  Position,
  useNodeId,
  useOnSelectionChange,
} from 'reactflow';

interface CustomNodeBaseProps
  extends PropsWithChildren,
    HTMLAttributes<HTMLDivElement> {
  handles?: { [P in Position]?: { type: HandleType, title?: string } };
  className?: string;
  resizable?: boolean;
}

function CustomNodeBase({
  children,
  resizable = false,
  handles = {},
  className = '',
  ...rootProps
}: CustomNodeBaseProps): ReactElement {
  const id = useId();

  // We are inside a node - there will always be an ID
  const nodeId = useNodeId()!;

  const [selected, setSelected] = useState(false);
  useOnSelectionChange({
    onChange: ({ nodes }) => {
      const firstNode = nodes.at(0);
      setSelected(firstNode?.id === nodeId);
    },
  });

  return (
    <div className="node-base" {...rootProps}>
      <div id={`${nodeId}-toolbar-portal`} />
      {Object.entries(handles).map(([pos, { type, title }]) => (
        <Handle
          key={`${id}-handle-${pos}`}
          position={pos as Position}
          type={type}
          title={title}
        />
      ))}
      <NodeResizer
        nodeId={nodeId}
        isVisible={resizable && selected}
        minWidth={32}
        minHeight={32}
      />
      <div className={['basic-node', className].join(' ')}>{children}</div>
    </div>
  );
}

export default CustomNodeBase;
