import { Component, Vue } from "vue-property-decorator"
import { namespace } from "vuex-class"
import { MiddlewareServiceAPI } from "@/middlewares/middlewareServiceAPI"
import { event } from "@/plugins/firebase"

const cacheStore = namespace("cacheStoreModule")
const dialogStore = namespace("dialogStoreModule")

@Component({})
export class MixinServiceSystem extends Vue {
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

  getStoreTurnOn (): Promise<boolean> {
    this.cacheFrameLoading.status = true

    return new Promise((resolve, reject) => {
      MiddlewareServiceAPI.get("/open")
        .then((responseMiddleware) => {
          if (!("data" in responseMiddleware)) {
            reject(Error("not-data"))
          }

          event(`store-open-${responseMiddleware.data.store}`)
          this.cacheFrameLoading.status = /view-product/i.test(this.$route.name as string)
          resolve(responseMiddleware.data.store)
        }).catch((error) => {
          window.log(`ERROR getTurnOnSystem - ${error}`)
          this.cacheFrameLoading.message = `
            Houve um erro ao tentar saber se a loja está recebendo pedidos. Por favor,
            tente novamente.
          `
          this.cacheFrameLoading.status = false
          this.setDialogErrorTryAgain(true)
        })
    })
  }
}
