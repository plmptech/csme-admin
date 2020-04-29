import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', name: 'Login', component: () => import('@/pages/login.vue') },
    { path: '/adduser', name: 'Add User', component: () => import('@/pages/adduser.vue'), meta: { isNeedLogin: true } },
    { path: '/enquirysetting', name: 'Enquiry Setting', component: () => import('@/pages/enquirysetting.vue'), meta: { isNeedLogin: true } },
    { path: '/managecountry', name: 'Manage Country', component: () => import('@/pages/managecountry.vue'), meta: { isNeedLogin: true } },
    { path: '/manageindustry', name: 'Manage Industry', component: () => import('@/pages/manageindustry.vue'), meta: { isNeedLogin: true } },
    { path: '/managelisting', name: 'Manage Listing', component: () => import('@/pages/managelisting.vue'), meta: { isNeedLogin: true } },
    { path: '/manageuser', name: 'Manage User', component: () => import('@/pages/manageuser.vue'), meta: { isNeedLogin: true } },
    { path: '/pendingpremium', name: 'Pending Premium', component: () => import('@/pages/pendingpremium.vue'), meta: { isNeedLogin: true } },
    { path: '/userenquiry', name: 'User Enquiry', component: () => import('@/pages/userenquiry.vue'), meta: { isNeedLogin: true } },
    { path: '/404', name: '404', component: () => import('@/pages/404.vue') },
    { path: '*', redirect: '/404' }
  ]
})
