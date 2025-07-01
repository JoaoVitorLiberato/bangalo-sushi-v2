<template>
  <v-navigation-drawer
    v-model="drawerCartProducts"
    right
    temporary
    app
    :width="$vuetify.breakpoint.smAndDown ? '90%' : '450'"
    color="primary"
  >
    <v-card
      color="primary"
      style="color:var(--v-primary-text)"
    >
      <v-row
        no-gutters
      >
        <v-col
          cols="12"
          class="pa-4"
        >
          <span
            class="font-weight-bold text-uppercase"
          >
            Seus Produtos:
          </span>
        </v-col>

        <v-col
          v-if="getCacheRastreamentoUsuarioProductsCart().length > 0"
          cols="12"
          class="px-4"
          style="line-height: 1;"
        >
          <span
            v-font-size="13"
            class="font-weight-regular error--text"
          >
            <strong class="font-weight-bold text-uppercase">Atenção:</strong> Todos produtos que estão no carrinho de compras,
            pode remover caso tenha adicionado o produto por engano. Role para baixo para
            concluir seu pedido.
          </span>
        </v-col>

        <v-col
          cols="12"
          class="py-2"
        />

        <v-col
          cols="12"
          class="px-4"
        >
          <div
            v-if="getCacheRastreamentoUsuarioProductsCart().length <= 0"
            class="py-3 text-center"
          >
            <span
              class="grey--text font-weight-regular font-italic"
            >
              O carrinho está sem produtos
            </span>
          </div>

          <div
            v-else
            :style="`height:${$vuetify.breakpoint.smAndDown ? 430 : 617}px;overflow-y:scroll`"
          >
            <v-row
              no-gutters
            >
              <v-col
                v-for="(item, index) in getCacheRastreamentoUsuarioProductsCart()"
                :key="`cart-product-${item.name}-${index}`"
                cols="12"
                :style="String(getCacheRastreamentoUsuarioProductsCart()[getCacheRastreamentoUsuarioProductsCart().length - 1].id) === String(item.id )? 'margin-bottom:200px' : ''"
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
        >
          <v-row
            no-gutters
            align="center"
            :style="`position:${drawerCartProducts ? 'fixed':'relative'};bottom:5px;right:0;left:0;`"
            class="primary"
          >
            <v-col
              cols="12"
            >
              <v-divider
                color="white"
                class="mx-1"
              />
            </v-col>

            <v-col
              cols="12"
              class="py-1"
            />

            <v-col
              cols="6"
              class="px-2"
              style="line-height:24px"
            >
              <span
                v-font-size="14"
                class="font-weight-bold text-uppercase d-block"
              >
                total:
              </span>

            </v-col>

            <v-col
              cols="6"
              class="px-3"
            >
              <v-btn
                block
                :color="getCacheFrameLoading().status || getCacheRastreamentoUsuarioProductsCart().length === 0 ? 'grey lighten-1' : 'secondary'"
                large
                depressed
                rounded
                :disabled="getCacheRastreamentoUsuarioProductsCart().length === 0"
                @click.stop="signupProductCart()"
              >
                <span
                  v-font-size="14"
                  class="font-weight-bold black--text"
                >
                  {{ getCacheFrameLoading().status ? 'Aguarde...' : 'Concluir' }}
                </span>
              </v-btn>
            </v-col>

            <v-col
              cols="12"
              class="py-2"
            />

            <v-col
              cols="12"
              class="d-flex"
            >
              <v-img
                src="/favicon.png"
                alt="Bangalô Sushi Lounge - Seu sushi com qualidade, sabor e tradição"
                width="200"
                height="110"
                contain
              />
            </v-col>
          </v-row>
        </v-col>
        <overlay-message-off-system
          :open="messageOffSystem"
          @closeOverlay="() => (messageOffSystem = !messageOffSystem)"
        />
      </v-row>
    </v-card>
  </v-navigation-drawer>
</template>

<script lang="ts">
  import { Component } from "vue-property-decorator"
  import { mixins } from "vue-class-component"
  import { namespace } from "vuex-class"
  import { MixinFunctionsSystem } from "@/mixins/system/MixinFunctionsSystem"
  import { MixinServiceSystem } from "@/mixins/services/mixinServiceSystem"
  import { MixinRedirectLinks } from "@/mixins/redirect-links/MixinRedirectLinks"
  import { event } from "@/plugins/firebase"

  const cacheStore = namespace("cacheStoreModule")

  @Component({
    components: {
      CardCart: () => import(
        /* webpackChuckName: "card-cart-component" */
        /* webpackMode: "eager" */
        "@/components/cards/cart/CardCart.vue"
      ),
      OverlayMessageOffSystem: () => import(
        /* webpackChuckName: "message-launch-system-overlay-component" */
        /* webpackMode: "eager" */
        "@/components/overlay/MessageOffSystem.vue"
      )
    }
  })

  export default class drawerCartProducts extends mixins(
    MixinFunctionsSystem,
    MixinServiceSystem,
    MixinRedirectLinks,
  ) {
    @cacheStore.Getter("CacheRastreamentoUsuarioProductsCart") getCacheRastreamentoUsuarioProductsCart
    @cacheStore.Getter("CacheFrameLoading") declare getCacheFrameLoading
    @cacheStore.Getter("CacheDrawerCartProducts") getDrawerCartProducts
    @cacheStore.Action("ActionCacheDrawerCartProducts") setDrawerCartProducts

    messageOffSystem = false

    get drawerCartProducts (): boolean {
      return this.getDrawerCartProducts()
    }

    set drawerCartProducts (value: boolean) {
      this.setDrawerCartProducts(value)
    }

    signupProductCart (): void {
      this.getStoreTurnOn()
        .then((responseMixin) => {
          if (!responseMixin) throw Error("System Off")

          sessionStorage.setItem("order", JSON.stringify(this.getCacheRastreamentoUsuarioProductsCart()))
          event("add_to_cart", this.getCacheRastreamentoUsuarioProductsCart())
          this.goToDatailOrderForm()
        }).catch((error) => {
          window.log("signupProductCart", error)
          this.drawerCartProducts = false
          this.cacheFrameLoading.status = false
          this.messageOffSystem = true
        })
    }
  }
</script>
