import { IproductData } from "@/types/types-product"

interface cacheStoreInterface {
  rastreamentoUsuario: Record<string, string|string[]|number|number[]|boolean>
  products: IproductData[]
  frameLoading: {
    status: boolean,
    message: string,
  };
}

export {
  cacheStoreInterface,
}
