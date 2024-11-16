import { IproductData, IComplements } from "@/types/types-product"

interface cacheStoreInterface {
  rastreamentoUsuario: {
    source: string;
    cart: IproductData[];
    productSelected: IproductData | null;
  };
  products: IproductData[];
  complements: IComplements[];
  drawerCartProducts: boolean;
  frameLoading: {
    status: boolean;
    message: string;
  };
}

export {
  cacheStoreInterface,
}
