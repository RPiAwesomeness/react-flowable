import { exportBpmn } from 'bpmn';
import { ReactElement, useCallback } from 'react';
import { Controls, Edge } from 'reactflow';

import type { Node, BPMNNodeTypes } from '../bpmn/nodes';

export interface SideBarProps {
  edges: Edge[];
  nodes: Node[];
  onNodeAdd: (
    type: BPMNNodeTypes,
    label: string,
    data: Record<string, unknown>,
  ) => void;
}

function SideBar({ edges, nodes, onNodeAdd }: SideBarProps): ReactElement {
  const handleExport = useCallback(() => {
    console.log('Exporting to BPMN XML');

    const doc = exportBpmn('test-id', 'test-name', nodes, edges);
    console.log(new XMLSerializer().serializeToString(doc));
  }, [nodes, edges]);

  const addNode = useCallback(
    (type: BPMNNodeTypes) => {
      console.log('Adding', type);
      const label = prompt('Label');

      // Abort early
      if (label === null) return;

      let data = {};
      if (type === 'userTask') {
        data = {
          name: prompt('Name') || 'Unknown Task',
          documentation: prompt('Documentation (optional)') || '',
        };
      } else {
        data = { label };
      }

      onNodeAdd(type, label, data);
    },
    [onNodeAdd],
  );

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 100,
        marginRight: 16,
      }}
    >
      <div>
        <div>
          <button
            style={{ marginBottom: 4 }}
            onClick={() => addNode('startEvent')}
          >
            Add Start Node
          </button>
          <button
            style={{ marginBottom: 4 }}
            onClick={() => addNode('userTask')}
          >
            Add User Task Node
          </button>
          <button
            style={{ marginBottom: 4 }}
            onClick={() => addNode('subWorkflow')}
          >
            Add Sub-Workflow
          </button>
        </div>
        <button onClick={handleExport}>Export to BPMN XML</button>
      </div>
      <Controls />
    </div>
  );
}

export default SideBar;
