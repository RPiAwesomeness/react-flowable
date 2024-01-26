import { Node as RFNode } from "reactflow";

import StartEvent from "./StartEvent";
import UserTask from './UserTask';
import SubWorkflow from "./SubWorkflow";

const bpmnNodeTypes = {
  startEvent: StartEvent,
  userTask: UserTask,
  subWorkflow: SubWorkflow,
} as const;

// Weird string typing allows the types to work as ReactFlow expects while also
// giving strong typing for the defined nodeTypes
type BPMNNodeTypes = keyof typeof bpmnNodeTypes;
type Node = RFNode<
  any,
  BPMNNodeTypes | ((string & NonNullable<unknown>) | undefined)
>;

export { bpmnNodeTypes };
export type { BPMNNodeTypes, Node };
