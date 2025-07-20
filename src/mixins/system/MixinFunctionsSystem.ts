import { Component, Vue } from "vue-property-decorator"
import { namespace } from "vuex-class"
import { IProduct } from "@/types/types-product"

const payloadStore = namespace("payloadStoreModule")

@Component({})
export class MixinFunctionsSystem extends Vue {
  @payloadStore.Getter("PayloadOrder") declare getPayloadOrder

  setTypeDifferences (differences): string {
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

  getReadingPrice (price: number|string|string[], type?: string): string|string[] {
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

  setPriceProductCard (product?: IProduct, quantity?:number, typePrice?: string) {
    console.log(product, quantity, typePrice)
    return {
      priceFormated: 0,
      priceCalculed: 0
    }
  }
}
