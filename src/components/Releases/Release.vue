<template>
  <div class="release">
    <a
      :href="release.link[userOptions.linkType]"
      class="cover"
      :style="`--background-image: url(${release.cover})`"
      target="_blank"
    >
      <img :src="release.cover" :alt="`Cover image for ${release.name}`" />
    </a>
    <div class="info">
      <h1>
        <a
          :href="release.link[userOptions.linkType]"
          :title="`${release.name}`"
          target="_blank"
        >
          {{ release.name }}
        </a>
      </h1>
      <h2>
        <span v-for="artist in release.artists" :key="artist.id">
          <a
            :href="artist.link[userOptions.linkType]"
            :title="artist.name"
            target="_blank"
            >{{ artist.name }}</a
          >
        </span>
      </h2>
      <div class="tags">
        <div class="tag" :title="`Release date: ${release.date}`">
          <svg class="feather">
            <use xlink:href="/icons/feather-sprite.svg#clock" />
          </svg>
          {{ moment(release.date).fromNow() }}
        </div>
        <div class="tag">
          <svg class="feather">
            <use xlink:href="/icons/feather-sprite.svg#disc" />
          </svg>
          {{ release.type }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'Release',
  props: {
    release: {
      type: Object,
      default: () => null
    },
    id: {
      type: String,
      default: () => null
    },
    userOptions: {
      type: Object,
      default: () => null
    }
  },
  methods: {
    moment
  }
}
</script>

<style lang="scss" scoped>
.release {
  display: flex;
  margin-bottom: 2rem;
  width: calc(50% - 1.25rem);

  @media screen and (max-width: 1024px) {
    width: 100%;
  }

  .cover {
    width: 8.75rem;
    height: 8.75rem;
    font-size: 0;
    margin-right: 1.625rem;
    flex-shrink: 0;
    box-shadow: 0 1px rgba(255, 255, 255, 0.65);
    filter: saturate(0.7);

    @media (min-width: 320px) and (max-width: 480px) {
      width: 7.5rem;
      height: 7.5rem;
    }

    &,
    img {
      border-radius: 0.5rem;
    }

    &:after {
      content: '\00a0';
      display: block;
      background-image: var(--background-image);
      background-size: contain;
      width: 100%;
      height: 100%;
      position: relative;
      margin-top: -90%;
      z-index: -1;
      transform: scale(0.8);
      filter: blur(0.5rem) opacity(0.8);
    }
  }

  .info {
    display: flex;
    flex-direction: column;
    min-width: 0%;

    h1 {
      font-size: 1.5rem;
      margin-bottom: 0.25rem;

      @at-root #{&} a,
        .info h2 {
        display: block;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }

    h2 {
      font-size: 1.25rem;

      span:not(:last-child):after {
        content: ',\00a0';
      }
    }

    .tags {
      margin-top: auto;

      .tag {
        display: inline-flex;
        align-items: center;
        margin-right: 0.375rem;
        background-color: #fafafa;
        padding: 0.375rem 0.5625rem;
        border-radius: 0.5rem;
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
  margin-right: 0.375rem;
}
</style>
