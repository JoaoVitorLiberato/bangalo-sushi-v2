<template>
  <v-card
    v-show="true"
    v-border.radius="'0px'"
    elevation="0"
    color="secondary"
    :style="expand ? 'height:100%' : ''"
  >
    <v-row
      no-gutters
      class="pa-4"
    >
      <v-col
        cols="12"
        class="d-flex align-center justify-space-between"
        @click.stop="$vuetify.breakpoint.smAndDown ? expand = !expand : ''"
      >
        <span
          v-font-size="$vuetify.breakpoint.smAndDown ? 16 : 19"
          class="font-weight-bold text-uppercase"
        >
          Detalhes do pedido
        </span>

        <v-btn
          v-if="$vuetify.breakpoint.smAndDown"
          icon
        >
          <v-icon
            size="28"
            color="black"
            :style="expand ? 'transform: rotate(-180deg);' : 'transform: rotate(0deg);'"
          >
            keyboard_arrow_down
          </v-icon>
        </v-btn>
      </v-col>

      <v-col
        cols="12"
      >
        <v-expand-transition>
          <div
            v-show="expand"
          >
            <v-row
              no-gutters
            >
              <v-col
                cols="12"
                style="line-height:15px"
              >
                <span
                  v-font-size="14"
                  class="font-weight-regular error--text"
                >
                  Obs: Caso deseje retonar a pagina de produtos, não se preocupe, pois seus
                  produtos estão armazenado no cache do navegador.
                </span>
              </v-col>

              <v-col
                cols="12"
                class="py-2"
              />

              <v-col
                cols="12"
              >
                <div
                  :style="`min-height:250px;max-height:${$vuetify.breakpoint.smAndDown ? 370 : 620}px;overflow-y:scroll;`"
                >
                  <v-row
                    no-gutters
                  >
                    <v-col
                      v-for="(item, index) in getCacheRastreamentoUsuarioProductsCart()"
                      :key="`cart-product-${item.name}-${index}`"
                      cols="12"
                      style="border-radius:10px"
                    >
                      <card-cart
                        :name="item.name"
                        :qtd_product="item.price.qtd_product"
                        :product="item"
                        :price_total="item.price.total"
                        :complements="item.complements"
                        :differences="item.differences"
                      />
                    </v-col>
                  </v-row>
                </div>
              </v-col>

              <v-col
                cols="12"
                class="py-2"
              />

              <v-col
                cols="12"
              >
                <v-row
                  no-gutters
                >
                  <v-col
                    v-if="getActiveDiscount()"
                    cols="12"
                  >
                    <span
                      v-font-size="$vuetify.breakpoint.smAndDown ? 20 : 24"
                      class="font-weight-bold text-uppercase"
                    >
                      Valor final =>
                      <span
                        class="error--text text-decoration-line-through px-2"
                      >
                        {{ setTotalAmountProductsCart(getCacheRastreamentoUsuarioProductsCart()).total }}
                      </span>

                      {{ setTotalAmountProductsCart(getCacheRastreamentoUsuarioProductsCart()).totalWithDicount }}
                    </span>
                  </v-col>

                  <v-col
                    v-else
                    cols="12"
                  >
                    <span
                      v-font-size="$vuetify.breakpoint.smAndDown ? 20 : 24"
                      class="font-weight-bold text-uppercase"
                    >
                      Valor final => {{ setTotalAmountProductsCart(getCacheRastreamentoUsuarioProductsCart()).total }}
                    </span>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </div>
        </v-expand-transition>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
  import { Component } from "vue-property-decorator"
  import { mixins } from "vue-class-component"
  import { MixinFunctionsSystem } from "@/mixins/system/MixinFunctionsSystem"
  import { namespace } from "vuex-class"

  const cacheStore = namespace("cacheStoreModule")
  const payloadStore = namespace("payloadStoreModule")

  @Component({
    components: {
      CardCart: () => import(
        /* webpackChuckName: "card-cart-component" */
        /* webpackMode: "eager" */
        "@/components/cards/cart/CardCart.vue"
      ),
    }
  })

  export default class PainelFormComponent extends mixins(
    MixinFunctionsSystem,
  ) {
    @cacheStore.Getter("CacheRastreamentoUsuarioProductsCart") getCacheRastreamentoUsuarioProductsCart
    @payloadStore.Getter("PayloadOrder") declare getPayloadOrder

    expand = true

    getActiveDiscount (): boolean {
      return this.getPayloadOrder("pagamento").desconto.ativado
    }
  }
</script>
