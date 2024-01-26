import { ReactElement, useCallback } from 'react';

import { BsDiamond } from 'react-icons/bs';
import { GoWorkflow } from 'react-icons/go';
import { IoEnterOutline, IoExitOutline } from 'react-icons/io5';
import { LuUpload } from 'react-icons/lu';
import { MdAddTask, MdClose } from 'react-icons/md';
import { Edge } from 'reactflow';

import { exportBpmn } from '../bpmn';
import type { BPMNNodeTypes, Node } from '../bpmn/nodes';
import IconButton from './IconButton';
import styled from 'styled-components';

const StackedIcon = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  svg {
    grid-area: 1 / 1;
  }
  svg:first-of-type {
    padding: 15%;
    width: 70%;
  }
`;

export const ExclusiveGatewayIcon = () => (
  <StackedIcon>
    <MdClose />
    <BsDiamond />
  </StackedIcon>
);

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
      const label = 'test-node';

      let width = 32;
      let height = 32;
      let data = {};
      if (type === 'userTask') {
        width = 200;
        height = 60;
        data = {
          name: 'Unknown Task',
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
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 50,
        marginRight: 16,
      }}
    >
      <div
        style={{
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
          onClick={() => addNode('exclusiveGateway')}
          title="Add Exclusive Gateway"
          icon={<ExclusiveGatewayIcon />}
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
