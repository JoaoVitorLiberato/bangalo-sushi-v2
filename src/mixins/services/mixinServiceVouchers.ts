import { Component, Vue } from "vue-property-decorator"
import { namespace } from "vuex-class"
import { MiddlewareServiceAPI } from "@/middlewares/middlewareServiceAPI"
import { IVouchers } from "@/types/type-voucher"

const cacheStore = namespace("cacheStoreModule")
const dialogStore = namespace("dialogStoreModule")


@Component({})
export class MixinServiceVouchers extends Vue {
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

  getVoucherActived (cupom: string): Promise<IVouchers[]|string|boolean|void> {
    this.cacheFrameLoading.status = true

    return new Promise((resolve, reject) => {
      MiddlewareServiceAPI
        .get(`voucher/${String(cupom).toUpperCase()}`)
        .then(responseMiddleware => {
          if (!("data" in responseMiddleware)) reject(Error("error"))
          resolve(true)
        })
        .catch(err => {
          window.log("ERROR getAllVouchers", err)
          if (err.response.data.message === "Voucher não encontrado") {
            resolve("not-found")
          } else {
            this.cacheFrameLoading.message = `
              Houve um erro ao tentar validar seu cupom. Por favor, Tente novamente.
            `
            this.setDialogErrorTryAgain(true)
          }
        })
    })
  }
}
