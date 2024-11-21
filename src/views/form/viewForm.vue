<template>
  <div>
    <v-row
      no-gutters
      class="pa-4"
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
    </v-row>
  </div>
</template>

<script lang="ts">
  import { Component } from "vue-property-decorator"
  import { mixins } from "vue-class-component"
  import { namespace } from "vuex-class"

  const cacheStore = namespace("cacheStoreModule")

  @Component({})
  export default class viewForm extends mixins() {
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

            vm.setRastreamentoUsuarioProductCart({
              product: JSON.parse(CACHE_CART_PRODUCT),
              function: "add"
            })
          }
        } catch {
          console.log("error")
        }
      })
    }

    @cacheStore.Getter("CacheRastreamentoUsuarioProductsCart") getCacheRastreamentoUsuarioProductsCart
    @cacheStore.Action("actionRastreamentoUsuarioProductCart") setRastreamentoUsuarioProductCart
  }
</script>
