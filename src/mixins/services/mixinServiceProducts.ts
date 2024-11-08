import { Component, Vue } from "vue-property-decorator"
import { IproductData } from "@/types/types-product"
import { namespace } from "vuex-class"
import { MiddlewareServiceAPI } from "@/middlewares/middlewareServiceAPI"

const cacheStore = namespace("cacheStoreModule")
const dialogStore = namespace("dialogStoreModule")

@Component({})
export class MixinServiceProducts extends Vue {
  @cacheStore.Action("actionCacheProducts") setCacheProducts
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

  getAllProducts (): Promise<IproductData[]> {
    this.setCacheFrameLoading({
      status: true,
      message: ""
    })

    return new Promise((resolve) => {
      MiddlewareServiceAPI.get("/products")
        .then((responseMiddleware) => {
          if (!responseMiddleware.data || responseMiddleware.data.length <= 0) throw Error("data-not-found")
          this.setCacheProducts(responseMiddleware.data)
          resolve(responseMiddleware.data)
        }).catch((error) => {
          window.log(`Error MixinServiceProducts - getAllProducts`, error)
          this.setDialogErrorTryAgain(true)

          this.cacheFrameLoading.message = `
            Tivemos um erro ao tentar carregar nossos produtos cadastrados.
            Por favor, Tente novemente.
          `
        }).finally(() => {
          this.cacheFrameLoading.status = false
        })
    })
  }

  createPorduct (product): Promise<string> {
    this.setCacheFrameLoading({
      status: true,
      message: "Criando novo produto..."
    })

    return new Promise((resolve, reject) => {
      MiddlewareServiceAPI.post("/product", product)
        .then((responseMiddleware) => {
          if (responseMiddleware.data.message === "Product created") {
            resolve("product-created")
          }

          reject(Error("Sem data"))
        }).catch((error) => {
          window.log(`error create product`, error)
        }).finally(() => {
          this.setCacheFrameLoading({
            status: false,
            message: ""
          })
        })
    })
  }
}
