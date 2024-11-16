<template>
  <div>
    <v-btn
      color="secondary"
      fab
      large
      fixed
      right
      bottom
      title="Botão para abrir o carrinho de produtos"
      @click="drawerCartProducts = !drawerCartProducts"
    >
      <v-badge
        color="error"
        :content="getCacheRastreamentoUsuarioProductsCart().length || 0"
      >
        <v-icon
          color="#000"
        >
          shopping_cart
        </v-icon>
      </v-badge>
    </v-btn>
  </div>
</template>

<script lang="ts">
  import { Component } from "vue-property-decorator"
  import { mixins } from "vue-class-component"
  import { namespace } from "vuex-class"

  const cacheStore = namespace("cacheStoreModule")

  @Component({})
  export default class ButtonCartProduct extends mixins() {
    @cacheStore.Getter("CacheRastreamentoUsuarioProductsCart") getCacheRastreamentoUsuarioProductsCart
    @cacheStore.Getter("CacheDrawerCartProducts") getDrawerCartProducts
    @cacheStore.Action("ActionCacheDrawerCartProducts") setDrawerCartProducts

    get drawerCartProducts (): boolean {
      return this.getDrawerCartProducts()
    }

    set drawerCartProducts (value: boolean) {
      this.setDrawerCartProducts(value)
    }
  }
</script>