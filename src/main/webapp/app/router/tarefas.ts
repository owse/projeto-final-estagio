import { Authority } from '@/shared/security/authority';

const Crud = () => import('@/tarefas/crud/crud.vue');
const BadRoute = () => import('@/badroute/badRoute.vue');
const Sidebar = () => import('@/tarefas/sidebar/sidebar.vue');

export default [
  {
    path: '/tarefas/crud',
    name: 'Crud',
    component: Crud,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/bad-route',
    name: 'BadRoute',
    component: BadRoute,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/tarefas/sidebar',
    name: 'Sidebar',
    component: Sidebar,
    meta: { authorities: [Authority.USER] },
  },
];
