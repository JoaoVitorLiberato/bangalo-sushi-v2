import { Module, GetterTree, ActionTree, MutationTree } from "vuex"
import { rootStateInterface } from "@/plugins/store/interfaces/rootStateInterface"
import { cacheStoreInterface } from "@/plugins/store/interfaces/cacheStoreInterface"

const moduleCache = (): cacheStoreInterface => {
  return {
    rastreamentoUsuario: {
      source: "",
      cart: [],
      productSelected: null
    },
    products: [],
    complements: [],
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
  CacheRastreamentoUsuarioProductsCart: ({ rastreamentoUsuario }) => () => {
    return rastreamentoUsuario.cart
  },
  CacheRastreamentoUsuarioProductSelected: ({ rastreamentoUsuario }) => () => {
    return rastreamentoUsuario.productSelected
  },
  CacheProducts: ({ products }) => () => {
    return products
  },
  CacheFrameLoading: ({ frameLoading }) => () => {
    return frameLoading
  },
  CacheComplements: ({ complements }) => () => {
    return complements
  },
}

const mutations: MutationTree<cacheStoreInterface> = {
  mutationCacheRastreamentoSource: (state, source) => {
    state.rastreamentoUsuario.source = source
  },
  mutationCacheProducts: (state, data) => {
    state.products = data
  },
  mutationCacheFrameLoading: (state, data) => {
    state.frameLoading = data
  },
  mutationRastreamentoUsuarioProductCart: (state, data) => {
    state.rastreamentoUsuario.cart.push(data)
  },
  mutationRastreamentoUsuarioProductSelected: (state, data) => {
    state.rastreamentoUsuario.productSelected = data
  },
  mutationCacheComplements: (state, data) => {
    state.complements = data
  },
}

const actions: ActionTree<cacheStoreInterface, rootStateInterface> = {
  actionCacheRastreamentoUsuarioSource: ({ commit }, { source }) => {
    commit("mutationCacheRastreamentoSource", source)
    sessionStorage.setItem("payload.source", source)
  },
  actionCacheProducts: ({ commit }, data) => {
    commit("mutationCacheProducts", data)
  },
  actionCacheFrameLoading: ({ commit }, data) => {
    commit("mutationCacheFrameLoading", data)
  },
  actionRastreamentoUsuarioProductCart: ({ commit }, data) => {
    commit("mutationRastreamentoUsuarioProductCart", data)
  },
  actionRastreamentoUsuarioProductSelected: ({ commit }, data) => {
    commit("mutationRastreamentoUsuarioProductSelected", data)
  },
  actionCacheComplements: ({ commit }, data) => {
    commit("mutationCacheComplements", data)
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
