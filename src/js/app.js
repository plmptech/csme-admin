// Import Vue
import Vue from 'vue';

// Import Framework7
import Framework7, { Dom7 } from 'framework7/framework7.esm.bundle.js'

// Import Framework7-Vue Plugin
import Framework7Vue from 'framework7-vue/framework7-vue.esm.bundle.js';

// Import Framework7 Styles
import '../css/framework7-custom.less';

// Import Icons and App Custom Styles
import '../css/icons.css';
import '../css/app.less';


// Import App Component
import App from '../components/app.vue';
import router from './router'

// Init Framework7-Vue Plugin
Framework7.use(Framework7Vue);

window.evm = new Vue()

// To add router
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.isNeedLogin)) {
    var userKey = sessionStorage.getItem('loginpage')
    var isNotLogin = userKey == null || userKey.trim().length == 0
    if (isNotLogin) {
      sessionStorage.removeItem('loginpage')
      next({
        path: '/'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

// Init App
new Vue({
  router,
  el: '#app',
  render: (h) => h(App),

  // Register App Component
  components: {
    app: App
  },
});