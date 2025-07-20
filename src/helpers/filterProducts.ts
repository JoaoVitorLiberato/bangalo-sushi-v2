import store from "@/plugins/store"
import { IProduct } from "@/types/types-product"

export function filterDataProduct (category?:string): Array<IProduct>|string {
  const STORAGE_PRODUCT_DATA = store.getters["cacheStoreModule/CacheProducts"]()

  if (!category) return STORAGE_PRODUCT_DATA as IProduct[]

  const PRODUCT_DATA_FILTERED = STORAGE_PRODUCT_DATA.filter((product) => {
    if (String(product.category.id || "") === String(category || "")) return product
  })

  if (!PRODUCT_DATA_FILTERED) return "error-category"

  return PRODUCT_DATA_FILTERED
}
