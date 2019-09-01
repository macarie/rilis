<template>
  <main id="app">
    <transition appear appear-active-class="animated slideTopFadeIn">
      <nav-bar
        :hasToken="hasToken"
        :user="user"
        :userOptions="userOptions"
        :isLoading="loading.user"
        class="container"
      ></nav-bar>
    </transition>
    <transition
      appear
      appear-active-class="animated slideTopFadeIn"
      enter-active-class="animated slideLeftFadeIn"
      leave-active-class="animated slideRightFadeOut"
      mode="out-in"
    >
      <welcome :env="env" v-if="hasToken === false" class="container"></welcome>
      <loading v-else-if="loading.releases"></loading>
      <releases
        v-else
        :releases="releases"
        :userOptions="userOptions"
      ></releases>
    </transition>
    <transition appear appear-active-class="animated slideTopFadeIn">
      <footers :socials="socials"></footers>
    </transition>
  </main>
</template>

<script>
import { mapState } from 'vuex'

import NavBar from './components/NavBar.vue'
import Welcome from './components/Welcome.vue'
import Loading from './components/Loading.vue'
import Releases from './components/Releases.vue'
import Footers from './components/Footers.vue'

export default {
  name: 'App',
  components: {
    NavBar,
    Welcome,
    Loading,
    Releases,
    Footers
  },
  data: () => {
    return {
      env: {
        clientID: process.env.VUE_APP_CLIENT_ID,
        redirectURI: process.env.VUE_APP_URL
      },
      socials: [
        { name: 'github', link: 'https://github.com/macarie', color: '#333' },
        { name: 'send', link: 'https://t.me/macarie', color: '#0088cc' },
        { name: 'at-sign', link: 'mailto:raul@macarie.me', color: '#ea4335' }
      ]
    }
  },
  computed: {
    ...mapState({
      loading: state => state.data.loading,
      hasToken: state => Boolean(state.token),
      user: state => state.data.user,
      releases: state => [...state.data.releases],
      userOptions: state => state.options.user
    })
  }
}
</script>

<style lang="scss">
@import 'main';
</style>

<style lang="scss" scoped>
main {
  min-height: 100vh;
  margin: 0 auto;
  padding: 1rem 0 0;
  display: flex;
  flex-direction: column;
}
</style>
