/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Vue } from "vue-property-decorator"
import { namespace } from "vuex-class"
import { MiddlewareServiceAPI } from "@/middlewares/middlewareServicePaymentAPI"

const cacheStore = namespace("cacheStoreModule")
const dialogStore = namespace("dialogStoreModule")
const paylaodStore = namespace("payloadStoreModule")


@Component({})
export class MixinServicePayment extends Vue {
  @cacheStore.Getter("CacheFrameLoading") getCacheFrameLoading
  @cacheStore.Action("actionCacheFrameLoading") setCacheFrameLoading
  @cacheStore.Getter("CacheRastreamentoUsuarioOrderID") getCacheRastreamentoUsuarioOrderID
  @cacheStore.Action("actionRastreamentoUsuarioCheckoutExternal") setRastreamentoUsuarioCheckoutExternal
  @dialogStore.Action("setDialogErrorPayment") setDialogErrorPayment
  @paylaodStore.Getter("PayloadOrder") getPayloadOrder

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

  startPayment (): Promise<any> {
    this.cacheFrameLoading.status = true

    return new Promise((resolve, reject) => {
      MiddlewareServiceAPI.post("/payment-start", {
        orderID: this.getCacheRastreamentoUsuarioOrderID(),
        costumer: this.getPayloadOrder()
      })
        .then(responseMiddleware => {
          if (!("data" in responseMiddleware)) reject(Error("data-not-found"))
          this.setRastreamentoUsuarioCheckoutExternal(responseMiddleware.data.externallink)
          sessionStorage.setItem("external-link", JSON.stringify(responseMiddleware.data.externallink))
          resolve({
            success: true
          })
        }).catch(err => {
          window.log("ERROR startPayment", err)
          this.cacheFrameLoading.message = `Houve um erro tentar gerar o link de pagamento, por favor, tente novamente.`
          this.setDialogErrorPayment(true)
          resolve({
            success: false
          })
        }).finally(() => {
          this.cacheFrameLoading.status = false
          this.cacheFrameLoading.message = ""
        })
    })
  }

  updateStatusPayment () : Promise<void|boolean> {
    const PHONE_COSTUMER = sessionStorage.getItem("phone-costumer")

    this.cacheFrameLoading.status = true

    return new Promise((resolve, reject) => {
      MiddlewareServiceAPI.post(`/update/${PHONE_COSTUMER}`, {
        property: this.$route.query
      })
        .then(responseMiddleware => {
          if (!("data" in responseMiddleware)) reject(Error("data-not-found"))
          resolve(responseMiddleware.data.success)
        }).catch(err => {
          window.log("ERROR updateStatusPayment", err)
        }).finally(() => {
          this.cacheFrameLoading.status = false
        })
    })
  }
}
