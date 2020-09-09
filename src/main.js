import Vue from 'vue'
import App from './App.vue'
import axios from './http'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import moment from "moment";

Vue.config.productionTip = false

Vue.use(ElementUI);

Vue.prototype.$axios = axios

Vue.filter("dateformat", function(dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return dataStr? moment(dataStr).format(pattern) : "";
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
