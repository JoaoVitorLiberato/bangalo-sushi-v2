import Vue from "vue"
import { dataSource } from "@/middlewares/middlewareChannelSource"

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const LOG = (...v) => window.log(...v, "app")

export function channelSearch (key?:string): typeof location | Record<string, string> | string {
  try {
    const LOCATION_SEARCH = location.search.substring(1)
    if (!LOCATION_SEARCH) return key ? "" : {}

    const LOCATION_SEARCH_SPLITED = LOCATION_SEARCH.split("&")
    if (!LOCATION_SEARCH_SPLITED) return key ? "" : {}

    const LOCATION_SEARCH_OBJECT = {}

    LOCATION_SEARCH_SPLITED.forEach((searchKey) => {
      const SEARCH_KEY_SPLITED = searchKey.split("=")
      if (!SEARCH_KEY_SPLITED) return

      Vue.set(LOCATION_SEARCH_OBJECT, SEARCH_KEY_SPLITED[0], SEARCH_KEY_SPLITED[1])
    })

    if (key) return LOCATION_SEARCH_OBJECT[key] || ""

    return LOCATION_SEARCH_OBJECT
  } catch (error) {
    window.log("error on - channelSearch", error as string)
  }

  return key ? "" : {}
}

export function channelSource ():Promise<string> {
  try {
    return dataSource().then((dataUtm) => {
      let sourceString = "web"

      for (
        let utmDataKey = 0;
        utmDataKey < Object.keys(dataUtm).length;
        utmDataKey++
      ) {
        if (location.search) {
          if (dataUtm[Object.keys(dataUtm)[utmDataKey]].params) {
            if (Object.keys(dataUtm[Object.keys(dataUtm)[utmDataKey]].params).every((utmParamsKey) => {
              return channelSearch(utmParamsKey) === dataUtm[Object.keys(dataUtm)[utmDataKey]].params[utmParamsKey]
            })) {
              if (dataUtm[Object.keys(dataUtm)[utmDataKey]]) {
                if (dataUtm[Object.keys(dataUtm)[utmDataKey]].source) {
                  return dataUtm[Object.keys(dataUtm)[utmDataKey]].source
                }
              }
              sourceString = Object.keys(dataUtm)[utmDataKey]
            }
          } else if (location.pathname !== "/") {
            if (dataUtm[Object.keys(dataUtm)[utmDataKey]].path === location.pathname) {
              return Object.keys(dataUtm)[utmDataKey]
            }
          }
        } else if (location.pathname !== "/") {
          if (dataUtm[Object.keys(dataUtm)[utmDataKey]].path === location.pathname) {
            return Object.keys(dataUtm)[utmDataKey]
          }
        }
      }

      return sourceString
    })
  } catch (error) {
    window.log("error on - channelSource", error as string)
  }

  return Promise.resolve("web")
}
