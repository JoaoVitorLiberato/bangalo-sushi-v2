import { Component, Vue } from "vue-property-decorator"
import { namespace } from "vuex-class"
import { MiddlewareServiceAPI } from "@/middlewares/middlewareServiceAPI"

const cacheStore = namespace("cacheStoreModule")
const dialogStore = namespace("dialogStoreModule")


@Component({})
export class mixinServiceAuthAdmin extends Vue {
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

  signinUser (data: {
    email: string,
    password: string,
  }):
    Promise<{ role: string, token: string } | { error: string }>
  {
    this.cacheFrameLoading.status = true

    return new Promise((resolve, reject) => {
      MiddlewareServiceAPI.post("/auth/login", data)
        .then((responseMiddleware) => {
          if (!("data" in responseMiddleware)) reject(Error("data not found in middleware"))
          resolve(responseMiddleware.data)
        })
        .catch((error) => {
          resolve(error.response.data)
        })
        .finally(() => {
          this.cacheFrameLoading.status = false
        })
    })
  }
}
