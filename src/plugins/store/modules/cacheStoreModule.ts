import { Module, GetterTree, ActionTree, MutationTree } from "vuex"
import { rootStateInterface } from "@/plugins/store/interfaces/rootStateInterface"
import { cacheStoreInterface } from "@/plugins/store/interfaces/cacheStoreInterface"

const moduleCache = (): cacheStoreInterface => {
  return {
    rastreamentoUsuario: {
      source: "",
      cart: [],
      orders: [],
      productSelected: null,
      order_id: "",
      checkoutExternal: "",
    },
    products: [],
    complements: [],
    frameLoading: {
      status: false,
      message: "",
    },
    drawerCartProducts: false,
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
  CacheRastreamentoUsuarioOrders: ({ rastreamentoUsuario }) => () => {
    return rastreamentoUsuario.orders
  },
  CacheRastreamentoUsuarioOrderID: ({ rastreamentoUsuario }) => () => {
    return rastreamentoUsuario.order_id
  },
  CacheRastreamentoUsuarioCheckoutExternal: ({ rastreamentoUsuario }) => () => {
    return rastreamentoUsuario.checkoutExternal
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
  CacheDrawerCartProducts: ({ drawerCartProducts }) => () => {
    return drawerCartProducts
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
    if (/add/i.test(String(data.function || ""))) {
      state.rastreamentoUsuario.cart.push(data.product)
    } else {
      state.rastreamentoUsuario.cart = data
    }
  },
  mutationRastreamentoUsuarioProductSelected: (state, data) => {
    state.rastreamentoUsuario.productSelected = data
  },
  mutationRastreamentoUsuarioOrders: (state, data) => {
    state.rastreamentoUsuario.orders = data
  },
  mutationRastreamentoUsuarioOrderID: (state, data) => {
    state.rastreamentoUsuario.order_id = data
  },
  mutationRastreamentoUsuarioCheckoutExternal: (state, data) => {
    state.rastreamentoUsuario.checkoutExternal = data
  },
  mutationCacheComplements: (state, data) => {
    state.complements = data
  },
  mutationCacheDrawerCartProducts (state, data) {
    state.drawerCartProducts = data
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
  actionRastreamentoUsuarioRemoveProductCart: ({ commit }, data) => {
    commit("mutationRastreamentoUsuarioProductCart", data)
  },
  actionRastreamentoUsuarioOrders: ({ commit }, data) => {
    commit("mutationRastreamentoUsuarioOrders", data)
  },
  actionRastreamentoUsuarioOrderID: ({ commit }, data) => {
    commit("mutationRastreamentoUsuarioOrderID", data)
  },
  actionRastreamentoUsuarioCheckoutExternal: ({ commit }, data) => {
    commit("mutationRastreamentoUsuarioCheckoutExternal", data)
  },
  actionRastreamentoUsuarioProductSelected: ({ commit }, data) => {
    commit("mutationRastreamentoUsuarioProductSelected", data)
  },
  actionCacheComplements: ({ commit }, data) => {
    commit("mutationCacheComplements", data)
  },
  ActionCacheDrawerCartProducts ({ commit }, data) {
    commit("mutationCacheDrawerCartProducts", data)
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
