<template>
  <div
    id="inicio-form"
    style="height:100vh"
  >
    <v-row
      no-gutters
      :style="$vuetify.breakpoint.smAndDown ? 'min-height:150px' : 'height:100%'"
    >
      <v-col
        cols="12"
        md="4"
        order-md="2"
        order="1"
      >
        <painel-form-component />
      </v-col>

      <v-col
        cols="12"
        md="8"
        class="pa-4"
        order-md="1"
        order="2"
      >
        <v-row
          no-gutters
        >
          <v-col
            cols="12"
          >
            <h2
              class="font-weight-bold text-uppercase"
            >
              Finalizar pedido
            </h2>

            <div
              style="line-height:15px"
            >
              <span
                v-font-size="14"
                class="grey--text font-weight-normal"
              >
                Prezado clientes, Precisamos que informe alguns dados para
                finalizar seu pedido.
              </span>
            </div>
          </v-col>

          <v-col
            cols="12"
            class="py-2"
          />

          <v-col
            cols="12"
          >
            <v-form
              ref="formDadosCadastrais"
              v-model="formDadosCadastrais"
            >
              <v-row
                no-gutters
                :justify="$vuetify.breakpoint.smAndDown ? 'center' : 'space-between'"
                align="center"
              >
                <v-col
                  v-for="({label,ref,type, optional,mask,readonly}, input) in itemsFirstFields"
                  :key="`peencha-seus-dados-cadastrais-${label}`"
                  v-show="!/formaPagamento|frete|messagem/i.test(String(input))"
                  cols="12"
                  md="6"
                  class="mb-3"
                >
                  <v-text-field
                    :id="ref||input"
                    :ref="ref||input"
                    v-model="itemsFirstFields[input].value"
                    v-mask="mask"
                    :label="label"
                    :name="label"
                    :type="type||'text'"
                    :rules="optional?[itemsFirstFields[input].valid||true]:[required,itemsFirstFields[input].valid]"
                    outlined
                    class="fix-fieldset-inputs mx-1"
                    hide-details="auto"
                    color="secondary"
                    tabindex="0"
                    :title="label"
                    :readonly="readonly"
                  >
                    <template
                      v-slot:message="props"
                    >
                      <span
                        v-text="props.message"
                      />
                    </template>
                  </v-text-field>
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                  class="mb-3"
                >
                  <v-autocomplete
                    :items="['Pix', 'Cartão de Crédito', 'Dinheiro']"
                    v-model="itemsFirstFields.formaPagamento.value"
                    :rules="[required]"
                    label="Forma de pagamento"
                    tabindex="0"
                    flat
                    color="secondary"
                    class="fix-fieldset-inputs mx-1"
                    outlined
                    autocomplete="off"
                    hide-details="auto"
                  >
                    <template
                      v-slot:message="props"
                    >
                      <span
                        v-text="props.message"
                      />
                    </template>
                  </v-autocomplete>
                </v-col>

                <v-col
                  cols="12"
                  class="px-1"
                >
                  <v-textarea
                    v-font-size="$vuetify.breakpoint.smAndDown ? 14 : 16"
                    v-model="itemsFirstFields.messagem.value"
                    label="Messagem (opcional)"
                    auto-grow
                    color="secondary"
                    counter
                    maxlength="180"
                    outlined
                    placeholder="Caso você tenha alguma observação, por favor, escreva nesse campo. Ex. Retire as cebolas."
                    rows="4"
                    row-height="40"
                  />
                </v-col>

                <v-col
                  cols="12"
                  class="px-2"
                >
                  <span
                    class="fix-cupom-text"
                    @click.stop="$refs.dialogDiscount.isActive = true"
                  >
                    Desejo aplicar um cupom?
                  </span>
                </v-col>

                <v-col
                  cols="12"
                  class="py-4"
                />

                <v-col
                  cols="12"
                >
                  <div
                    :class="$vuetify.breakpoint.smAndDown ? 'd-flex flex-column-reverse' : ''"
                  >
                    <v-btn
                      color="grey lighten-2"
                      large
                      rounded
                      depressed
                      :width="$vuetify.breakpoint.smAndDown ? '100%' : 250"
                      class="mr-md-4"
                      @click="$router.replace({ name: 'products-view', params: { type: getPayloadOrder('segmento') } })"
                    >
                      <span
                        class="font-weight-bold"
                      >
                        Voltar
                      </span>
                    </v-btn>

                    <v-btn
                      :color="!validateForm ? 'grey lighten-2' : 'secondary'"
                      large
                      rounded
                      depressed
                      class="mb-5 mb-md-0"
                      :width="$vuetify.breakpoint.smAndDown ? '100%' : 250"
                      @click="!validateForm ? validateCart() : signupOrderCart()"
                    >
                      <span
                        class="font-weight-bold black--text"
                      >
                        {{ cacheFrameLoading.status ? "Aguarde..." : "Finalizar compra" }}
                      </span>
                    </v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-form>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-dialog
      ref="dialogDiscount"
      width="450"
    >
      <v-card
        color="primary"
      >
        <v-row
          no-gutters
          style="border:1px solid var(--v-secondary-base)"
          class="pa-4"
        >
          <v-col
            cols="12"
            class="text-end"
          >
            <v-btn
              icon
              @click.stop="$refs.dialogDiscount.save()"
            >
              <v-icon>
                close
              </v-icon>
            </v-btn>
          </v-col>

          <v-col
            cols="12"
            class="py-2"
          />

          <v-col
            cols="12"
            style="line-height: 18px;"
          >
            <span
              class="font-weight-regular"
            >
              Digite seu cupom de desconto no campo abaixo
            </span>
          </v-col>

          <v-col
            cols="12"
            class="py-2"
          />

          <v-col
            cols="12"
          >
            <v-text-field
              ref="inputCupomDiscount"
              v-model="cupom"
              color="secondary"
              label="Cupom"
              :rules="[required]"
              class="fix-fieldset-inputs"
              outlined
              hide-details
            />
          </v-col>

          <v-col
            v-if="cupomValidate.status"
            cols="12"
            class="py-2"
          />

          <v-col
            v-if="cupomValidate.status"
            cols="12"
            style="line-height: 1;"
          >
            <span
              v-font-size="13"
              :class="`font-weight-regular ${cupomValidate.color}`"
            >
              {{ cupomValidate.message }}
            </span>
          </v-col>

          <v-col
            cols="12"
            class="py-3"
          />

          <v-col
            cols="12"
          >
            <v-btn
              :color="cacheFrameLoading.status ? 'grey lighten-1' : 'secondary'"
              block
              large
              depressed
              rounded
              :disabled="disableCupom"
              @click="cupom.length < 8 ? $refs.inputCupomDiscount.validate() : validateVoucher()"
            >
              <span
                class="font-weight-bold black--text"
              >
                {{ cacheFrameLoading.status ? "Aplicando..." : "Aplicar cupom" }}
              </span>
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from "vue-property-decorator"
  import { mixins } from "vue-class-component"
  import { namespace } from "vuex-class"
  import { event } from "@/plugins/firebase"
  import { middlewareSearchCEP } from "@/middlewares/middlewareSearchCEP"
  import { MixinServiceVouchers } from "@/mixins/services/mixinServiceVouchers"
  import { MixinFunctionsSystem } from "@/mixins/system/MixinFunctionsSystem"
  import { MixinServiceOrder } from "@/mixins/services/mixinServiceOrder"
  import PAYLOAD_DATA from "@/data/payload/payloadDefault.json"
  import { $refs } from "@/implements/types"
  import "@/styles/views/form/viewForm.styl"
  import {
    required,
    nome,
    telefone,
    cep,
    rua,
    numero,
    cidade,
    estado
  } from "@/helpers/rules"

  const cacheStore = namespace("cacheStoreModule")
  const payloadStore = namespace("payloadStoreModule")

  @Component({
    components: {
      PainelFormComponent: () => import(
        /* webpackChuckName: "painel-form-component" */
        /* webpackMode: "eager" */
        "@/components/form/components/Painel.vue"
      )
    }
  })

  export default class viewForm extends mixins(
    MixinFunctionsSystem,
    MixinServiceVouchers,
    MixinServiceOrder,
  ) implements $refs {
    beforeRouteEnter(
      to: {
        name: string;
        params: {
          type: string|RegExp
        },
      },
      _from: never,
      next: (arg0: (vm) => void) => void,
    ) {
      next((vm) => {
        try {
          if (vm.getPayloadOrder("segmento")) {
            Vue.set(PAYLOAD_DATA, "segmento", sessionStorage.getItem("segment"))
          }

          const CACHE_CART_PRODUCT = sessionStorage.getItem("order")
          if (vm.getCacheRastreamentoUsuarioProductsCart().length === 0) {
            if (!CACHE_CART_PRODUCT) throw Error()

            Vue.set(PAYLOAD_DATA, "produtos", JSON.parse(CACHE_CART_PRODUCT))
            vm.setRastreamentoUsuarioProductCart(JSON.parse(CACHE_CART_PRODUCT))
          }

          if (/local/i.test(String(vm.getPayloadOrder("segmento")))) {
            Object.keys(vm.itemsFirstFields)
              .forEach((input) => {
                if (/^(cep|enderecoLogradouro|enderecoNumero|enderecoComplemento|enderecoReferencia|enderecoBairro|enderecoCidade|enderecoUf)$/i.test(input as string)) {
                  Vue.delete(vm.itemsFirstFields, input)
                }
              })
          }
        } catch {
          location.replace(`/${location.search}`)
        }
      })
    }

    $refs

    @cacheStore.Getter("CacheRastreamentoUsuarioProductsCart") getCacheRastreamentoUsuarioProductsCart
    @cacheStore.Action("actionRastreamentoUsuarioProductCart") setRastreamentoUsuarioProductCart
    @payloadStore.Getter("PayloadOrder") declare getPayloadOrder

    required = required

    formValidate = false
    popupNumberOrder  = false
    formDadosCadastrais = false

    cupom = ""
    disableCupom = false
    cupomValidate = {
      status: false,
      color: "",
      message: ""
    }

    itemsFirstFields: {
      [key:string]:{
        [key:string]:string|boolean|number
      }
    } = {
      nomeCompleto: {
        label: "Nome completo",
        value: "",
        valid: "",
      },
      numeroDeContato: {
        label: "Telefone",
        mask: "(##) #####-####",
        type: "tel",
        value: "",
        valid: "",
      },
      cep: {
        ref: "ipt_gtm_modal_event_consumidor_endereco_cep",
        label: "CEP",
        mask: "#####-###",
        type: "tel",
        value: "",
        valid: "",
        readonly: false,
      },
      enderecoLogradouro: {
        label: "Rua",
        value: "",
        valid: "",
        readonly: false,
      },
      enderecoNumero: {
        label: "Número",
        type: "text",
        value: "",
        valid: "",
        readonly: false,
      },
      enderecoComplemento: {
        optional: true,
        label: "Complemento (opcional)",
        value: "",
        valid: "",
      },
      enderecoReferencia: {
        label: "Ponto de referência",
        value: "",
        valid: "",
        readonly: false,
      },
      enderecoBairro: {
        label: "Bairro",
        value: "",
        valid: "",
        readonly: false,
      },
      enderecoCidade: {
        label: "Cidade",
        value: "",
        valid: "",
        readonly: true,
      },
      enderecoUf: {
        label: "UF",
        mask: "AA",
        value: "",
        valid: "",
        readonly: true,
      },
      formaPagamento: {
        label: "Forma de Pagamento",
        value: "",
        valid: "",
      },
      messagem: {
        optional: true,
        label: "Mensagem (opcional)",
        value: "",
        valid: "",
      },
    }

    get validateForm (): boolean {
      return [
        this.formDadosCadastrais
      ].every(o => !!o)
    }

    created (): void {
      setTimeout(() => {
        this.$vuetify.goTo("#inicio-form")
      }, 600)
    }

    validateCart (): void {
      if (this.$refs.formDadosCadastrais.validate) {
        this.$refs.formDadosCadastrais.validate()
      }
    }

    @Watch("itemsFirstFields.nomeCompleto.value")
      changeInputName (value): void {
        this.itemsFirstFields.nomeCompleto.valid = nome(value)
      }

    @Watch("itemsFirstFields.numeroDeContato.value")
      changeInputNumberPhone (value): void {
        this.itemsFirstFields.numeroDeContato.valid = telefone((value).replace(/\D/g, ""))
      }

    @Watch("itemsFirstFields.formaPagamento.value")
      changeInputPaymentForm (value): void {
        this.itemsFirstFields.formaPagamento.valid = !!value
      }

    @Watch("itemsFirstFields.cep.value")
      changeInputCep (value): void {
        if (/^(local)$/i.test(this.getPayloadOrder("segmento"))) return
        const VALUE_INPUT = String(value).replace(/\D/g, "")
        const CEP_DELIVERY_VALID: string[] = [
          "65272000",
          "65272-000"
        ]

        this.itemsFirstFields.cep.valid = cep(VALUE_INPUT)
        if (cep(VALUE_INPUT) !== true) return
        if (!CEP_DELIVERY_VALID.includes(VALUE_INPUT)) {
          this.itemsFirstFields.cep.valid = `
            Infelizmente não entregamos para fora de Santa Luzia de Paruá,
            Caso queira experimentar nossos produtos estaremos ansiosos por sua
            visita em nosso estabelecimento.
          `
          return
        }

        middlewareSearchCEP(VALUE_INPUT)
          .then((responseMiddleware) => {
            if (/error_api/i.test(String(responseMiddleware.erro || ""))) throw Error("VIA-CEP-SIGNOUT")
            if (/cep-invalid/i.test(String(responseMiddleware.erro))) {
              this.itemsFirstFields.cep.valid = "CEP inválido, Por favor informe um CEP correto."
              return
            }

            Object.keys(this.itemsFirstFields).forEach((input) => {
              if (/^(enderecoCidade|enderecoUf)$/i.test(String(input || ""))) {
                if (responseMiddleware.localidade === "" || responseMiddleware.uf === "") {
                  this.itemsFirstFields[input].readonly = false
                  return
                }

                if (/^(enderecoCidade)$/i.test(String(input || ""))) {
                  this.itemsFirstFields[input].value = responseMiddleware.localidade
                }

                if (/^(enderecoUf)$/i.test(String(input || ""))) {
                  this.itemsFirstFields[input].value = responseMiddleware.uf
                }

                this.itemsFirstFields[input].valid = !!responseMiddleware
              }
            })
          })
          .catch((error) => {
            window.log(`ERROR WATCH INPUT CEP`, error)
          })
      }

    @Watch("itemsFirstFields.enderecoLogradouro.value")
      changeInputRoad (value): void {
        if (/^(local)$/i.test(this.getPayloadOrder("segmento"))) return
        this.itemsFirstFields.enderecoLogradouro.valid = rua(value)
      }

    @Watch("itemsFirstFields.enderecoNumero.value")
      changeInputNumberHouse (value): void {
        if (/^(local)$/i.test(this.getPayloadOrder("segmento"))) return
        this.itemsFirstFields.enderecoNumero.valid = numero(value)
      }

    @Watch("itemsFirstFields.enderecoReferencia.value")
      changeInputRefference (value): void {
        if (/^(local)$/i.test(this.getPayloadOrder("segmento"))) return
        this.itemsFirstFields.enderecoReferencia.valid = !!value
      }

    @Watch("itemsFirstFields.enderecoBairro.value")
      changeInputNeighborhood (value): void {
        if (/^(local)$/i.test(this.getPayloadOrder("segmento"))) return
        this.itemsFirstFields.enderecoBairro.valid = !!value
      }

    @Watch("itemsFirstFields.enderecoCidade.value")
      changeInputCity (value): void {
        if (/^(local)$/i.test(this.getPayloadOrder("segmento"))) return
        this.itemsFirstFields.enderecoCidade.valid = cidade(value)
      }

    @Watch("itemsFirstFields.enderecoUf.value")
      changeInputUF (value): void {
        if (/^(local)$/i.test(this.getPayloadOrder("segmento"))) return
        this.itemsFirstFields.enderecoUf.valid = estado(value)
      }

    validateVoucher (): void {
      this.getVoucherActived(this.cupom as string)
        .then((responseMixin) => {
          if (/not-found/i.test(String(responseMixin || ""))) {
            this.cupomValidate.status = true
            this.cupomValidate.color = "error--text"
            this.cupomValidate.message = "Este cupom é inválido, por favor, Digite um cupom válido."
          } else {
            Vue.set(PAYLOAD_DATA.pagamento.desconto, "porcentagem", Number(String(this.cupom).replace(/\D/g, "")))
            Vue.set(PAYLOAD_DATA.pagamento.desconto, "ativado", true)

            this.cupomValidate.status = true
            this.cupomValidate.color = "success--text"
            this.cupomValidate.message = "Cupom aplicado com sucesso."
            this.setTotalAmountProductsCart(this.getCacheRastreamentoUsuarioProductsCart())

            setTimeout(() => {
              this.$refs.dialogDiscount.save()
              this.disableCupom = true
            }, 3000)

            setTimeout(() => {
              this.cacheFrameLoading.status = false
            }, 6000)
          }
        })
    }

    async signupOrderCart (): Promise<void> {
      try {
        Object.keys(this.itemsFirstFields)
          .forEach((input) => {
            if (/^(nomeCompleto)$/i.test(String(input || ""))) {
              Vue.set(PAYLOAD_DATA.consumidor, "nome", this.itemsFirstFields[input].value)
            }

            if (/^(numeroDeContato)$/i.test(String(input || ""))) {
              Vue.set(PAYLOAD_DATA.consumidor.telefone, "contato", String(this.itemsFirstFields[input].value).replace(/\D/g, ""))
            }

            if (/^(messagem)$/i.test(String(input || ""))) {
              Vue.set(PAYLOAD_DATA.consumidor, "mensagem", this.itemsFirstFields[input].value)
            }

            if (/^(formaPagamento)$/i.test(String(input || ""))) {
              Vue.set(PAYLOAD_DATA.pagamento, "formaPagamento", this.itemsFirstFields[input].value)
            }

            if (/^(delivery)$/i.test(this.getPayloadOrder("segmento"))) {
              if (/^(cep)$/i.test(String(input || ""))) {
                const CEP = String(this.itemsFirstFields[input].value).replace(/\D/g, "")
                Vue.set(PAYLOAD_DATA.consumidor.endereco, "cep", CEP)
              }

              if (/^(enderecoLogradouro)$/i.test(String(input || ""))) {
                Vue.set(PAYLOAD_DATA.consumidor.endereco, "logradouro", this.itemsFirstFields[input].value)
              }

              if (/^(enderecoNumero)$/i.test(String(input || ""))) {
                Vue.set(PAYLOAD_DATA.consumidor.endereco, "numero", this.itemsFirstFields[input].value)
              }

              if (/^(enderecoComplemento)$/i.test(String(input || ""))) {
                Vue.set(PAYLOAD_DATA.consumidor.endereco, "complemento", this.itemsFirstFields[input].value)
              }

              if (/^(enderecoReferencia)$/i.test(String(input || ""))) {
                Vue.set(PAYLOAD_DATA.consumidor.endereco, "referencia", this.itemsFirstFields[input].value)
              }

              if (/^(enderecoBairro)$/i.test(String(input || ""))) {
                Vue.set(PAYLOAD_DATA.consumidor.endereco, "bairro", this.itemsFirstFields[input].value)
              }

              if (/^(enderecoCidade)$/i.test(String(input || ""))) {
                Vue.set(PAYLOAD_DATA.consumidor.endereco, "cidade", this.itemsFirstFields[input].value)
              }

              if (/^(enderecoUf)$/i.test(String(input || ""))) {
                Vue.set(PAYLOAD_DATA.consumidor.endereco, "uf", this.itemsFirstFields[input].value)
              }
            }
          })

        const RESPONSE_MIXIN = await this.createOrder()

        if (!RESPONSE_MIXIN) throw Error()

        event("purchase", {
          ...this.getPayloadOrder(),
          order_id: RESPONSE_MIXIN
        })

        location.replace("/detalhes/pedido")
      } catch {
        window.log(`ERROR SIGNUP-ORDER-CART`)
      }
    }
  }
</script>
