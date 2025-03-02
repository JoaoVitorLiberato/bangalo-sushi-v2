import Axios from "axios"

const CONNECT_API = Axios.create({
  baseURL: process.env.VUE_APP_BANGALO_PAYMENT_URL,
  headers: {
    responseType: "json",
    "x-api-key": process.env.VUE_APP_BANGALO_SUPPORT_API_KEY
  }
})

CONNECT_API.interceptors.request.use((request) => {
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
