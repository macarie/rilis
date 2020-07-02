<template>
  <header>
    <div class="welcome">
      <h1>What's the craic?</h1>
      <p>
        To see the latest releases from your 🖤 artists you need to sign in with
        <a href="https://spotify.com" target="_blank">Spotify</a>.
      </p>
      <a
        :href="`https://accounts.spotify.com/authorize?client_id=${env.clientID}&response_type=token&redirect_uri=${env.redirectURI}&scope=user-follow-read&show_dialog=false`"
        class="sign-in"
      >
        Sign in with
        <strong>Spotify</strong>
      </a>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Hero',
  props: {
    env: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
}
</script>

<style lang="scss" scoped>
header {
  display: flex;
  margin-bottom: 3rem;
  flex-grow: 1;
  min-height: calc(175px + 10rem);

  div {
    align-self: center;
    margin-top: -5rem;

    h1 {
      margin-left: 5rem;
    }

    p {
      font-size: 1.125rem;
      margin-left: 7rem;
      margin-bottom: 3rem;
    }

    .sign-in {
      display: inline-block;
      color: #fff;
      background-color: #040404;
      border-radius: 100rem;
      padding: 0.5rem 1rem;
      border: 2px solid #040404;
      margin-left: 7rem;
      transition-duration: 0.25s;
      transition-property: background-color, color;
      transition-timing-function: cubic-bezier(0.55, 0.06, 0.68, 0.19);

      &:hover {
        color: #040404;
        background-color: #fff;
      }
    }
  }
}
</style>
