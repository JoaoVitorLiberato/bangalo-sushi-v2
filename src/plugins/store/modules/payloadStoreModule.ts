/* eslint-disable @typescript-eslint/no-unused-vars */
import { Module, GetterTree, ActionTree, MutationTree } from "vuex"
import { rootStateInterface } from "@/plugins/store/interfaces/rootStateInterface"
import PAYLOAD_DEFAULT from "@/data/payload/payloadDefault.json"
import { channelSearch } from "@/helpers/analyticsChannel"

const moduleCache = (): typeof PAYLOAD_DEFAULT => {
  return PAYLOAD_DEFAULT
}

const state: typeof PAYLOAD_DEFAULT = moduleCache()

const getters: GetterTree<typeof PAYLOAD_DEFAULT, rootStateInterface> = {
  PayloadOrder: (state) => (key:string) => {
    if (key && state[key]) return state[key]
    return state
  },
}

const mutations: MutationTree<typeof PAYLOAD_DEFAULT> = {
  mutationPayloadSourceOrder (state, data) {
    state.canal = data
  },
  mutationPayloadSourceChannel (state, data) {
    state.analytics = data
  },
}

const actions: ActionTree<typeof PAYLOAD_DEFAULT, rootStateInterface> = {
  actionPayloadSourceOrder ({ commit, dispatch, getters, rootState, rootGetters }, data) {
    commit("mutationPayloadSourceOrder", rootGetters["cacheStoreModule/CacheRastreamentoUsuarioPayloadSource"](data))
  },
  actionPayloadChannelAnalytics ({ commit, dispatch, getters, rootState, rootGetters }) {
    if (!/web/i.test(rootGetters["cacheStoreModule/CacheRastreamentoUsuarioPayloadSource"])) {
      dispatch("actionPayloadSourceOrder")
      setTimeout(() => {
        commit("mutationPayloadSourceChannel", {
          campaign: channelSearch("utm_campaign"),
          medium: channelSearch("utm_medium"),
          source: channelSearch("utm_source"),
          params: channelSearch(),
        })
      }, 600)
    }
  },
}

const payloadStoreModule: Module<typeof PAYLOAD_DEFAULT, rootStateInterface> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}

export {
  payloadStoreModule
}
