<template>
  <div
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
                  md="6"
                  class="mb-3"
                >
                  <v-text-field
                    v-model="itemsFirstFields.frete.value"
                    :rules="[required]"
                    tabindex="0"
                    flat
                    label="Frete"
                    color="secondary"
                    class="fix-fieldset-inputs mx-1"
                    outlined
                    readonly
                    hide-details="auto"
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
                  class="px-1"
                >
                  <v-textarea
                    v-font-size="$vuetify.breakpoint.smAndDown ? 14 : 16"
                    v-model="itemsFirstFields.messagem.value"
                    label="Messagem (opcional)"
                    auto-grow
                    color="secondary"
                    counter
                    maxlength="150"
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
                        color="grey lighten-1"
                        large
                        depressed
                        :width="$vuetify.breakpoint.smAndDown ? '100%' : 250"
                        class="mr-md-4"
                      >
                        <span
                          class="font-weight-bold"
                        >
                          Voltar
                        </span>
                      </v-btn>

                      <v-btn
                        color="secondary"
                        large
                        depressed
                        class="mb-5 mb-md-0"
                        :width="$vuetify.breakpoint.smAndDown ? '100%' : 250"
                      >
                        <span
                          class="font-weight-bold primary--text"
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
              @click="cupom.length < 8 ? $refs.inputCupomDiscount.validate() : ''"
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

    <v-dialog
      ref="dialogErrorOrder"
      hide-overlay
      persistent
      max-width="450"
      height="200"
    >
      <v-card
        color="primary"
        elevation="0"
      >
        <v-row
          no-gutters
          style="border:1px solid var(--v-secondary-base)"
          class="pa-4"
        >
          <v-col
            cols="12"
            style="line-height: 1;"
          >
            <span
              v-font-size="16"
              class="font-weight-medium white--text"
            >
              Prezado cliente, Houve um erro ao tentar efetuar seu pedido. Por favor,
              Tente novamente.
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
              block
              color="secondary"
              @click.stop="$refs.dialogErrorOrder.save()"
            >
              <span>
                Tentar Novamente
              </span>
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
  import { Component } from "vue-property-decorator"
  import { mixins } from "vue-class-component"
  import { namespace } from "vuex-class"
  import { MixinServiceVouchers } from "@/mixins/services/mixinServiceVouchers"
  import { $refs } from "@/implements/types"
  import { required } from "@/helpers/rules"
  import "@/styles/views/form/viewForm.styl"

  const cacheStore = namespace("cacheStoreModule")

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
          const CACHE_CART_PRODUCT = sessionStorage.getItem("order")
          if (vm.getCacheRastreamentoUsuarioProductsCart().length === 0) {
            if (!CACHE_CART_PRODUCT) throw Error()

            vm.setRastreamentoUsuarioProductCart(JSON.parse(CACHE_CART_PRODUCT))
          }
        } catch {
          location.replace(`/${location.search}`)
        }
      })
    }

    $refs

    @cacheStore.Getter("CacheRastreamentoUsuarioProductsCart") getCacheRastreamentoUsuarioProductsCart
    @cacheStore.Action("actionRastreamentoUsuarioProductCart") setRastreamentoUsuarioProductCart

    required = required

    formValidate = false
    loadingService = false
    popupNumberOrder  = false
    formDadosCadastrais = false

    cupom = ""
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
      frete: {
        label: "Frete",
        value: "",
        valid: true,
        readonly: true
      },
      messagem: {
        optional: true,
        label: "Mensagem (opcional)",
        value: "",
        valid: "",
      },
    }
  }
</script>
