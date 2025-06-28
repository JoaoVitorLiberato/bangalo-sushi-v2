export interface IproductData {
  id?: string,
  tumbnail: {
    url: string
  },
  category: {
    id: string,
    name: string
  },
  name: string,
  description: string,
  price: {
    default: number,
    qtd_product?: number,
    total?: number,
    total_price_complements?: number
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

export interface IDifferences {
  especial: {
    readonly: boolean,
    input: string,
    active: boolean,
    additional: number
  },
  breaded: {
    readonly: boolean
    input: string,
    active: boolean,
    additional: number
  },
  flambed: {
    readonly: boolean
    input: string,
    active: boolean,
    additional: number
  }
}

export interface ICommentProduct {
  Id?: string,
  ProductID?: string,
  Name?: string,
  Rating?: number,
  Comment?: string,
  CreatedAt: string|number|Date
}
