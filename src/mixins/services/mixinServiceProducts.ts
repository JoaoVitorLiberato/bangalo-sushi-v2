import { Component, Vue } from "vue-property-decorator"
import { IproductData } from "@/types/types-product"
import { namespace } from "vuex-class"
import { MiddlewareServiceAPI } from "@/middlewares/middlewareServiceAPI"

const cacheStore = namespace("cacheStoreModule")

@Component({})
export class MixinServiceProducts extends Vue {
  @cacheStore.Action("actionCacheFrameLoading") setCacheFrameLoading

  getAllProducts (): Promise<IproductData[]> {
    this.setCacheFrameLoading({
      status: true,
      message: ""
    })

    return new Promise((resolve) => {
      MiddlewareServiceAPI.get("/products")
        .then((responseMiddleware) => {
          if (!responseMiddleware.data) throw Error("data-not-found")
          resolve(responseMiddleware.data)
        }).catch((error) => {
          window.log(`Error MixinServiceProducts - getAllProducts`, error)
        }).finally(() => {
          this.setCacheFrameLoading({
            status: false,
            message: ""
          })
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
