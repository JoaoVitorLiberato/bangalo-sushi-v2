import { Module, GetterTree, ActionTree, MutationTree } from "vuex"
import { rootStateInterface } from "@/plugins/store/interfaces/rootStateInterface"
import { cacheStoreInterface } from "@/plugins/store/interfaces/cacheStoreInterface"

const moduleCache = (): cacheStoreInterface => {
  return {
    rastreamentoUsuario: {}
  }
}

const state: cacheStoreInterface = moduleCache()

const getters: GetterTree<cacheStoreInterface, rootStateInterface> = {
  CacheRastreamentoUsuarioPayloadSource: ({ rastreamentoUsuario }) => () => {
    return rastreamentoUsuario.source
  },
}

const mutations: MutationTree<cacheStoreInterface> = {
  mutationCacheRastreamentoSource: (state, source) => {
    state.rastreamentoUsuario.source = source
  },
}

const actions: ActionTree<cacheStoreInterface, rootStateInterface> = {
  actionCacheRastreamentoUsuarioSource: ({ commit }, { source }) => {
    commit("mutationCacheRastreamentoSource", source)
    sessionStorage.setItem("payload.source", source)
  },
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
