import { IproductData } from "@/types/types-product"

interface cacheStoreInterface {
  rastreamentoUsuario: {
    source: string;
    cart: IproductData[]
    productSelected: IproductData | null
  };
  products: IproductData[]
  frameLoading: {
    status: boolean,
    message: string,
  };
}

export {
  cacheStoreInterface,
}
