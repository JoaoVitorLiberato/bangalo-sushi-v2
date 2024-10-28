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
}
