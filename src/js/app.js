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

// window.$$ = Dom7
// window.proto = 'http'
// let port = 3000
// window.apiUrl = `${proto}//:localhost:${port}/api/v1/`
// window.token = localStorage.token || ''

// Init Framework7-Vue Plugin
Framework7.use(Framework7Vue);

window.evm = new Vue()

// Init App
new Vue({
  el: '#app',
  render: (h) => h(App),

  // Register App Component
  components: {
    app: App
  },
});