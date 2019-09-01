import Vue from 'vue'

import { cookies, options } from 'brownies'

import store from './store'

import App from './App.vue'

Vue.config.productionTip = false

const { hash } = window.location

if (hash) {
  const token = hash.match(/access_token=(.*?)(?=&|$)/)
  const expires = hash.match(/expires_in=(.*?)(?=&|$)/)

  if (token.length > 0 && expires.length > 0) {
    cookies[options] = {
      expires: expires[1]
    }

    cookies.token = token[1]
  }

  window.history.replaceState({}, document.title, '/')
}

store.dispatch('setToken', { token: cookies.token })
store.commit(
  'setLinkType',
  cookies.linkType !== null ? cookies.linkType : 'http'
)

if (store.state.token) {
  store.dispatch('fetchData')
}

new Vue({
  store,
  render: function(h) {
    return h(App)
  }
}).$mount('#app')
