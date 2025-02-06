import Axios from "axios"

const CONNECT_API = Axios.create({
  baseURL: process.env.VUE_APP_BANGALO_SUPPORT_API_URL,
  headers: {
    responseType: "json",
    "x-api-key": process.env.VUE_APP_BANGALO_SUPPORT_API_KEY
  }
})

CONNECT_API.interceptors.request.use((request) => {
  const TOKEN_CACHE = sessionStorage.getItem("token-user")

  if (TOKEN_CACHE) request.headers.Authorization = `Bearer ${TOKEN_CACHE}` || ""

  return request
}, function(error) {
  return Promise.reject(error)
})

CONNECT_API.interceptors.response.use((response) => {
  return response
}, function(error) {
  return Promise.reject(error)
})

export {
  CONNECT_API as MiddlewareServiceAPI
}
