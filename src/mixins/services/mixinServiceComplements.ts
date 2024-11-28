import { Component, Vue } from "vue-property-decorator"
import { IComplements } from "@/types/types-product"
import { namespace } from "vuex-class"
import { MiddlewareServiceAPI } from "@/middlewares/middlewareServiceAPI"

const cacheStore = namespace("cacheStoreModule")
const dialogStore = namespace("dialogStoreModule")


@Component({})
export class MixinServiceComplements extends Vue {
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

  getAllComplements (): Promise<IComplements> {
    this.cacheFrameLoading = {
      status: true,
      message: "Carregando todos os complementos"
    }

    return new Promise((resolve, reject) => {
      MiddlewareServiceAPI
        .get("/complements")
        .then((responseMiddleware) => {
          if (!("data" in responseMiddleware) || responseMiddleware.data.length === 0) {
            reject(Error("error-compoments"))
          }

          resolve(responseMiddleware.data)
        })
        .catch((error) => {
          window.log(`ERROR getAllComplements`, error)
          this.cacheFrameLoading.message = `
            Tivemos um erro no sistema ao carregar os complementos. Por favor, Tente novamente!
          `
          this.setDialogErrorTryAgain(true)
        })
        .finally(() => {
          this.cacheFrameLoading.status = false
        })
    })
  }
}
