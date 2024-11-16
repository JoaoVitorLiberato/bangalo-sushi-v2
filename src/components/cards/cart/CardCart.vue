<template>
  <v-card
    elevation="0"
    :color="'primary'"
    class="my-2"
    :title="`Deguste nosso ${name} e maravilhe-se com a autêntica culinária japonesa por apenas ${getReadingValue(product.price.default)}.`"
  >
    <v-row
      no-gutters
      style="border:1px solid var(--v-secondary-base)"
      class="pa-2"
    >
      <v-col
        cols="12"
        class="d-flex align-center justify-space-between"
      >
        <span
          v-font-size="$vuetify.breakpoint.smAndDown ? 13 : 16"
          :class="`font-weight-${routeForm(['admin-view']) ? 'bold' : 'medium'} pr-2 text-uppercase`"
          :style="'color:var(--v-primary-text)'"
          v-text="name"
        />
        <div
          class="secondary px-2"
          style="border-radius: 10px;"
        >
          <span
            v-font-size="12"
            class="font-weight-bold text-uppercase black--text"
            v-text="setTypeDifferences(differences)"
          />
        </div>
      </v-col>

      <v-col
        cols="12"
        class="py-1"
      />

      <v-col
        cols="12"
      >
        <span
          v-font-size="$vuetify.breakpoint.smAndDown ? 16 : 18"
          class="font-weight-medium pr-2 text-uppercase"
          :style="'color:var(--v-primary-text)'"
          v-text="getReadingValue(Number(price_total))"
        />
      </v-col>

      <v-col
        cols="12"
        class="py-1"
      />

      <v-col
        cols="12"
      >
        <v-row
          no-gutters
        >
          <v-col
            cols="8"
            class="d-flex align-center"
          >
            <v-btn
              color="grey lighten-2"
              fab
              dense
              depressed
              style="width:20px;height:20px"
            >
              <v-icon
                color="#000"
              >
                remove
              </v-icon>
            </v-btn>

            <span
              v-font-size="20"
              class="font-weight-bold mx-3"
              :style="'color:var(--v-primary-text)'"
            >
              {{ qtd_product }}
            </span>

            <v-btn
              color="grey lighten-2"
              fab
              dense
              depressed
              style="width:20px;height:20px"
            >
              <v-icon
                color="#000"
              >
                add
              </v-icon>
            </v-btn>
          </v-col>
          <v-col
            v-if="!routeForm(['form-view', 'order-view', 'admin-view'])"
            cols="4"
            class="text-end"
            @click="removeProductCart(product.cart_id)"
          >
            <v-btn
              text
              color="error"
              :title="`Remover nosso produto ${name} do carrinho`"
            >
              <v-icon>
                delete
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>

      <v-col
        cols="12"
        class="py-1"
      />

      <v-col
        cols="12"
      >
        <v-btn
          text
          color="secondary"
          block
          class="d-flex justify-space-between"
          @click.stop="() => open = !open"
        >
          <span
            v-font-size="13"
            class="font-weight-bold"
          >
            Ver detalhes
          </span>
          <v-icon
            size="22"
            :style="open ? 'transform: rotate(180deg)' : 'transform: rotate(0deg)'"
          >
            expand_more
          </v-icon>
        </v-btn>
      </v-col>

      <v-col
        cols="12"
      >
        <v-expand-transition>
          <div
            v-show="open"
          >
            <v-row
              no-gutters
              style="color: var(--v-primary-text)"
            >
              <v-col
                cols="12"
                class="px-4 py-1 d-flex align-center justify-space-between"
              >
                <div>
                  <span
                    v-font-size="12"
                    class="font-weight-medium mr-1 text-uppercase"
                    :style="'color:var(--v-primary-text)'"
                  >
                    {{ name }}
                  </span>
                  <span
                    v-font-size="12"
                    class="font-weight-regular"
                    :style="'color:var(--v-primary-text)'"
                    v-text="`( x${qtd_product} )`"
                  />
                </div>
                  <span
                    v-font-size="12"
                    :style=" 'color:var(--v-primary-text)'"
                    v-text="`R$ ${setPriceProductCard(product, qtd_product).priceFormated}`"
                  />
              </v-col>

              <v-col
                v-for="(item, i) in complements"
                :key="`complement-card-${i}`"
                cols="12"
                class="px-4 py-1 d-flex align-center justify-space-between"
                :style="'color:var(--v-primary-text)'"
              >
                <div>
                  <span
                    v-font-size="12"
                    class="font-weight-medium mr-1 text-uppercase"
                  >
                    {{ item.name }}
                  </span>
                  <span
                    v-font-size="12"
                    class="font-weight-regular"
                    v-text="`( x${item.qtd} )`"
                  />
                </div>
                  <span
                    v-font-size="12"
                    v-text="getReadingValue(Number(item.priceTotal))"
                  />
              </v-col>
            </v-row>
          </div>
        </v-expand-transition>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
  import { Component, Prop } from "vue-property-decorator"
  import { mixins } from "vue-class-component"
  import { namespace } from "vuex-class"
  import { IComplements, IDifferences, IproductData } from "@/types/types-product"
  import { MixinFunctionsSystem } from "@/mixins/system/MixinFunctionsSystem"

  const cacheStore = namespace("cacheStoreModule")

  @Component({})
  export default class CardCart extends mixins(
    MixinFunctionsSystem,
  ) {
    @Prop({ default: "" }) name?:string
    @Prop({ default: "" }) qtd_product?:number|string
    @Prop({ default: "" }) price_total?:number|string
    @Prop({ default: [] }) complements?: IComplements[]
    @Prop({ default: {} }) differences?: IDifferences
    @Prop({ default: {} }) product!:IproductData

    @cacheStore.Action("actionRastreamentoUsuarioRemoveProductCart") setRastreamentoUsuarioRemoveProductCart
    @cacheStore.Getter("CacheRastreamentoUsuarioProductsCart") getCacheRastreamentoUsuarioProductsCart

    open = false

    routeForm (routeName: string[]): boolean {
      return routeName.includes(String(this.$route.name || "").toLowerCase())
    }

    removeProductCart (id:string): void {
      const PRODUCTS_NOT_REMOVED = this.getCacheRastreamentoUsuarioProductsCart()
        .filter((product) => {
          if (String(product.cart_id || "") !== String(id || "")) return product
        })

      this.setRastreamentoUsuarioRemoveProductCart(PRODUCTS_NOT_REMOVED)
    }
  }
</script>
