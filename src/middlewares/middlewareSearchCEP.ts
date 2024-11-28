import { ValuesViaCepAPI } from "@/types/type-form"

export async function middlewareSearchCEP (value: string|number): Promise<ValuesViaCepAPI>{
  return fetch(`https://viacep.com.br/ws/${String(value).replace(/\D/g, "")}/json`)
    .then((responseViaCep) => {
      return responseViaCep.json()
    }).then(responseJson => {
      if (responseJson.erro) return { erro: "cep-invalid" }
      return {
        ...responseJson
      }
    }).catch(err => {
      window.log(`ERRO ON responseMiddleware - viaCep`, err)
      return {
        erro: "error_api",
        cep: value
      }
    })
}
