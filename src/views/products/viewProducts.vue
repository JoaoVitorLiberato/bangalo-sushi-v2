<template>
  <v-row
    no-gutters
  >
    <v-col
      cols="12"
    >
      <v-row
        v-for="({ id, name}) in categories"
        v-show="filterDataProduct(id).length > 0"
        :key="`content-category-${name}`"
        no-gutters
        class="pa-md-4 pa-2"
      >
        <v-col
          cols="12"
        >
          <span
            v-font-size="24"
            class="font-weight-bold text-uppercase"
          >
            {{ name }}
          </span>
        </v-col>

        <v-col
          cols="12"
          class="py-2"
        />

        <v-col
          cols="12"
        >
          <content-product-compenent
            :category="id"
          />
        </v-col>
      </v-row>

      <drawer-cart-products />
    </v-col>
  </v-row>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator"
  import { mixins } from "vue-class-component"
  import { namespace } from "vuex-class"
  import { MixinServiceProducts } from "@/mixins/services/mixinServiceProducts"
  import { filterDataProduct } from "@/helpers/filterProducts"
  import DATA_CATEGORIES_PRODUCTS from "@/data/products/category.json"
  import PAYLOAD_DATA from "@/data/payload/payloadDefault.json"

  const cacheStore = namespace("cacheStoreModule")

  @Component({
    components: {
      ContentProductCompenent: () => import(
        /* webpackChuckName: "content-products-layout-component" */
        /* webpackMode: "eager" */
        "@/components/layout/content/ProductsContent.vue"
      ),
      DrawerCartProducts: () => import(
        /* webpackChuckName: "drawer-cart-products-layout-component" */
        /* webpackMode: "eager" */
        "@/components/layout/drawers/DrawerCartProducts.vue"
      ),
    }
  })

  export default class viewProducts extends mixins(
    MixinServiceProducts,
  ) {
    @cacheStore.Getter("CacheRastreamentoUsuarioProductsCart") getCacheRastreamentoUsuarioProductsCart
    @cacheStore.Action("actionRastreamentoUsuarioProductCart") setRastreamentoUsuarioProductCart

    filterDataProduct = filterDataProduct

    get categories (): typeof DATA_CATEGORIES_PRODUCTS {
      return DATA_CATEGORIES_PRODUCTS
    }

    created (): void {
      if (!/^(products-view)$/i.test(String(this.$route.name || ""))) return

      if ("type" in this.$route.params) {
        if (!/local|delivery/i.test(this.$route.params.type as string)) {
          location.replace("/")
          return
        }

        sessionStorage.setItem("segment", this.$route.params.type as string)
        Vue.set(PAYLOAD_DATA, "segmento", this.$route.params.type as string)
      }

      const CACHE_CART_PRODUCT = sessionStorage.getItem("order")
      if (this.getCacheRastreamentoUsuarioProductsCart().length === 0) {
        if (CACHE_CART_PRODUCT) {
          this.setRastreamentoUsuarioProductCart(JSON.parse(CACHE_CART_PRODUCT))
        }
      }

      this.getAllProducts()
    }
  }
</script>
