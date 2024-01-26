import { ReactElement, useCallback, useMemo, useState } from 'react';

import { useOnSelectionChange, useReactFlow } from 'reactflow';
import { MdDeleteOutline, MdEdit } from 'react-icons/md';
import IconButton from 'components/IconButton';
import { createPortal } from 'react-dom';

function Toolbar(): ReactElement | null {
  const { deleteElements, getEdges } = useReactFlow();

  const [nodeId, setNodeId] = useState<string>();
  const [label, setLabel] = useState('');
  const [visible, setVisible] = useState(false);

  const target = useMemo(
    () => document.getElementById(`${nodeId}-toolbar-portal`),
    [nodeId],
  );

  useOnSelectionChange({
    onChange: ({ nodes }) => {
      // TODO: Support deleting multiple items when group-selected
      if (nodes.length === 0) {
        setVisible(false);
        return;
      }

      const firstNode = nodes.at(0)!;
      const {
        id,
        data: { label = 'Unknown Node' },
      } = firstNode;
      setNodeId(id);
      setLabel(label);
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

  return visible && !!target
    ? createPortal(
        <div
          style={{
            position: 'absolute',
            left: -16,
            bottom: 32,
            marginBottom: 4,
            justifyContent: 'center',
            alignItems: 'center',
            width: 88,
            border: '2px solid #eee',
            borderRadius: 32,
            zIndex: 1000,
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
        </div>,
        target,
      )
    : null;
}

export default Toolbar;
