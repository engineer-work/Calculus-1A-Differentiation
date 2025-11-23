import { TopicNode } from './types';
import { UNIT_0_CHILDREN } from './data/unit0';
import { UNIT_0_LIMITS_CHILDREN } from './data/unit0_limits';

export const CALCULUS_CURRICULUM: TopicNode[] = [
  {
    id: 'unit-0',
    title: 'Overview and Logistics',
    type: 'category',
    children: UNIT_0_CHILDREN
  },
  {
    id: 'unit-0-limits',
    title: 'Unit 0: Limits',
    type: 'category',
    children: UNIT_0_LIMITS_CHILDREN
  },
  // {
  //   id: 'unit-1',
  //   title: 'Unit 1: Differentiation',
  //   type: 'category',
  //   children: [
  //      { id: '1.1', title: 'Part A: Definition and Basic Rules', type: 'topic' },
  //      { id: '1.2', title: 'Part B: Implicit Differentiation and Inverse Functions', type: 'topic' }
  //   ]
  // }
];