declare global {
  interface Window {
    env: (env?: string) => string|boolean;
    log: (...e: string[]) => void;
  }
}

window.env = (env?: string): string|boolean => {
  /**
  * HOW USE
  * coloque este trecho abaixo no documento que deseja testar o env
  *
  * // eslint-disable-next-line @typescript-eslint/no-unused-vars
  * ENV = (env?: string): string | boolean => window.env(env)
  *
  * agora insira a const com o env que deseja testar.
  * ENV( 'development' )
  *
  * Para testar exibir um elemento sómente em um env, basta adicionar
  * v-if="ENV( 'development' )"
  *
  * pasra testar um script sómente em um env, basta adicionar
  * if ( ENV( 'development' ) )
  *
  * Para saber qual env está executando, basta adicionar
  * ENV() em um log como LOG( ENV() )
  */

  return (!env && (process.env.VUE_APP_NODE_ENV || process.env.NODE_ENV)) || ((process.env.VUE_APP_NODE_ENV || process.env.NODE_ENV) === env)
}

window.log = (...array) => {
  /**
  * HOW USE
  * coloque este trecho abaixo no documento que deseja ver os logs
  * substitua XXXX pelo nome do componente
  * adicione o nome do componente na variável de ambiente (.env.local) VUE_APP_ENABLED_LOGS
  *
  * // eslint-disable-next-line @typescript-eslint/no-unused-vars
  * const LOG = (...array) => window.log(...array, "app")
  *
  * agora insira a const com a mensagem que deseja ver no console.
  * LOG( 'quero ver este log' )
  *
  * Para testar a performance de uma função, basta adicionar um LOG
  * começando com a palavra timeStart e a mensagem que deseja ver
  * e então adicione outro LOG começando com a palavra timeEnd
  * contendo a mesma mensagem do LOG que iniciou com timeStart
  *
  * LOG('timeStart Exemplo de console com tempo de execução')
  * TODA SUA FUNÇÃO AQUI
  * LOG('timeEnd Exemplo de console com tempo de execução')
  *
  * você também pode utilizar o timeStart ao entrar em uma função
  * e o timeEnd ao voltar da função.
  */

  /**
  <script>
  export default {
    data () {
      return {
        LOG: (...array) => window.log(...array, "app")
      }
    },

    created () {
      this.LOG('timeStart Exemplo de LOG com Time funcionando no arquivo APP')
    },

    mounted () {
      this.LOG('timeEnd Exemplo de LOG com Time funcionando no arquivo APP')
    },

    updated () {
      this.LOG('Exemplo de LOG funcionando com filePath no arquivo APP', '\n\n', __filename)

      try {
        throw Error('Exemplo de LOG com erro funcionando no arquivo APP')
      } catch (error:unknown) {
        this.LOG('error on', __filename, error as string)
      }
    }
  }
  </script>
  */

  try {
    if (/^error on/.test(array[0])) {
      // eslint-disable-next-line no-console
      return console[window.env("development") ? "error" : "debug"](...array)
    }

    if (process.env.VUE_APP_ENABLED_LOGS && (window.env("development") || /all/.test(process.env.VUE_APP_ENABLED_LOGS))) {
      if (/all/.test(process.env.VUE_APP_ENABLED_LOGS)) {
        if (window.location.search) {
          if (/debug/.test(location.search)) {
            if (!String(window.location.search || "").replace("?", "").split(/=|&/).map(o => o.trim()).includes(array[array.length - 1])) return
          } else return
        } else return
      } else {
        if ((!process.env.VUE_APP_ENABLED_LOGS) || (!process.env.VUE_APP_ENABLED_LOGS.split(",").map(o => o.trim()).includes(array[array.length - 1]))) return
      }

      let consoleDefault = true
      if (/timeStart/.test(array[0]) || /timeEnd/.test(array[0])) {
        if (/timeStart/.test(array[0]) && performance) {
          sessionStorage.setItem("performanceNowStart", String(performance.now() || ""))
        }
        if (/timeEnd/.test(array[0]) && performance) {
          sessionStorage.setItem("performanceNowEnd", String(performance.now() || ""))
        }

        if (/timeStart/.test(array[0])) {
          const timeNameFunction: string[] = []
          array[0].split(" ").forEach((string: string) => {
            if (!/(timeStart|timeEnd)/.test(string)) timeNameFunction.push(string)
          })

          if (timeNameFunction.length) {
            consoleDefault = false
            if (!sessionStorage.getItem("performanceNowStart")) {
              // eslint-disable-next-line no-console
              console.time(timeNameFunction.join(" "))
            }
          }
        }

        if (/timeEnd/.test(array[0])) {
          const timeNameFunction: string[] = []
          array[0].split(" ").forEach((string: string) => {
            if (!/(timeStart|timeEnd)/.test(string)) timeNameFunction.push(string)
          })

          if (timeNameFunction.length) {
            consoleDefault = false
            if (sessionStorage.getItem("performanceNowStart") && sessionStorage.getItem("performanceNowEnd")) {
              // eslint-disable-next-line no-console
              console.log(timeNameFunction.join(" "), (Number(sessionStorage.getItem("performanceNowEnd")) || 0) - (Number(sessionStorage.getItem("performanceNowStart")) || 0))
              sessionStorage.removeItem("performanceNowStart")
              sessionStorage.removeItem("performanceNowEnd")
            } else {
              // eslint-disable-next-line no-console
              console.timeEnd(timeNameFunction.join(" "))
            }
          }
        }
      }

      if (!consoleDefault) return
      const stringItemsReceived: string[] = []
      array.forEach((string: string) => {
        if (process.env.VUE_APP_ENABLED_LOGS && !/all/.test(process.env.VUE_APP_ENABLED_LOGS)) {
          if (!process.env.VUE_APP_ENABLED_LOGS.split(",").map(o => o.trim()).includes(string)) stringItemsReceived.push(string)
        } else if (window.location.search) {
          if (!String(window.location.search || "").replace("?", "").split("=").map(o => o.trim()).includes(string)) stringItemsReceived.push(string)
        }
      })

      if ((/enabled/).test(String(process.env.VUE_APP_TERMINALLOG || ""))) {
        fetch("//localhost:8080/log", {
          "method": "POST",
          "headers": {
            "Accept": "application.json",
            "Content-Type": "application/json",
          },
          "body": JSON.stringify(stringItemsReceived),
        })
      }

      // eslint-disable-next-line no-console
      console.log(...stringItemsReceived)
    }
  } catch { /** no-empty-catch */ }
}

export {}
