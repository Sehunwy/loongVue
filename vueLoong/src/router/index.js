import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/views/main/main'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/topNav',
      component: layout,
      children: [
        {
          path: '/topNav/alarm1',
          meta: {title: 'message.test'},
          name: 'alarm1',
          component: () => import('@/views/topNav/alarm-management'),
        }
      ]
    },

    // 测试组件
    {
      path: '/test',
      name: 'test',
      meta: {title: 'message.test', iconClose: 'icon-yunguanlishouqi', iconOpen: 'icon-yunguanlizhankai', isMenus: true},
      component: layout,
      redirect: '/test/page',
      children: [        //子路由,嵌套路由
        {
          path: '/test/tab',
          name: 'tab',
          meta: {title: 'message.tab', iconClose: 'icon-fuwuguanli', iconOpen: 'icon-fuwuguanli', isMenus: true},
          component: () => import('@/views/test/tabTest'),
        },
        {
          path: '/test/page',
          name: 'page',
          meta: {title: 'message.page', iconClose: 'icon-fuwuguanli', iconOpen: 'icon-fuwuguanli', isMenus: true},
          component: () => import('@/views/test/page'),
        },
        {
          path: '/test/table',
          name: 'table',
          meta: {title: 'message.table', iconClose: 'icon-bumenguanli', iconOpen: 'icon-bumenguanli', isMenus: true},
          component: () => import('@/views/test/tableTest'),
        },
        {
          path: '/test/date',
          name: 'date',
          meta: {title: 'message.date', iconClose: 'icon-bumenguanli', iconOpen: 'icon-bumenguanli', isMenus: true},
          component: () => import('@/views/test/dateTest'),
        },
        {
          path: '/test/dialog',
          name: 'dialog',
          meta: {title: 'message.dialog', iconClose: 'icon-bumenguanli', iconOpen: 'icon-bumenguanli', isMenus: true},
          component: () => import('@/views/test/dialogTest'),
        },
        {
          path: '/test/tip',
          name: 'tip',
          meta: {title: 'message.tip', iconClose: 'icon-bumenguanli', iconOpen: 'icon-bumenguanli', isMenus: true},
          component: () => import('@/views/test/tipTest'),
        },
        {
          path: '/test/balloon',
          name: 'balloon',
          meta: {title: 'message.balloon', iconClose: 'icon-bumenguanli', iconOpen: 'icon-bumenguanli', isMenus: true},
          component: () => import('@/views/test/balloon'),
        },
        {
          path: '/test/tableTree',
          name: 'tableTree',
          meta: {title: 'message.tableTree', iconClose: 'icon-bumenguanli', iconOpen: 'icon-bumenguanli', isMenus: true},
          component: () => import('@/views/test/tableTree'),
        },
        {
          path: '/test/select',
          name: 'select',
          meta: {title: 'message.select', iconClose: 'icon-bumenguanli', iconOpen: 'icon-bumenguanli', isMenus: true},
          component: () => import('@/views/test/selectTest'),
        },
        {
          path: '/test/selectTree',
          name: 'selectTree',
          meta: {title: 'message.selectTree', iconClose: 'icon-bumenguanli', iconOpen: 'icon-bumenguanli', isMenus: true},
          component: () => import('@/views/test/selectTree'),
        },
        {
          path: '/test/switch',
          name: 'switch',
          meta: {title: 'message.switch', iconClose: 'icon-bumenguanli', iconOpen: 'icon-bumenguanli', isMenus: true},
          component: () => import('@/views/test/switchTest'),
        },
        {
          path: '/test/cardTable',
          name: 'cardTable',
          meta: {title: 'message.cardTable', iconClose: 'icon-bumenguanli', iconOpen: 'icon-bumenguanli', isMenus: true},
          component: () => import('@/views/test/cardTable'),
        },
        {
          path: '/test/progress',
          name: 'progress',
          meta: {title: 'message.progress', iconClose: 'icon-bumenguanli', iconOpen: 'icon-bumenguanli', isMenus: true},
          component: () => import('@/views/test/progressTest'),
        }
      ]
    },

    // 登录
    // {
    //   path: '/',
    //   name: 'login',
    //   meta: {title: 'LoongUI'},
    //   component: () => import('@/views/login'),
    // },

    // 菜单路由
    {
      path: '/',
      // name: 'homePage-layout',
      meta: {title: 'message.service-profile', iconClose: 'icon-zhuye1', iconOpen: 'icon-zhuye1', isMenus: true},
      component: layout,
      children: [
        {
          path: '/',
          name: 'homePage',
          component: () => import('@/views/homePage'),
        }
      ]
    },
    {
      path: '/cloudStorage',
      name: 'cloudStorage',
      meta: {title: 'message.cloud-storage', iconClose: 'icon-cunchufuwushouqi', iconOpen: 'icon-cunchufuwuzhankai', isMenus: true},
      redirect: '/cloudStorage/service',
      component: layout,
      children: [
        {
          path: '/cloudStorage/service',
          name: 'service',
          meta: {title: 'message.service-management', iconClose: 'icon-fuwuqijiqun', iconOpen: 'icon-fuwuqijiqun', isMenus: true},
          component: () => import('@/views/storeUI/service/service'),
        },
        {
          path: '/cloudStorage/application',
          name: 'application',
          meta: {title: 'message.application-management', iconClose: 'icon-yingyongfuwuqi', iconOpen: 'icon-yingyongfuwuqi', isMenus: true},
          component: () => import('@/views/storeUI/application/application'),
        },
        {
          path: '/cloudStorage/group',
          name: 'group',
          meta: {title: 'message.device-group-management', iconClose: 'icon-shebeifenzu', iconOpen: 'icon-shebeifenzu', isMenus: true},
          component: () => import('@/views/storeUI/group/group'),
        },
        {
          path: '/cloudStorage/block-device',
          name: 'block-device',
          meta: {title: 'message.block-device-management', iconClose: 'icon-kuaishebeiguanli', iconOpen: 'icon-kuaishebeiguanli', isMenus: true},
          component: () => import('@/views/storeUI/block-device/block-device'),
        },
        {
          path: '/cloudStorage/file',
          name: 'file',
          meta: {title: 'message.file-management', iconClose: 'icon-wenjianmulu', iconOpen: 'icon-wenjianmulu', isMenus: true},
          component: () => import('@/views/storeUI/file/file'),
        },
        {
          path: '/cloudStorage/access',
          name: 'access',
          meta: {title: 'message.rights-management', iconClose: 'icon-quanxianshezhi', iconOpen: 'icon-quanxianshezhi', isMenus: true},
          component: () => import('@/views/storeUI/access/access'),
        },
        {
          path: '/cloudStorage/quota',
          name: 'quota',
          meta: {title: 'message.quota-management', iconClose: 'icon-peie', iconOpen: 'icon-peie', isMenus: true},
          component: () => import('@/views/storeUI/quota/quota'),
        },
        {
          path: '/cloudStorage/nas',
          name: 'NAS',
          meta: {title: 'message.NAS-management', iconClose: 'icon-nasguanli', iconOpen: 'icon-nasguanli', isMenus: true},
          component: () => import('@/views/storeUI/nas/nas'),
        },
        {
          path: '/cloudStorage/senior',
          name: 'senior',
          meta: {title: 'message.senior-management', iconClose: 'icon-gaojishezhi', iconOpen: 'icon-gaojishezhi', isMenus: true},
          component: () => import('@/views/storeUI/senior/senior'),
        }
      ]
    },
    {
      path: '/virtualCloud',
      name: 'virtualCloud',
      meta: {title: 'message.virtual-cloud', iconClose: 'icon-yunguanlishouqi', iconOpen: 'icon-yunguanlizhankai', isMenus: true},
      component: layout,
      redirect: '/virtualCloud/node',
      children: [        //子路由,嵌套路由
        {
          path: '/virtualCloud/node',
          name: 'node',
          meta: {title: 'message.node-management', iconClose: 'icon-jiedianguanli', iconOpen: 'icon-jiedianguanli', isMenus: true},
          component: () => import('@/views/cloudUI/node/node'),
        },
        {
          path: '/virtualCloud/network',
          name: 'network',
          meta: {title: 'message.network-management', iconClose: 'icon-wangluoguanli1', iconOpen: 'icon-wangluoguanli1', isMenus: true},
          component: () => import('@/views/cloudUI/network/network'),
        },
        {
          path: '/virtualCloud/imageLibraries',
          name: 'imageLibraries',
          meta: {title: 'message.image-libraries', iconClose: 'icon-jingxiangku', iconOpen: 'icon-jingxiangku', isMenus: true},
          component: () => import('@/views/cloudUI/imageLibraries/imageLibraries'),
        },
        {
          path: '/virtualCloud/file',
          name: 'file-library',
          meta: {title: 'message.document-library', iconClose: 'icon-wenjianguanli', iconOpen: 'icon-wenjianguanli', isMenus: true},
          component: () => import('@/views/cloudUI/file/file'),
        },
        {
          path: '/virtualCloud/tenant',
          name: 'tenant',
          meta: {title: 'message.tenant-management', iconClose: 'icon-zuhuguanli', iconOpen: 'icon-zuhuguanli', isMenus: true},
          component: () => import('@/views/cloudUI/tenant/tenant'),
        }
      ]
    },
    {
      path: '/cloudDisk',
      name: 'cloudDisk',
      meta: {title: 'message.cloud-disk', iconClose: 'icon-yunguanlishouqi', iconOpen: 'icon-yunguanlizhankai', isMenus: true},
      component: layout,
      redirect: '/cloudDisk/service',
      children: [        //子路由,嵌套路由
        {
          path: '/cloudDisk/service',
          name: 'serviceManagement',
          meta: {title: 'message.service-management', iconClose: 'icon-fuwuguanli', iconOpen: 'icon-fuwuguanli', isMenus: true},
          component: () => import('@/views/diskUI/service/service'),
        },
        {
          path: '/cloudDisk/department',
          name: 'department',
          meta: {title: 'message.department-management', iconClose: 'icon-bumenguanli', iconOpen: 'icon-bumenguanli', isMenus: true},
          component: () => import('@/views/diskUI/department/department'),
        },
        {
          path: '/cloudDisk/member',
          name: 'member',
          meta: {title: 'message.members-management', iconClose: 'icon-chengyuanguanli', iconOpen: 'icon-chengyuanguanli', isMenus: true},
          component: () => import('@/views/diskUI/member/member'),
        },
        {
          path: '/cloudDisk/group',
          name: 'group-management',
          meta: {title: 'message.group-management', iconClose: 'icon-qunzuguanli', iconOpen: 'icon-qunzuguanli', isMenus: true},
          component: () => import('@/views/diskUI/group/group'),
        },
        {
          path: '/cloudDisk/domainControl',
          name: 'domainControl',
          meta: {title: 'message.domain-control-management', iconClose: 'icon-yukongguanli', iconOpen: 'icon-yukongguanli', isMenus: true},
          component: () => import('@/views/diskUI/domainControl/domainControl'),
        },
        {
          path: '/cloudDisk/senior',
          name: 'senior-management',
          meta: {title: 'message.senior-management', iconClose: 'icon-gaojishezhi', iconOpen: 'icon-gaojishezhi', isMenus: true},
          component: () => import('@/views/diskUI/senior/senior'),
        }
      ]
    },
    {
      path: '/user',
      name: 'user-layout',
      meta: {title: 'message.user-management', iconClose: 'icon-yonghuguanli', iconOpen: 'icon-yonghuguanli', isMenus: true},
      component: layout,
      children: [
        {
          path: '/user',
          name: 'user',
          component: () => import('@/views/user'),
        }
      ]
    },
    {
      path: '/set',
      name: 'layout',
      meta: {title: 'message.set', iconClose: 'icon-shezhi', iconOpen: 'icon-shezhi', isMenus: true},
      component: layout,
      children: [
        {
          path: '/set',
          name: 'set',
          component: () => import('@/views/set'),
        }
      ]
    },
    //会匹配所有路径  捕获所有路由或 404 Not found 路由
    {
      path: '*',
      redirect: '/'
    }
  ]
})
