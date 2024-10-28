import { Module, GetterTree, ActionTree, MutationTree } from "vuex"
import { rootStateInterface } from "@/plugins/store/interfaces/rootStateInterface"
import { cacheStoreInterface } from "@/plugins/store/interfaces/cacheStoreInterface"

const moduleCache = (): cacheStoreInterface => {
  return {
    rastreamentoUsuario: {},
    frameLoading: {
      status: false,
      message: "",
    }
  }
}

const state: cacheStoreInterface = moduleCache()

const getters: GetterTree<cacheStoreInterface, rootStateInterface> = {
  CacheRastreamentoUsuarioPayloadSource: ({ rastreamentoUsuario }) => () => {
    return rastreamentoUsuario.source
  },
  CacheFrameLoading: ({ frameLoading }) => () => {
    return frameLoading
  }
}

const mutations: MutationTree<cacheStoreInterface> = {
  mutationCacheRastreamentoSource: (state, source) => {
    state.rastreamentoUsuario.source = source
  },
  mutationCacheFrameLoading: (state, data) => {
    state.frameLoading = data
  }
}

const actions: ActionTree<cacheStoreInterface, rootStateInterface> = {
  actionCacheRastreamentoUsuarioSource: ({ commit }, { source }) => {
    commit("mutationCacheRastreamentoSource", source)
    sessionStorage.setItem("payload.source", source)
  },
  actionCacheFrameLoading: ({ commit }, data) => {
    commit("mutationCacheFrameLoading", data)
  }
}

const cacheStoreModule: Module<cacheStoreInterface, rootStateInterface> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}

export {
  cacheStoreModule
}
