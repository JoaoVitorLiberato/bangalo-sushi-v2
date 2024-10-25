// import PRODUCTS_DATA from "@/data/products/productDefinitive.json"
import { IproductData } from "@/types/types-product"

export function filterDataProduct (category?:string): Array<IproductData>|string {
  const STORAGE_PRODUCT_DATA = sessionStorage.getItem("products")

  if (!STORAGE_PRODUCT_DATA) return "error"
  if (!category) return JSON.parse(STORAGE_PRODUCT_DATA) as IproductData[]

  const PRODUCT_DATA_FILTERED = (JSON.parse(STORAGE_PRODUCT_DATA)).filter((product) => {
    if (String(product.category || "") === String(category || "")) return product
  })

  if (!PRODUCT_DATA_FILTERED) return "error-category"

  return PRODUCT_DATA_FILTERED
}
