<template>
  <h1>
    Holy guacamole, there are at least
    <mark>{{ humanizeNumber(numberOfReleases) }}</mark> releases!
  </h1>
</template>

<script>
export default {
  name: 'Guacamole',
  props: {
    numberOfReleases: {
      type: Number,
      default: () => 0,
    },
  },
  methods: {
    humanizeNumber(n = 0) {
      if (n < 100) return `${n}`

      let y = Math.round(n / 100)

      if (y < 10) return `${y} hundred`

      const words = ['thousand', 'million', 'billion', 'trillion']
      let i = 0

      do {
        i += 3
        y = Math.round(n / 10 ** i)
      } while (y >= 1000 && i <= 12)

      return `${y} ${words[i / 3 - 1]}`
    },
  },
}
</script>

<style lang="scss" scoped></style>
