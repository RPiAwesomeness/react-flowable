import { ReactElement, useCallback, useState } from 'react';

import {
  XYPosition,
  getNodePositionWithOrigin,
  useOnSelectionChange,
  useReactFlow,
} from 'reactflow';
import { MdDeleteOutline, MdEdit } from 'react-icons/md';
import IconButton from 'components/IconButton';

const DEFAULT_POS: XYPosition = { x: 0, y: 0 };

function Toolbar(): ReactElement | null {
  const { deleteElements, getEdges, flowToScreenPosition } = useReactFlow();

  const [nodeId, setNodeId] = useState<string>();
  const [label, setLabel] = useState('');
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState<XYPosition>(DEFAULT_POS);

  useOnSelectionChange({
    onChange: ({ nodes }) => {
      // TODO: Support deleting multiple items when group-selected
      if (nodes.length === 0) {
        setVisible(false);
        return;
      }

      // Retrieve position of selected node and get absolute position (position member is relative to parent for nested nodes)
      const firstNode = nodes.at(0)!;
      const { id, data, width = 0, height = 0 } = firstNode;
      const { positionAbsolute } = getNodePositionWithOrigin(firstNode);
      console.log(positionAbsolute.x, width, positionAbsolute.y, height);
      setNodeId(id);
      setPosition(flowToScreenPosition(positionAbsolute));
      setLabel(data?.label || 'Unknown Node');
      setVisible(true);
    },
  });

  const handleEdit = useCallback(() => {
    console.log('editing', nodeId);
  }, [nodeId]);
  const handleDelete = useCallback(() => {
    if (!nodeId) return;

    const edges = getEdges().filter(
      ({ source, target }) => source === nodeId || target === nodeId,
    );

    // Nuke node and remove any attached edges
    deleteElements({
      nodes: [{ id: nodeId }],
      edges,
    });
  }, [nodeId]);

  return !visible ? null : (
    <div
      style={{
        position: 'absolute',
        zIndex: 1000,
        left: position.x - 64,
        top: position.y - 56,
        alignContent: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: 56,
        }}
      >
        <IconButton
          title={`Delete ${label}`}
          onClick={handleDelete}
          icon={<MdDeleteOutline />}
        />
        <IconButton
          title={`Edit ${label}`}
          onClick={handleEdit}
          icon={<MdEdit />}
        />
      </div>
    </div>
  );
}

export default Toolbar;
