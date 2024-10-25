import { Component, Vue } from "vue-property-decorator"
import { IproductData } from "@/types/types-product"
import { MiddlewareServiceAPI } from "@/middlewares/middlewareServiceAPI"

@Component({})
export class MixinServiceProducts extends Vue {
  getAllProducts (): Promise<IproductData[]> {
    return new Promise((resolve) => {
      MiddlewareServiceAPI.get("/products")
        .then((responseMiddleware) => {
          if (!responseMiddleware.data) throw Error("data-not-found")
          resolve(responseMiddleware.data)
        }).catch((error) => {
          window.log(`Error MixinServiceProducts - getAllProducts`, error)
        })
    })
  }
}
