<template>
  <ul class="open-in" ref="root">
    <li
      v-for="{ type, friendly } in linkTypes"
      :key="type"
      :class="`on-${type}`"
      @click="use(type)"
    >
      {{ friendly }}
    </li>
    <li class="gooey"></li>
  </ul>
</template>

<script>
export default {
  name: 'OpenIn',
  props: {
    linkType: {
      type: String,
      default: null
    },
    linkTypes: {
      type: Array,
      default: null
    }
  },
  methods: {
    use(type) {
      if (type !== this.linkType) {
        this.$emit('changeType', type)
        this.setActive(type)
      }
    },
    setActive(type) {
      const { offsetLeft, offsetWidth } = this.$refs.root.querySelector(
        `.on-${type}`
      )

      this.$refs.root.setAttribute(
        'style',
        `--active-offset: ${offsetLeft}px; --active-width: ${offsetWidth - 4}px`
      )
    }
  },
  mounted() {
    this.setActive(this.linkType)
  }
}
</script>

<style lang="scss" scoped>
.open-in {
  display: flex;
  list-style-type: none;
  user-select: none;
  align-items: stretch;
  padding: 0;
  background-color: #040404;
  border-radius: 100rem;
  position: relative;

  li {
    cursor: pointer;
    padding: 0.8rem 1rem;
    border: 2px solid transparent;
    border-right: 0;
    border-left: 0;
    color: #ffffff;
    border-radius: 100rem;
    mix-blend-mode: difference;

    &.gooey {
      padding: 0;
      background-color: #ffffff;
      display: block;
      position: absolute;
      left: 2px;
      top: 2px;
      height: calc(100% - 4px);
      width: var(--active-width);
      transition-duration: 0.25s;
      transition-property: transform, width;
      transition-timing-function: cubic-bezier(0.55, 0.06, 0.68, 0.19);
      transform-origin: left center;
      transform: translateX(var(--active-offset));
      border-radius: 100rem;
    }
  }
}
</style>
