import { ReactElement, useCallback } from 'react';

import { Edge } from 'reactflow';
import { MdAddTask } from 'react-icons/md';
import { GoWorkflow } from 'react-icons/go';
import { LuUpload } from 'react-icons/lu';
import { IoEnterOutline, IoExitOutline } from 'react-icons/io5';

import { exportBpmn } from '../bpmn';
import type { Node, BPMNNodeTypes } from '../bpmn/nodes';
import IconButton from './IconButton';

export interface SideBarProps {
  edges: Edge[];
  nodes: Node[];
  onNodeAdd: (
    type: BPMNNodeTypes,
    label: string,
    data: Record<string, unknown>,
    width: number,
    height: number,
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

      let width = 32;
      let height = 32;
      let data = {};
      if (type === 'userTask') {
        width = 200;
        data = {
          name: prompt('Name') || 'Unknown Task',
          documentation: prompt('Documentation (optional)') || '',
        };
      } else if (type === 'subWorkflow') {
        width = 200;
        height = 50;
      } else {
        data = { label };
      }

      onNodeAdd(type, label, data, width, height);
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
        width: 50,
        marginRight: 16,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <IconButton
          onClick={() => addNode('startEvent')}
          title="Add Start Event"
          icon={<IoEnterOutline />}
        />
        <IconButton
          onClick={() => addNode('endEvent')}
          title="Add End Event"
          icon={<IoExitOutline />}
        />
        <IconButton
          onClick={() => addNode('userTask')}
          title="Add User Task"
          icon={<MdAddTask />}
        />
        <IconButton
          onClick={() => addNode('subWorkflow')}
          title="Add Sub-Workflow"
          icon={<GoWorkflow />}
        />
      </div>
      <hr />
      <IconButton
        title="Export to BPMN XML"
        icon={<LuUpload />}
        onClick={handleExport}
      />
    </div>
  );
}

export default SideBar;
