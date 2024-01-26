import { ReactElement, useCallback } from 'react';

import { NodeToolbar, useReactFlow } from 'reactflow';
import { MdDeleteOutline, MdEdit } from 'react-icons/md';
import IconButton from 'components/IconButton';

interface ToolbarProps {
  id: string;
  label: string;
}

function Toolbar({ id, label }: ToolbarProps): ReactElement {
  const { deleteElements, getEdges } = useReactFlow();

  const handleEdit = useCallback(() => {
    console.log('editing', id);
  }, [id]);
  const handleDelete = useCallback(() => {
    const edges = getEdges().filter(
      ({ source, target }) => source === id || target === id,
    );

    // Nuke node and remove any attached edges
    deleteElements({
      nodes: [{ id }],
      edges,
    });
  }, [id]);

  return (
    <NodeToolbar
      nodeId={id}
      offset={-8}
      align="start"
      style={{ marginLeft: 8 }}
    >
      <div
        style={{
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
    </NodeToolbar>
  );
}

export default Toolbar;
