import Vue from "vue"
import Vuex, { StoreOptions } from "vuex"

import { rootStateInterface } from "@/plugins/store/interfaces/rootStateInterface"
import { cacheStoreModule } from "@/plugins/store/modules/cacheStoreModule"
import { payloadStoreModule } from "@/plugins/store/modules/payloadStoreModule"

Vue.use(Vuex)

const store: StoreOptions<rootStateInterface> = {
  strict: false,
  modules: {
    cacheStoreModule,
    payloadStoreModule,
  },
}

export default new Vuex.Store<rootStateInterface>(store)
