import { Component, Vue } from "vue-property-decorator"
import { namespace } from "vuex-class"
import { IOrderData } from "@/types/type-order"
import { MiddlewareServiceAPI } from "@/middlewares/middlewareServiceAPI"

const payloadStore = namespace("payloadStoreModule")
const cacheStore = namespace("cacheStoreModule")
const dialogStore = namespace("dialogStoreModule")

@Component({})
export class MixinServiceOrder extends Vue {
  @payloadStore.Getter("PayloadOrder") getPayloadOrder
  @cacheStore.Getter("CacheFrameLoading") getCacheFrameLoading
  @cacheStore.Action("actionCacheFrameLoading") setCacheFrameLoading
  @dialogStore.Action("setDialogErrorTryAgain") setDialogErrorTryAgain

  get cacheFrameLoading (): {
    status: boolean,
    message: string
  } {
    return this.getCacheFrameLoading({
      status: false,
      message: "",
    })
  }

  set cacheFrameLoading (value) {
    this.setCacheFrameLoading(value)
  }

  createOrder (): Promise<string> {
    this.cacheFrameLoading.status = true

    return new Promise((resolve, reject) => {
      return MiddlewareServiceAPI
        .post(`/order`,this.getPayloadOrder())
        .then((responseMiddleware) => {
          if (!("data" in responseMiddleware)) reject(Error("error_not_data"))
          if (responseMiddleware.data && responseMiddleware.data.id) resolve(responseMiddleware.data.id)
        })
        .catch((error) => {
          window.log(`ERROR GETORDERCOSTUMER MIXIN`, error)

          this.cacheFrameLoading.message = `
            Houve um erro ao tentar criar um pedido. Por favor, tente novamente.
          `

          this.setDialogErrorTryAgain(true)
        })
        .finally(() => {
          this.cacheFrameLoading.status = false
        })
    })
  }

  getCostumerOrderByPhone (numberOrder: string|number): Promise<IOrderData[]> {
    this.cacheFrameLoading.status = true

    return new Promise((resolve, reject) => {
      return MiddlewareServiceAPI
        .get(`/order/${numberOrder}`)
        .then((responseMiddleware) => {
          if (!("data" in responseMiddleware)) reject(Error("error_not_data"))
          resolve(responseMiddleware.data)
        })
        .catch((error) => {
          window.log(`ERROR GETORDERCOSTUMER MIXIN`, error)

          this.cacheFrameLoading.message = `
            Houve um erro ao tentar achar seu pedido. Por favor, tente novamente.
          `

          this.setDialogErrorTryAgain(true)
        })
        .finally(() => {
          this.cacheFrameLoading.status = false
        })
    })
  }

  getCostumeOrdersAdmin (): Promise<IOrderData[]|string> {
    this.cacheFrameLoading.status = true

    return new Promise((resolve, reject) => {
      return MiddlewareServiceAPI
        .get(`/orders`)
        .then((responseMiddleware) => {
          if (!("data" in responseMiddleware)) reject(Error("error_not_data"))
          resolve(responseMiddleware.data)
        })
        .catch((error) => {
          window.log(`ERROR GETORDERCOSTUMER MIXIN - getCostumeOrdersAdmin`, error)

          this.cacheFrameLoading.message = `
            Houve um erro ao tentar achar seu pedido. Por favor, tente novamente.
          `

          this.setDialogErrorTryAgain(true)
          resolve("error")
        })
        .finally(() => {
          this.cacheFrameLoading.status = false
        })
    })
  }
}
