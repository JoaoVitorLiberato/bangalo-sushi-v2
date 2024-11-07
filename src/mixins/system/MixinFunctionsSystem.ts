import { Component, Vue } from "vue-property-decorator"
import { formatedPrice } from "@/helpers/formatedPrice"
import { IDifferences, IproductData } from "@/types/types-product"

@Component({})
export class MixinFunctionsSystem extends Vue {  
  setTypeDifferences (differences: IDifferences): string {
    let textReturn = ""
    Object.keys(differences).forEach((type) => {
      if (/actived/i.test(String(differences[type].input || ""))) {
        if (differences[type].active) {
          textReturn = String(type)
        }
      }
    })

    switch (true) {
      case /flambed/i.test(String(textReturn)):
        return "Flambado"
      case /breaded/i.test(String(textReturn)):
        return "Empanado"
      case /especial/i.test(String(textReturn)):
        return "Especial"
      default:
        return "Natural"
    }
  }

  setPriceProductCard (product: IproductData, quantity:number) {
    let priceAditionalDifference = 0

    Object.keys(product.differences).forEach((type) => {
      if (/actived/i.test(String(product.differences[type].input || ""))) {
        if (product.differences[type].active) {
          priceAditionalDifference = product.differences[type].additional
        }
      }
    })

    const PRODUCT_PRICE = (Number(product.price.default) + Number(priceAditionalDifference)) * quantity

    return formatedPrice(PRODUCT_PRICE, ".")
  }
}
