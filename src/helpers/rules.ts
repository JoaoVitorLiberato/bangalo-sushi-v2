
import ibgeData from "@/data/global/ibgeEstados.json"
export function email (value:string, text?:string):string|boolean {
  return /^(([a-zA-Z0-9][-_.]{0,1}){0,63})([^\W_])+@([a-zA-Z0-9]{1,63})(\.[a-zA-Z0-9]{2,63})+$/i.test(value) || (text || "Formato de email inválido")
}

export function cpf (value:string, text?:string):string|boolean {
  if (/^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}-?[0-9]{2})$/i.test(value)) {
    let digitosIguais = 1

    for (let i = 0; i < value.length - 1; i++) {
      if (value.charAt(i) !== value.charAt(i + 1)) {
        digitosIguais = 0
        break
      }
    }

    if (!digitosIguais) {
      let Break, Soma, Resto

      Soma = 0
      for (let i = 1; i <= 9; i++) Soma = Soma + parseInt(value.substring(i - 1, i)) * (11 - i)

      Resto = (Soma * 10) % 11
      if ((Resto === 10) || (Resto === 11)) Resto = 0
      if (Resto !== parseInt(value.substring(9, 10))) Break = true

      Soma = 0
      for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(value.substring(i - 1, i)) * (12 - i)

      Resto = (Soma * 10) % 11
      if ((Resto === 10) || (Resto === 11)) Resto = 0
      if (Resto !== parseInt(value.substring(10, 11))) Break = true

      return !Break || (text || "CPF inválido")
    } else {
      return text || "CPF inválido"
    }
  } else {
    return text || "CPF inválido"
  }
}

export function nascimento (value:string, text?:string):string|boolean {
  if (/^(?:(?:31([-/.]?)(?:0[13578]|1[02]))\1|(?:(?:29|30)([-/.]?)(?:0[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)\d{2})$|^(?:29([-/.]?)02\3(?:(?:(?:1[6-9]|[2-9]\d)(?:0[48]|[2468][048]|[13579][26]))))$|^(?:0[1-9]|1\d|2[0-8])([-/.]?)(?:(?:0[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)\d{2})$/i.test(value)) {
    let Break
    const day = Number(value.substring(0, 2))
    const month = Number(value.substring(2, 4))
    const year = Number(value.substring(4, 8))
    const date = new Date()
    const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) monthLength[1] = 29
    if (year < date.getFullYear() - 110 || month === 0 || month > 12) Break = text || "Data inválida"
    if (year > (date.getFullYear() - 18)) Break = text || "Você deve ser maior de 18 anos"
    if (date.getFullYear() - year === 18 && date.getMonth() + 1 < month) Break = text || "Você deve ser maior de 18 anos"
    if (date.getFullYear() - year === 18 && date.getMonth() + 1 === month && date.getDate() < day) Break = text || "Você deve ser maior de 18 anos"

    return Break || (day > 0 && day <= monthLength[month - 1]) || (text || "Data inválida")
  } else {
    return text || "Data inválida"
  }
}

export function telefone (value:string, text?:string):string|boolean {
  if (/^(0?\(?[0-9]{2}\)?[0-9]{5}-?[0-9]{4})$/i.test(value)) {
    let Break
    let digitosIguais = 1

    for (let i = 3; i < value.length - 1; i++) {
      if (value.charAt(i) !== value.charAt(i + 1)) {
        digitosIguais = 0
        break
      }
    }

    if (!digitosIguais) {
      if (value.charAt(2) !== "9") Break = text || "Digite um número de Celular"

      return !Break || (text || "Telefone inválido")
    } else {
      return text || "Telefone inválido"
    }
  } else {
    return text || "Telefone inválido"
  }
}

export function numero (value:string, text?:string):string|boolean {
  return /^[0-9]{1,}$/i.test(value) || (text || "Somente números")
}

export function sms (value:string, text?:string):string|boolean {
  return /^[0-9]{4}$/i.test(value) || (text || "Digite 4 números")
}

export function nome (value:string, text?:string):string|boolean {
  return /^[a-záàâãéèêíïóôõöúçñ]{3,}(\s[a-záàâãéèêíïóôõöúçñ]{2,})+$/i.test(value) || (text || "Nome pessoal inválido")
}

export function cep (value:string, text?:string):string|boolean {
  if (/^[0-9]{5}-?[0-9]{3}$/i.test(value)) {
    return true
  }

  return text || "CEP inválido"
}

export function rua (value:string, text?:string):string|boolean {
  return /^['"`´ªº°()/0-9a-záàâãéèêíïóôõöúüçñ,.;:-]{0,}(\s?['"`´ªº°()/0-9a-záàâãéèêíïóôõöúüçñ,.;:-]{1,})+$/i.test(value) || (text || "Nome de rua inválido")
}

export function cidade (value:string, text?:string):string|boolean {
  // return /^['"`´ªº°()/0-9a-záàâãéèêíïóôõöúüçñ,.;:-]{0,}(\s?['"`´ªº°()/0-9a-záàâãéèêíïóôõöúüçñ,.;:-]{1,})+$/i.test(value) ? (!!ibgeData.filter(o => o.nome.map(nome => nome.toLowerCase()).includes(value.toLowerCase())).length || "Cidade indisponível") : (text || "Nome de cidade inválido")
  return /^['"`´ªº°()/0-9a-záàâãéèêíïóôõöúüçñ,.;:-]{0,}(\s?['"`´ªº°()/0-9a-záàâãéèêíïóôõöúüçñ,.;:-]{1,})+$/i.test(value) || (text || "Nome de cidade inválido")
}

export function estado (value:string, text?:string):string|boolean {
  return /^[a-z]{2}$/i.test(value) ? (!!ibgeData.filter(o => o.nome.map(nome => nome.toLowerCase()).includes(value.toLowerCase())).length || "Estado indisponível") : (text || "Estado inválido")
}

export function estadoddd (value:string, compare: string, text?:string):string|boolean {
  return /^[a-z]{2}$/i.test(value) ? (!!ibgeData.filter(o => o.nome.map(nome => nome.toLowerCase()).includes(value.toLowerCase()) && o.ddd.includes(Number(compare))).length) : (text || false)
}

export function required (value:string|number, text?:string):string|boolean {
  return !!value || (text || "Obrigatório")
}
