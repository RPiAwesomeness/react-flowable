import { exportBpmn } from 'bpmn';
import { ReactElement, useCallback } from 'react';
import { Edge } from 'reactflow';

import type { Node } from '../bpmn/nodes';

interface HeaderProps {
  edges: Edge[];
  nodes: Node[];
}

function Header({ edges, nodes }: HeaderProps): ReactElement {
  const handleExport = useCallback(() => {
    console.log('Exporting to BPMN XML');

    const doc = exportBpmn('test-id', 'test-name', nodes, edges);
    console.log(new XMLSerializer().serializeToString(doc));
  }, [nodes, edges]);

  return (
    <div style={{ marginBottom: 16 }}>
      <button onClick={handleExport}>Export to BPMN XML</button>
    </div>
  );
}

export default Header;
