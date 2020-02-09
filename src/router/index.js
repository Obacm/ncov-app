import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let routes = [
  {
    path: '/',
    name: 'home',
    component: require('@/views/Home').default,
    meta: {
      title: 'nCoV_各个省的发热门诊和定点医院',
    }
  },
  {
    path: '/hospitals',
    name: 'hospitals',
    component: require('@/views/HospitalList').default,
    meta: {
      title: 'nCoV_医院',
    }
  },
  {
    path: '/hospital',
    name: 'hospital',
    component: require('@/views/Hospital').default,
    meta: {
      title: 'nCoV_医院详情',
    }
  },
  {
    path: '*',
    redirect: '/'
  },
];

let router = new Router({
  routes: routes,
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
})

export default router
