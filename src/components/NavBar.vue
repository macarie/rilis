<template>
  <nav>
    <div>
      <a href="/" class="logo">rilis.</a>
    </div>
    <div class="user">
      <transition enter-active-class="animated slideTopFadeIn" mode="out-in">
        <a
          :href="user.link[userOptions.linkType]"
          v-if="hasToken && isLoading === false"
          target="_blank"
        >
          {{ user.name || user.id }}
          <img :src="user.image" />
        </a>
        <div style="width: 2.625rem; height: 2.625rem" v-else></div>
      </transition>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  props: {
    hasToken: {
      type: Boolean,
      default: () => null
    },
    user: {
      type: Object,
      default: () => null
    },
    userOptions: {
      type: Object,
      default: () => null
    },
    isLoading: {
      type: Boolean,
      default: () => null
    }
  }
}
</script>

<style lang="scss" scoped>
nav {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4rem;

  .logo {
    font-size: 1.5rem;
  }

  .user {
    a {
      display: flex;
      align-items: center;
      font-size: 1.25rem;
    }

    img {
      width: 2.625rem;
      border-radius: 0.5rem;
      margin-left: 1rem;
    }
  }
}
</style>
