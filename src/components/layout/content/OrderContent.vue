<template>
  <v-container
    fluid
    class="pa-0"
  >
    <v-row
      no-gutters
      style="max-width:1920px;"
      class="mx-auto my-4"
    >
      <v-col
        cols="12"
        class="hidden-sm-and-down"
      >
        <v-slide-group
          show-arrows
          prev-icon="arrow_back"
          next-icon="arrow_forward"
          :class="`d-flex fix--v-slide-group flex-wrap`"
          center-active
          mandatory
        >
          <v-slide-item
            v-for="item in getCacheRastreamentoUsuarioOrders()"
            :key="`slide-card-dishes-selected-${item.pedido}`"
            class="mr-5"
          >
            <div>
              <card-order-admin
                :item="item"
                :disableButton="!/(pendente)/i.test(item.pagamento.statusPagamento) || cacheFrameLoading.status"
              />
            </div>
          </v-slide-item>
        </v-slide-group>
      </v-col>

      <v-col
        cols="12"
        class="hidden-md-and-up"
      >
        <v-card
          color="grey lighten-4"
          elevation="0"
          class="pa-4"
        >
          <v-row
            no-gutters
          >
            <v-col
              cols="12"
              class="text-center"
            >
              <h2
                class="font-weight-bold error--text text-uppercase"
              >
                Atenção
              </h2>
            </v-col>

            <v-col
              cols="12"
              class="py-2"
            />

            <v-col
              cols="12"
              class="text-center"
            >
              <p
                class="font-weight-regular"
              >
                Essa tela só pode ser acessada por dispositiveis desktop.
              </p>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
  import { Component } from "vue-property-decorator"
  import { mixins } from "vue-class-component"
  import { namespace } from "vuex-class"
  import { MixinServiceOrder } from "@/mixins/services/mixinServiceOrder"
  import "@/styles/views/orders/viewOrder.styl"

  const cacheStore = namespace("cacheStoreModule")

  @Component({
    components: {
      CardOrderAdmin: () => import(
        /* webpackChuckName: "card-order-admin-component" */
        /* webpackMode: "eager" */
        "@/components/cards/order/CardOrderAdmin.vue"
      )
    }
  })

  export default class OrderContent extends mixins(
    MixinServiceOrder,
  ) {
    @cacheStore.Getter("CacheRastreamentoUsuarioOrders") getCacheRastreamentoUsuarioOrders
    @cacheStore.Action("actionRastreamentoUsuarioOrders") setRastreamentoUsuarioOrders

    intervalGetUpdateOrders = 0

    getOrdersToday (): void {
      this.getCostumeOrdersAdmin()
        .then((responseService) => {
          if (/^(error)$/i.test(String(responseService || ""))) {
            window.clearInterval(this.intervalGetUpdateOrders)
            return
          }

          this.setRastreamentoUsuarioOrders(responseService ?? [])
        })
    }

    created (): void {
      this.getOrdersToday()
    }

    mounted (): void {
      this.intervalGetUpdateOrders =  window.setInterval(() => {
        this.getOrdersToday()
      }, 40000)
    }
  }
</script>
