import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { exact: false, path: '/', component: '@/layouts/index',
      routes: [
        { exact: true, path: '/', component: '@/pages/index' },
        { exact: true, path: '/welcome', component: '@/pages/welcome/index' },
      ],
    },
  ],
  fastRefresh: {},
  extraBabelIncludes: ['qimai_designpro', 'qimai-rc-business'],

});
