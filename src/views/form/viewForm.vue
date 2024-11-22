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
                  <v-row
                    no-gutters
                    class="px-1"
                  >
                    <v-col
                      v-if="loadingService"
                      cols="12"
                    >
                      <v-progress-linear
                        indeterminate
                        color="secondary"
                      />
                    </v-col>

                    <v-col
                      v-else
                      cols="12"
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
                          class="font-weight-bold"
                        >
                          Finalizar compra
                        </span>
                      </v-btn>
                    </v-col>
                  </v-row>
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
            <v-progress-linear
              v-if="loadingService"
              color="secondary"
              indeterminate
            />

            <v-btn
              v-else
              :color="cupom.length >= 8 ? 'secondary' : 'grey lighten-1'"
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
                Aplicar cupom
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
  import { MixinServiceVouchers } from "@/mixins/services/mixinServiceVouchers"
  import { MixinFunctionsSystem } from "@/mixins/system/MixinFunctionsSystem"
  import PAYLOAD_DATA from "@/data/payload/payloadDefault.json"
  import { $refs } from "@/implements/types"
  import { required, nome, telefone } from "@/helpers/rules"
  import "@/styles/views/form/viewForm.styl"

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
    MixinServiceVouchers,
    MixinFunctionsSystem,
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
    loadingService = false
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

    validateCart (): void {
      if (this.$refs.formDadosCadastrais.validate) {
        this.$refs.formDadosCadastrais.validate()
      }
    }

    created (): void {
      setTimeout(() => {
        this.$vuetify.goTo("#inicio-form")
      }, 700)
    }

    validateVoucher (): void {
      this.loadingService = true

      this.getVoucherActived(this.cupom as string)
        .then((responseMixin) => {
          if (/not-found/i.test(String(responseMixin || ""))) {
            this.cupomValidate.status = true
            this.cupomValidate.color = "error--text"
            this.cupomValidate.message = "Este cupom é inválido, por favor, Digite um cupom válido."
            this.loadingService = false
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
              this.loadingService = false
            }, 4000)
          }
        })
    }

    @Watch("itemsFirstFields.nomeCompleto.value")
      changeInputName (value): void {
        this.itemsFirstFields.nomeCompleto.valid = nome(value)
      }

    @Watch("itemsFirstFields.numeroDeContato.value")
      changeInputNumberPhone (value): void {
        this.itemsFirstFields.numeroDeContato.valid = telefone((value).replace(/\D/g, ""))
      }

    signupOrderCart (): void {
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
        })
      console.log("signupOrderCart")
    }
  }
</script>
