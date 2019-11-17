import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const Main = () => import('@/pages/Main');
const Pos = () => import('@/pages/Pos');

const routes = [
  {
    path: '/',
    component: Main,
    children: [
      {
        name: 'pos',
        path: 'pos/:roomId?',
        component: Pos,
        props: true,
      },
    ],
  },
  {
    path: '*',
    redirect: { name: 'pos' },
  },
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
});

export default router;
