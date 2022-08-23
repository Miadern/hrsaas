import Layout from '@/layout'
export default {
  path: '/employees',
  component: Layout,
  meta: {
    id: 'employees',
  },
  children: [
    {
      path: '',
      component: () => import('@/views/employees'),
      meta: { title: '员工', icon: 'people' },
    },
    {
      path: '/employees/detail/:id',
      component: () => import('@/views/employees/detail.vue'),
      hidden: true,
    },
    {
      path: '/employees/print/:id',
      component: () => import('@/views/employees/print.vue'),
      hidden: true,
    },
  ],
}