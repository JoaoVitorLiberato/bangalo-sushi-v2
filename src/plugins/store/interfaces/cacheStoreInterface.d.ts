import { IproductData, IComplements } from "@/types/types-product"
import { IOrderData } from "@/types/type-order"

interface cacheStoreInterface {
  rastreamentoUsuario: {
    source: string;
    orders: IOrderData[]
    cart: IproductData[];
    productSelected: IproductData | null;
    order_id: string;
    checkoutExternal: string;
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
