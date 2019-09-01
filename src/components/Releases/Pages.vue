<template>
  <ul class="pages" v-if="numberOfPages > 0">
    <li @click="setPage(page - 1)" class="chevron">
      <svg class="feather">
        <use xlink:href="/icons/feather-sprite.svg#chevron-left" />
      </svg>
    </li>
    <li
      v-for="page in pages"
      :key="page"
      :class="{
        page: true,
        'out-of-bounds': page === 0 || page > numberOfPages
      }"
      @click="setPage(page)"
    >
      {{ page }}
    </li>
    <li @click="setPage(page + 1)" class="chevron">
      <svg class="feather">
        <use xlink:href="/icons/feather-sprite.svg#chevron-right" />
      </svg>
    </li>
    <li class="goto-page">
      <input
        type="number"
        min="1"
        :max="numberOfPages"
        placeholder="Page"
        ref="goto"
        @keyup.enter="setPage(Number($event.target.value))"
      />
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Pages',
  props: {
    options: {
      type: Object,
      default: () => null
    },
    lastPage: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      page: this.options.items.page + 1
    }
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.options.items.total / this.options.items.perPage)
    },
    pages() {
      return Array(3)
        .fill()
        .map((item, index) => index + this.page - 1)
    }
  },
  methods: {
    setPage(clickedPage) {
      this.$refs.goto.value = null

      if (clickedPage > 0 && clickedPage <= this.numberOfPages) {
        this.page = clickedPage
        this.$emit('changePage', this.page - 1)

        return true
      }

      return false
    }
  }
}
</script>

<style lang="scss" scoped>
.pages {
  display: flex;
  list-style-type: none;
  user-select: none;
  align-items: stretch;
  padding: 0;

  li {
    cursor: pointer;
    padding: 0.8rem 1rem;
    border: 2px solid #040404;
    border-right: 0;
    border-left: 0;
    background-color: #040404;
    color: #ffffff;

    &:first-child {
      border-left: 2px solid #040404;
      border-radius: 100rem 0 0 100rem;
    }

    &:nth-child(3) {
      font-weight: 500;
      background-color: #ffffff;
      color: #040404;
    }

    &:last-child {
      border-right: 2px solid #040404;
      border-radius: 0 100rem 100rem 0;
    }

    &.chevron {
      padding: 0.8rem 0.5rem;
      font-size: 1px;
    }

    &.out-of-bounds {
      color: transparent;
      cursor: default;
    }

    &.goto-page {
      padding: 0;

      input {
        height: 100%;
        border-radius: 0 100rem 100rem 0;
        border: 0;
        background-color: #040404;
        color: #ffffff;
        width: 4rem;
        text-align: center;
        padding: 0 0.5rem 0 0;

        &::placeholder {
          color: #ffffff;
        }

        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        &[type='number'] {
          -moz-appearance: textfield;
        }
      }
    }
  }
}

.feather {
  width: 1.3125rem;
  height: 1.3125rem;
  stroke: currentColor;
  stroke-width: 1.5px;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
}
</style>
