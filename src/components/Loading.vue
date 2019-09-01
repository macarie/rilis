<template>
  <div class="loader">
    <h1></h1>
  </div>
</template>

<script>
export default {
  name: 'Loading'
}
</script>

<style lang="scss" scoped>
.loader {
  width: 150px;
  flex-grow: 1;
  align-self: center;
  display: flex;

  h1 {
    align-self: center;

    &:after {
      animation: loading 1.8s cubic-bezier(0.28, 0.84, 0.42, 1) infinite normal;
      content: 'Loading';
    }
  }
}

@keyframes loading {
  0% {
    content: 'Loading\00a0\00a0\00a0';
    color: inherit;
  }
  25% {
    content: 'Loading.\00a0\00a0';
    color: #369093;
  }
  50% {
    content: 'Loading..\00a0';
    color: inherit;
  }
  75% {
    content: 'Loading...';
    color: #369093;
  }
  100% {
    content: 'Loading\00a0\00a0\00a0';
    color: inherit;
  }
}
</style>
