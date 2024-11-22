import { Component, Vue } from "vue-property-decorator"
import { namespace } from "vuex-class"
import { IDifferences, IproductData } from "@/types/types-product"
import PAYLOAD_DATA from "@/data/payload/payloadDefault.json"

const payloadStore = namespace("payloadStoreModule")

@Component({})
export class MixinFunctionsSystem extends Vue {
  @payloadStore.Getter("PayloadOrder") declare getPayloadOrder

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

  getReadingValue (price: number|string|string[], type?: string): string|string[] {
    if (price === undefined || null) return ""
    let valorFinal = ""
    if (price === 0) {
      valorFinal = "0,00"
    } else {
      const p = price.toString()
      if (/\.|,/.test(p)) {
        valorFinal = `${p.substring(0, p.length - 2).replace(/\W/g, "")},${p.substring(p.length - 3).replace(/\W/g, "")}`
      } else {
        valorFinal = `${p.substring(0, p.length - 2).replace(/\W/g, "")},${p.substring(p.length - 2).replace(/\W/g, "")}`
      }
    }

    if (type) {
      if (/float|dot/.test(type)) {
        return valorFinal.replace(/\.|,/, ".")
      } else if (/split/.test(type)) {
        return String(valorFinal || "").split(/\.|,/)
      } else {
        return valorFinal
      }
    } else {
      return `R$ ${valorFinal}`
    }
  }

  setPriceProductCard (product: IproductData, quantity:number, typePrice?: string) {
    let priceAditionalDifference = 0

    Object.keys(product.differences).forEach((type) => {
      if (/actived/i.test(String(product.differences[type].input || ""))) {
        if (product.differences[type].active) {
          priceAditionalDifference = product.differences[type].additional
        }
      }
    })

    const PRODUCT_PRICE = (Number(product.price.default) + Number(priceAditionalDifference)) * quantity

    return {
      priceFormated: this.getReadingValue(PRODUCT_PRICE, (typePrice || ".")),
      priceCalculed: PRODUCT_PRICE
    }
  }

  setTotalAmountProductsCart (cart: IproductData[]) {
    const DISCOUNT_PAYMENT = this.getPayloadOrder("pagamento").desconto
    const FREIGHT = /delivery/i.test(String(this.getPayloadOrder("segmento"))) ? 500 : 0
    let totalAmountProductCart = 0
    let dicountTotalAmount = 0

    cart.forEach((item) => {
      if (item.price && "total" in item.price) totalAmountProductCart += item.price.total as number
    })

    if (DISCOUNT_PAYMENT.ativado) {
      dicountTotalAmount = Number(totalAmountProductCart) - Number((DISCOUNT_PAYMENT.porcentagem / 100) * totalAmountProductCart)
      Vue.set(PAYLOAD_DATA.pagamento.desconto, "PrecoTotalComDesconto", Number(dicountTotalAmount) + Number(FREIGHT))
    }

    Vue.set(PAYLOAD_DATA.pagamento, "valorFrete", FREIGHT)
    Vue.set(PAYLOAD_DATA.pagamento, "valorProdutos", totalAmountProductCart)
    Vue.set(PAYLOAD_DATA.pagamento, "valorTotal", totalAmountProductCart + Number(FREIGHT))

    return {
      freight: this.getReadingValue(FREIGHT),
      dicountTotalAmount: this.getReadingValue(totalAmountProductCart - dicountTotalAmount),
      totalCart: this.getReadingValue(totalAmountProductCart) || 0,
      total: this.getReadingValue(totalAmountProductCart + FREIGHT) || 0,
      totalWithDicount:  this.getReadingValue(DISCOUNT_PAYMENT.PrecoTotalComDesconto) || 0
    }
  }
}
