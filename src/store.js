import Vue from 'vue'
import Vuex from 'vuex'

import ky from 'ky'
import pMap from 'p-map'

import { cookies, options } from 'brownies'

Vue.use(Vuex)

const state = {
  token: null,
  data: {
    loading: {
      user: null,
      artists: null,
      releases: null
    },
    user: null,
    artists: [],
    releases: new Map()
  },
  options: {
    ky: {
      headers: {},
      retry: 3,
      baseURL: 'https://api.spotify.com/v1'
    },
    user: {
      linkType: null
    }
  }
}

const mutations = {
  setToken(state, token) {
    state.token = token
  },

  setAuthorizationHeader(state) {
    state.options.ky.headers['Authorization'] = `Bearer ${state.token}`
  },

  setLoading(state, { element, value }) {
    state.data.loading[element] = value
  },

  setUser(state, user) {
    state.data.user = user
  },

  setLinkType(state, linkType) {
    cookies[options] = {
      expires: 315360000
    }

    cookies.linkType = linkType

    state.options.user.linkType = linkType
  },

  addArtists(state, artists) {
    state.data.artists = [...state.data.artists, ...artists]
  },

  addReleases(state, releases) {
    if (releases.length > 0) {
      state.data.releases = new Map([...state.data.releases, ...releases])
    }
  },

  sortReleases(state) {
    state.data.releases = new Map(
      [...state.data.releases].sort((first, second) => {
        const datesCompare = second[1].date.localeCompare(first[1].date)

        if (datesCompare === 0) {
          return first[1].name.localeCompare(second[1].name)
        }

        return datesCompare
      })
    )
  }
}

const actions = {
  setToken({ commit }, { token }) {
    commit('setToken', token)
    commit('setAuthorizationHeader')
  },

  async fetchLink(
    { commit, state },
    { link, mutation, createData, hasNext, nextLink }
  ) {
    const api = await ky.get(link, state.options.ky).json()

    commit(mutation, createData(api))

    if (hasNext(api)) {
      return nextLink(api)
    }
  },

  async makeRequests({ dispatch }, { links, mapper }) {
    const nextLinks = (await pMap(links, mapper, {
      concurrency: 5
    })).filter(link => !!link)

    if (nextLinks.length > 0) {
      return dispatch('makeRequests', {
        links: nextLinks,
        mapper
      })
    }
  },

  async fetchUser({ dispatch, state }) {
    await dispatch('makeRequests', {
      links: [`${state.options.ky.baseURL}/me`],
      mapper: link =>
        dispatch('fetchLink', {
          link,
          mutation: 'setUser',
          createData: api => {
            return {
              id: api.id,
              name: api.display_name,
              link: {
                uri: api.uri,
                http: api.external_urls.spotify
              },
              image:
                api.images.length > 0
                  ? api.images[0].url
                  : `https://ui-avatars.com/api/?name=${api.display_name}&size=512`
            }
          },
          hasNext: () => false,
          nextLink: () => null
        })
    })
  },

  async fetchFollowedArtists({ dispatch, state }) {
    await dispatch('makeRequests', {
      links: [`${state.options.ky.baseURL}/me/following?type=artist&limit=50`],
      mapper: link =>
        dispatch('fetchLink', {
          link,
          mutation: 'addArtists',
          createData: api =>
            api.artists.items.map(followedArtist => [
              followedArtist.id,
              {
                name: followedArtist.name,
                image:
                  followedArtist.images.length > 0
                    ? followedArtist.images[0].url
                    : `https://ui-avatars.com/api/?name=${followedArtist.name}&size=512`
              }
            ]),
          hasNext: api => Boolean(api.artists.next),
          nextLink: api => api.artists.next
        })
    })
  },

  async fetchReleases({ dispatch }, { links }) {
    await dispatch('makeRequests', {
      links,
      mapper: link =>
        dispatch('fetchLink', {
          link,
          mutation: 'addReleases',
          createData: api =>
            api.items
              .map(release => {
                if (
                  release.album_type === 'compilation' ||
                  release.artists[0].id === '0LyfQWJT6nXafLPZqxe9Of'
                ) {
                  return null
                }

                return [
                  release.id,
                  {
                    name: release.name,
                    link: {
                      uri: release.uri,
                      http: release.external_urls.spotify
                    },
                    cover: release.images[0].url,
                    date: release.release_date,
                    type: release.album_type,
                    group: release.album_group,
                    artists: release.artists.map(artist => ({
                      id: artist.id,
                      name: artist.name,
                      link: {
                        uri: artist.uri,
                        http: artist.external_urls.spotify
                      }
                    }))
                  }
                ]
              })
              .filter(Boolean),
          hasNext: api => Boolean(api.next),
          nextLink: api => api.next
        })
    })
  },

  async fetchData({ commit, dispatch, state }) {
    ;['user', 'artists', 'releases'].forEach(element =>
      commit('setLoading', { element, value: true })
    )

    await dispatch('fetchUser')
    commit('setLoading', { element: 'user', value: false })

    await dispatch('fetchFollowedArtists')
    commit('setLoading', { element: 'artists', value: false })

    const links = [...state.data.artists].map(
      followedArtist =>
        `${state.options.ky.baseURL}/artists/${
          followedArtist[0]
        }/albums?include_groups=album,single,appears_on&country=from_token&limit=50`
    )

    await dispatch('fetchReleases', { links })
    commit('sortReleases')
    commit('setLoading', { element: 'releases', value: false })
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
