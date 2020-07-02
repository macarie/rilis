<template>
  <footer>
    <div class="container">
      <ul class="socials">
        <li v-for="{ name, link, color } in socials" :key="name">
          <a
            :href="link"
            :style="`--social-color: ${color}`"
            class="social animated"
            target="_blank"
          >
            <svg class="feather">
              <use :xlink:href="`/icons/feather-sprite.svg#${name}`" />
            </svg>
          </a>
        </li>
      </ul>
      <p>
        <a href="/">rilis.</a> by
        <a href="https://macarie.me" target="_blank">Raul Macarie</a>.
      </p>
    </div>
    <div class="subfooter">
      <div class="container">
        <p>
          Psst, did you know that you can contribute to make this project even
          better? It's open source on
          <a href="https://github.com/macarie/rilis" target="_blank">GitHub</a>.
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  props: {
    socials: {
      type: Array,
      default: null,
    },
  },
}
</script>

<style lang="scss" scoped>
footer {
  background-color: #fafafa;
  padding: 4rem 0 0;

  a {
    font-weight: 400;
  }

  .container {
    text-align: center;

    > * {
      margin-bottom: 2rem;

      &:last-child {
        margin-bottom: 4rem;
      }
    }

    .socials {
      display: flex;
      list-style-type: none;
      align-items: stretch;
      justify-content: center;
      padding: 0;

      li {
        margin-right: 0.625rem;

        &:last-child {
          margin-right: 0;
        }

        &:hover {
          z-index: 1;
        }

        .social {
          display: inline-flex;
          background-color: #ffffff;
          padding: 0.5rem;
          font-size: 1px;
          border-radius: 0.5rem;
          filter: saturate(0.7);
          color: var(--social-color);

          &:hover {
            animation-name: jelly;
          }

          .feather {
            width: 1.5rem;
            height: 1.5rem;
            stroke: currentColor;
            stroke-width: 1.5px;
            stroke-linecap: round;
            stroke-linejoin: round;
            fill: none;
          }
        }
      }
    }
  }

  .subfooter {
    padding: 2rem 0;
    background-color: #f2f2f2;

    .container > * {
      margin-bottom: 0;
    }
  }
}
</style>
