import { ICategory } from "./type-category"

export interface IProduct {
  id?: string,
  tumbnail: {
    url: string
  },
  name: string,
  description: string,
  price: {
    default: number,
    discount: {
      percentage: number,
      status: boolean
    }
  },
  complements?: IComplements[],
  differences: {
    [key:string]: {
      readonly: boolean,
      status: boolean,
      value: number
    }
  },
  category: ICategory
  note_client: number,
}


export interface IComplements {
  description: string,
  id?: string|number
  name: string,
  price: number
  priceTotal?: number,
  qtd?:number
}
