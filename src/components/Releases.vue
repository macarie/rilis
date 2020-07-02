<template>
  <section class="releases">
    <header class="container">
      <div>
        <guacamole :numberOfReleases="releases.length"></guacamole>
      </div>
    </header>
    <transition-group
      :enter-active-class="`animated ${
        lastPage < page ? 'slideRightFadeIn' : 'slideLeftFadeIn'
      }`"
      :leave-active-class="`animated ${
        lastPage < page ? 'slideLeftFadeOut' : 'slideRightFadeOut'
      }`"
      tag="div"
      class="container"
    >
      <release
        v-for="[id, release] in slicedReleases"
        :key="id"
        :release="release"
        :id="id"
        :userOptions="userOptions"
      ></release>
    </transition-group>
    <div class="options">
      <div class="container">
        <open-in
          :linkType="userOptions.linkType"
          :linkTypes="[
            { type: 'uri', friendly: 'App' },
            { type: 'http', friendly: 'Website' },
          ]"
          v-on:changeType="$store.commit('setLinkType', $event)"
        ></open-in>
        <pages
          :options="{
            items: {
              total: releases.length,
              perPage: 40,
              page: page,
            },
          }"
          :lastPage="lastPage"
          v-on:changePage="changePage"
        ></pages>
      </div>
    </div>
  </section>
</template>

<script>
import Guacamole from './Releases/Guacamole.vue'
import OpenIn from './Releases/OpenIn.vue'
import Pages from './Releases/Pages.vue'
import Release from './Releases/Release.vue'

export default {
  name: 'Releases',
  components: {
    Guacamole,
    OpenIn,
    Pages,
    Release,
  },
  props: {
    releases: {
      type: Array,
      default: () => null,
    },
    userOptions: {
      type: Object,
      default: () => null,
    },
  },
  data: () => {
    return {
      page: 0,
      lastPage: 0,
    }
  },
  computed: {
    slicedReleases() {
      return this.releases.slice(40 * this.page, 40 * (this.page + 1))
    },
  },
  methods: {
    changePage(newPage) {
      this.lastPage = this.page
      this.page = newPage
    },
  },
}
</script>

<style lang="scss" scoped>
.options {
  margin-bottom: 3rem;
  position: sticky;
  bottom: 0;
  padding: 1rem 0;
  background-color: rgba(255, 255, 255, 0.98);
  z-index: 9;

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

section > .container {
  display: flex;
  flex-direction: row;
  align-content: flex-start;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 3rem;

  .animated {
    animation-duration: 0.5s;
  }

  .slideRightFadeIn {
    animation: 0.5s absolute, 0.5s 0.5s slideRightFadeIn;
  }

  .slideLeftFadeIn {
    animation: 0.5s absolute, 0.5s 0.5s slideLeftFadeIn;
  }

  @keyframes absolute {
    0%,
    100% {
      position: absolute;
      opacity: 0;
    }
  }
}

section > div.container {
  margin-bottom: 1rem;
}
</style>
