import app from "@/main"

export function propertysCacheDetele (): void {
  if (
    /^(admin-login-view|form-view|order-view|products-view|home)$/i.test(String(app.$route.name))
  ) {
    const TOKEN_USER = sessionStorage.getItem("token-user")
    const PERMISION_USER =  sessionStorage.getItem("permision-user")

    sessionStorage.removeItem("token-user")
    sessionStorage.removeItem("permision-user")

    if (TOKEN_USER || PERMISION_USER) {
      sessionStorage.removeItem("token-user")
      sessionStorage.removeItem("permision-user")
    }
  }

  if (
    /^(admin-login-view|form-view|products-view|home)$/i.test(String(app.$route.name))
  ) {
    sessionStorage.removeItem("external-link")
  }

  if (
    /^(admin-login-view|home)$/i.test(String(app.$route.name))
  ) {
    sessionStorage.removeItem("order")
  }
}
