// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    // {
    //   path:'/admin',
    //   component:'@/pages/ProfileAdvanced'
    // },

    {
      path: '/admin',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/admin',
          component: '../layouts/BasicLayout',
          routes: [
            {
              path: '/admin',
              redirect: '/admin/org',
            },
            {
              path: '/admin/org',
              name: 'admin.org.realname.list',
              icon: 'smile',
              component: './Admin/Admin_realname_List',
            },
            {
              path: '/admin/activity',
              name: 'admin.org.activity.list',
              icon: 'smile',
              component: './Admin/Admin_activity_List',
            },

            {
              component: './404',
            },
          ],
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          routes: [
            {
              path: '/',
              redirect: '/welcome',
            },
            {
              path: '/message',
              name: 'message-list',
              icon: 'smile',
              component: './Message',
              routes: [
                {
                  path: '/message',
                  redirect: './message/subject',
                },
                {
                  name: 'subject',
                  icon: 'smile',
                  path: '/message/subject',
                  component: './Message/subject',
                },
                {
                  name: 'travel',
                  icon: 'smile',
                  path: '/message/travel',
                  component: './Message/travel',
                },
                {
                  name: 'news',
                  icon: 'smile',
                  path: '/message/news',
                  component: './Message/news',
                },
              ],
            },
            {
              path: '/itemlist',
              component: './Message/subject/components/GetItemActivity',
            },
            {
              path: '/add_item',
              component: './Message/subject/components/AddActivity'
            },
            {
              path: '/update_item',
              component: './Message/subject/components/UpdateActivity'
            },
            {
              path: '/welcome',
              name: 'home',
              icon: 'smile',
              component: './Welcome',
            },
            {
              name: 'change.message',
              icon: 'smile',
              path: '/changemessage',
              component: './ChangeMessage',
            },
            // {
            //   name: 'subject',
            //   icon: 'smile',
            //   path: '/subject',
            //   component: './Subject',
            // },
            // {
            //   name: 'travel',
            //   icon: 'smile',
            //   path: '/travel',
            //   component: './Travel',
            // },
            {
              name: 'announcement',
              icon: 'smile',
              path: '/announcement',
              component: './PublishAnnouncement',
            },
            {
              path: '/realname',
              name: 'realname',
              icon: 'smile',
              routes: [
                {
                  name: 'orgrealname',
                  icon: 'smile',
                  path: '/realname/orgrealname',
                  component: './RealName/OrgRealName',
                },
                {
                  name: 'userlist',
                  icon: 'smile',
                  path: '/realname/userlist',
                  component: './RealName/UserList',
                },
              ]
            },

            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
