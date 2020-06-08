import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router/index'

axios.interceptors.response.use(null, function(e) {
  if (!e.response) {
    alert('Please check your internet connection!')
    return Promise.reject(e);
  }

  if (e.response.status === 403) {
    alert('Forbidden Request!')
  }

  if (e.response.status === 404) {
    alert('User Not Found!')
  }

  return Promise.reject(e);
})

new Vue({
  router,
  el: '#app',
  render: h => h(App)
})
