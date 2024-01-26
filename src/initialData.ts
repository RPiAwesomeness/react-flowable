import type { Node } from './bpmn/nodes';
import type { Edge } from 'reactflow';

const initialNodes: Node[] = [
  {
    id: 'node-0',
    data: {},
    position: { x: 0, y: 0 },
    type: 'startEvent',
  },
  {
    id: 'node-1',
    data: { label: '', name: 'Test' },
    position: { x: 100, y: 25 },
    type: 'userTask',
  },
  {
    id: 'node-2',
    data: {},
    position: { x: 350, y: 55 },
    style: {
      height: 200,
      width: 400,
    },
    type: 'subWorkflow',
  },
  {
    id: 'node-2-a',
    data: {},
    position: { x: 0, y: 0 },
    type: 'startEvent',
    parentNode: 'node-2',
    extent: 'parent',
  },
  {
    id: 'node-2-b',
    data: { name: 'Internal Test', documentation: 'foo', fields: {
      test: 'spam'
    } },
    position: { x: 100, y: 0},
    type: 'userTask',
    parentNode: 'node-2',
    extent: 'parent',
  },
  {
    id: 'node-3',
    data: {},
    position: { x: 250, y: 250 },
    type: 'endEvent',
  },
];

const initialEdges: Edge[] = [
  { id: '0-1', source: 'node-0', target: 'node-1' },
  { id: '1-2', source: 'node-1', target: 'node-2' },
  { id: '2a-2b', source: 'node-2-a', target: 'node-2-b' },
];

export { initialEdges, initialNodes };
