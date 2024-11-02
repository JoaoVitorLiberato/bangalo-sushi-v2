/* eslint-disable @typescript-eslint/no-unused-vars */
import { Module, GetterTree, ActionTree, MutationTree } from "vuex"
import { rootStateInterface } from "@/plugins/store/interfaces/rootStateInterface"
import { dialogStoreInterface } from "@/plugins/store/interfaces/dialogStoreInterface"
import { channelSearch } from "@/helpers/analyticsChannel"

const moduleCache = (): dialogStoreInterface => {
  return {
    dialogFunctionHelperSystem: false,
    dialogErrorTryAgain: false,
  }
}

const state: dialogStoreInterface = moduleCache()

const getters: GetterTree<dialogStoreInterface, rootStateInterface> = {
  getDialogFunctionHelperSystem: ({ dialogFunctionHelperSystem }) => () => {
    return dialogFunctionHelperSystem
  },
  getDialogErrorTryAgain: ({ dialogErrorTryAgain }) => () => {
    return dialogErrorTryAgain
  },
}

const mutations: MutationTree<dialogStoreInterface> = {
  mutationDialogFunctionHelperSystem: (state, data) => {
    state.dialogFunctionHelperSystem = data
  },
  mutationDialogErrorAgain: (state, data) => {
    state.dialogErrorTryAgain = data
  },
}

const actions: ActionTree<dialogStoreInterface, rootStateInterface> = {
  setDialogFunctionHelperSystem: ({ commit }, data) => {
    commit("mutationDialogFunctionHelperSystem", data)
  },
  setDialogErrorTryAgain: ({ commit }, data) => {
    commit("mutationDialogErrorAgain", data)
  },
}

const dialogStoreModule: Module<dialogStoreInterface, rootStateInterface> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}

export {
  dialogStoreModule
}
