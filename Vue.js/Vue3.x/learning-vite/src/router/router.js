import { createRouter, createWebHistory } from "vue-router";
import utils from '@/libs/utils';
import store from '@/store'

// 路由信息
const routes = [
  {
    path: "/",
    name: "Home",
    redirect: '/workbench',
    meta: {
      title: 'dist',
    },
  },
  {
    path: "/ref",
    name: "ref",
    meta: {
      title: 'ref',
      anonymous: true
    },
    component: () => import('../views/ref.vue'),
  },
  {
    path: '/workbench',
    name: 'Workbench',
    meta: {
      title: '移动办公平台',
    },
    component: () => import('../views/layoutEmpty.vue'),
    children: [
      {
        path: "",
        name: "WorkbenchIndex",
        meta: {
          title: '移动办公平台',
        },
        component: () => import('../views/workbench/home.vue'),
      },
      {
        path: "achievement",
        name: "WorkbenchAchievement",
        meta: {
          title: '业绩总览',
        },
        component: () => import('../views/workbench/achievement.vue'),
      },
      {
        path: "achievementArea",
        name: "WorkbenchAchievementArea",
        meta: {
          title: '分区业绩',
        },
        component: () => import('../views/workbench/achievementArea.vue'),
      },
    ]
  },

  {

    path: '/complaint',
    name: 'Complaint',
    meta: {
      title: '移动办公平台',
    },
    component: () => import('../views/layoutEmpty.vue'),
    children: [
      {
        path: "",
        name: "ComplaintIndex",
        meta: {
          title: '移动办公平台',
        },
        redirect: '/complaint/list'
      },
      {
        path: "list",
        name: "ComplaintList",
        meta: {
          title: '移动办公平台',
        },
        component: () => import('../views/complaint/list.vue'),
      },
      {
        path: "detail",
        name: "ComplaintDetail",
        meta: {
          title: '移动办公平台',
        },
        component: () => import('../views/complaint/detail.vue'),
      },
      {
        path: "additional",
        name: "ComplaintAdditional",
        meta: {
          title: '移动办公平台',
        },
        component: () => import('../views/complaint/additional.vue'),
      },
      {
        path: "transfer",
        name: "ComplaintTransfer",
        meta: {
          title: '移动办公平台',
        },
        component: () => import('../views/complaint/transfer.vue'),
      },
    ]
  }

];
// 导出路由
const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  to.meta && to.meta.title && utils.setTitle(to.meta.title);
  if (to.meta && to.meta.anonymous) {
    return next()
  }
  const { info } = store.getters
  if (!info) {
    const query = {
      redirect_path: to.path
    }
    return next({ name: 'Login', query })
  }
  next()
});
export default router;


