import { Edge } from 'reactflow';
import type { BPMNNodeTypes, Node } from './nodes';

const BPMN_NS = 'http://www.omg.org/spec/BPMN/20100524/MODEL';
const FLOWABLE_NS = 'http://flowable.org/bpmn';
const FLOWABLE_TEMPLATE = `<definitions xmlns="${BPMN_NS}" xmlns:flowable="${FLOWABLE_NS}" targetNamespace="Examples" />`;

const nodeConverters: { [T in BPMNNodeTypes]?: ((node: Node, elem: Element) => void) } = {
  userTask: ({ data }, elem) => {
    elem.setAttribute('name', data.name ?? 'Unnamed Task');
  },
  subWorkflow: ({ data }, elem) => {
    elem.setAttribute('name', data.name ?? 'Unnamed Subworkflow');
  },
};

function convertNodeToElement(doc: Document, node: Node): Element {
  const { type, id } = node;
  const elem = doc.createElementNS(BPMN_NS, type || 'default');
  elem.setAttribute('id', id);

  // Do node-specific conversion, if it's defined
  if (type && type in nodeConverters) nodeConverters[type as BPMNNodeTypes]?.(node, elem);

  return elem;
}

function convertEdgeToSequenceFlow(doc: Document, { id, source, target }: Edge): Element {
  const elem = doc.createElementNS(BPMN_NS, 'sequenceFlow');
  elem.setAttribute('id', id);
  elem.setAttribute('sourceRef', source);
  elem.setAttribute('targetRef', target);

  return elem;
}

function exportBpmn(id: string, name: string, nodes: Node[], edges: Edge[]): XMLDocument {
  const parser = new DOMParser();
  const doc = parser.parseFromString(FLOWABLE_TEMPLATE, 'text/xml');

  const root =
    doc.getElementsByTagName('definitions').item(0) ??
    doc.createElementNS(BPMN_NS, 'definitions');

  const processElem = doc.createElementNS(BPMN_NS, 'process');
  processElem.setAttribute('id', id);
  processElem.setAttribute('name', name);

  nodes.forEach((node) => processElem.appendChild(convertNodeToElement(doc, node)));
  edges.forEach((edge) => processElem.append(convertEdgeToSequenceFlow(doc, edge)));

  root.appendChild(processElem);

  return doc;
}

export { exportBpmn };
