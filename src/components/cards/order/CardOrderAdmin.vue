<template>
  <v-card
    width="310"
  >
    <v-row
      no-gutters
      class="pa-4"
    >
      <v-col
        cols="12"
        class="d-flex align-center justify-space-between"
      >
        <span
          v-font-size="14"
          class="font-weight-bold text-uppercase"
        >
          Pedido:
        </span>

        <span
          v-font-size="14"
          class="text-uppercase"
        >
          {{ String(item.pedido).substring(0, 8) }}
        </span>
      </v-col>

      <v-col
        cols="12"
        class="py-1"
      />

      <v-col
        cols="12"
        class="grey lighten-4 pa-1"
      >
        <v-row
          no-gutters
        >
          <v-col
            cols="12"
          >
            <v-row
              no-gutters
            >
              <v-col
                cols="12"
              >
                <span
                  v-font-size="14"
                  class="font-weight-bold text-uppercase d-block"
                >
                  Nome do cliente:
                </span>

                <span
                  v-font-size="14"
                  class="text-uppercase"
                >
                  {{ item.nome }}
                </span>
              </v-col>

              <v-col
                cols="12"
                class="py-1"
              />

              <v-col
                cols="12"
              >
                <span
                  v-font-size="14"
                  class="font-weight-bold text-uppercase d-block"
                >
                  Telefone de contato:
                </span>

                <span
                  v-font-size="14"
                  class="text-uppercase"
                >
                  {{ item.telefone }}
                </span>
              </v-col>

              <v-col
                cols="12"
                class="py-1"
              />

              <v-col
                cols="12"
              >
                <span
                  v-font-size="14"
                  class="font-weight-bold text-uppercase d-block"
                >
                  Segmento:
                </span>

                <span
                  v-font-size="14"
                  class="text-uppercase"
                >
                  {{ item.segmento }}
                </span>
              </v-col>

              <v-col
                cols="12"
                class="py-1"
              />

              <v-col
                cols="12"
              >
                <span
                  v-font-size="14"
                  class="font-weight-bold text-uppercase d-block"
                >
                  Valor total:
                </span>

                <span
                  v-font-size="14"
                  class="text-uppercase"
                  v-text="getReadingValue(item.pagamento.valorTotal)"
                />
              </v-col>

              <v-col
                cols="12"
                class="py-2"
              />

              <v-col
                cols="12"
              >
                <v-select
                  :items="statusOrders(item.segmento)"
                  :value="item.status"
                  item-text="name"
                  item-value="id"
                  hide-details
                  outlined
                  dense
                  @change="setValue"
                  color="secondary"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>

      <v-col
        cols="12"
        class="py-3"
      />

      <v-col
        cols="12"
      >
        <v-btn
          :color="/pendente/i.test(String(item.pagamento.statusPagamento)) ? 'secondary' : 'grey lighten-2'"
          :disabled="disableButton"
          depressed
          block
          class="black--text font-weight-medium"
        >
          <span
            v-if="/pendente/i.test(String(item.pagamento.statusPagamento))"
            v-font-size="14"
          >
            Pagamento pendente
          </span>

          <span
            v-else
            v-font-size="14"
          >
            Pago
          </span>
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
  import { Component, Prop } from "vue-property-decorator"
  import { mixins } from "vue-class-component"
  import { IOrderData } from "@/types/type-order"
  import DATA_STATUS_ORDERS from "@/data/orders/statusOrders.json"
  import { MixinFunctionsSystem } from "@/mixins/system/MixinFunctionsSystem"

  @Component({})

  export default class CardOrderAdmin extends mixins(
    MixinFunctionsSystem
  ) {
    @Prop({}) item!: IOrderData
    @Prop({ default: false }) disableButton!:boolean

    statusOrders (segment:string): typeof DATA_STATUS_ORDERS {
      return DATA_STATUS_ORDERS[segment]
    }

    setValue (v): void {
      console.log("teste", v)
    }
  }
</script>
