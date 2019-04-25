import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'  // 路由重定向 默认显示的页 登录页
    },
    {
      path: '/login',
      component: resolve => require(['../components/login.vue'], resolve),
    },
    {
      path: '/home',
      meta: {
        title: '首页'
      },
      component: resolve => require(['../components/home.vue'], resolve),
      children: [
        {
          path: '/',
          meta: {
            title: ''
          },
          component: resolve => require(['../components/index.vue'], resolve),
        },
        {
          path: '/index',
          meta: {
            title: '首页'
          },
          component: resolve => require(['../components/index.vue'], resolve),
        },
        {
          path: '/baseSetup',  // 导航基础设置页
          meta: {
            title: '系统设置'
          },
          component: resolve => require(['../views/website/baseSetup.vue'], resolve),
        },{
          path: '/functionSetup',
          meta: {
            title: '功能设置'
          },
          component: resolve => require(['../views/website/functionSetup.vue'], resolve),
        },{
          path: '/memberList',
          meta: {
            title: '会员列表',
          },
          component: resolve => require(['../views/member/memberList.vue'], resolve),
        },{
          path: '/memberLevel',
          meta: {
            title: '会员级别',
          },
          component: resolve => require(['../views/member/memberLevel.vue'], resolve),
        },{
          path: '/addMember',
          meta: {
            title: '添加会员',
          },
          component: resolve => require(['../views/member/addMember.vue'], resolve),
        },{
          path: '/editMember',
          meta: {
            title: '修改会员',
          },
          component: resolve => require(['../views/member/addMember.vue'], resolve),
        },{
          path: '/goodsManage',
          meta: {
            title: '商品管理',
          },
          component: resolve => require(['../views/goods/goodsHome.vue'], resolve),
          children: [
            {
              path: '/',
              meta: {
                title: ''
              },
              component: resolve => require(['../views/goods/goodsManage.vue'], resolve),
            },
            {
              path: '/addGoods',
              meta: {
                title: '添加商品'
              },
              component: resolve => require(['../views/goods/addGoods.vue'], resolve),
            },{
              path: '/editGoods',
              meta: {
                title: '修改商品'
              },
              component: resolve => require(['../views/goods/addGoods.vue'], resolve),
            }
          ]
        },{
          path: '/integralCash',
          meta: {
            title: '积分提现',
          },
          component: resolve => require(['../views/integral/integralCash.vue'], resolve),
        },{
          path: '/integralDetails',
          meta: {
            title: '积分明细',
          },
          component: resolve => require(['../views/integral/integralDetails.vue'], resolve),
        },{
          path: '/manager',
          meta: {
            title: '管理员',
          },
          component: resolve => require(['../views/securityData/manager.vue'], resolve),
          children: [
            {
              path: '/',
              meta: {
                title: '',
              },
              component: resolve => require(['../views/securityData/managerList.vue'], resolve),
            },{
              path: '/addManager',
              meta: {
                title: '添加管理员',
              },
              component: resolve => require(['../views/securityData/addManager.vue'], resolve),
            },{
              path: '/editManager',
              meta: {
                title: '修改管理员',
              },
              component: resolve => require(['../views/securityData/addManager.vue'], resolve),
            }
          ]
        },{
          path: '/managerorgan',
          meta: {
            title: '会员组织',
          },
          component: resolve => require(['../views/securityData/memberOrgan.vue'], resolve),
        }, {
          path: '/clearCache',
          meta: {
            title: '清除缓存',
          },
          component: resolve => require(['../views/securityData/clearCache.vue'], resolve),
        }
      ]
    }
  ]
})
