import { IproductData, IComplements } from "@/types/types-product"
import { IOrderData } from "@/types/type-order"
import { ICategory } from "@/types/type-category";

interface cacheStoreInterface {
  rastreamentoUsuario: {
    source: string;
    orders: IOrderData[]
    cart: IproductData[];
    order_id: string;
    checkoutExternal: string;
  };
  products: IproductData[];
  complements: IComplements[];
  catagories: ICategory[];
  drawerCart: boolean;
  frameLoading: {
    status: boolean;
    message: string;
  };
}

export {
  cacheStoreInterface,
}
