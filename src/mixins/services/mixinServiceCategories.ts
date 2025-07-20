import { Component, Vue } from "vue-property-decorator"
import { namespace } from "vuex-class"
import { MiddlewareServiceAPI } from "@/middlewares/middlewareServiceAPI"
import { event } from "@/plugins/firebase"
import { ICategory } from "@/types/type-category"

const cacheStore = namespace("cacheStoreModule")
const dialogStore = namespace("dialogStoreModule")

@Component({})
export class MixinServiceCategories extends Vue {
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

  getAllCategories (): Promise<ICategory[]> {
    this.setCacheFrameLoading({
      status: true,
      message: ""
    })

    return new Promise((resolve) => {
      MiddlewareServiceAPI.get("/categories")
        .then((responseMiddleware) => {
          if (!("data" in responseMiddleware) || responseMiddleware.data.length <= 0) throw Error("data-not-found")
          resolve(responseMiddleware.data)
        })
        .catch((error) => {
          window.log(`Error MixinServiceProducts - getAllCategories`, error)
          this.cacheFrameLoading.message = `
            Tivemos um erro ao tentar carregar as categorias cadastradas.
            Por favor, Tente novemente.
          `
          this.setDialogErrorTryAgain(true)
          event("error-get-all-categories")
        })
        .finally(() => {
          this.cacheFrameLoading.status = false
        })
    })
  }
}
