import { Authority } from '@/shared/security/authority';

const Crud = () => import('@/tarefas/crud/crud.vue');
// const Strategy = () => import('@/tarefas/strategy/strategy.vue');

export default [
  {
    path: '/tarefas/crud',
    name: 'Crud',
    component: Crud,
    meta: { authorities: [Authority.USER] },
  },
  // {
  //   path: '/tarefas/strategy',
  //   name: 'Strategy',
  //   component: Strategy,
  //   meta: { authorities: [Authority.USER] },
  // },
];
