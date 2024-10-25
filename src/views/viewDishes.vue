<template>
  <v-card
    v-border.radius="'0px'"
    elevation="0"
  >
    <v-row
      no-gutters
      class="pa-4"
    >
      <v-col
        cols="12"
        class="mt-5 text-center"
        style="line-height: 1"
      >
        <h2
          v-font-size="$vuetify.breakpoint.smAndDown ? 19 : 27"
          class="font-weight-bold text-uppercase"
        >
          Confira Alguns dos nossos pratos
        </h2>
      </v-col>

      <v-col
        cols="12"
        class="py-4"
      />

      <v-col
        cols="12"
      >
        <v-skeleton-loader
          min-height="400"
          max-width="1100"
          class="mx-auto"
          loading-text="carregando"
          type="card, paragraph, sentences"
        />

        <v-row
          no-gutters
        >
          <v-col
            v-if="/error/i.test(String(filterDataProduct()))"
            cols="12"
          >
            Error
          </v-col>

          <v-col
            v-else
            cols="12"
          >
            produtos
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
  import { Component } from "vue-property-decorator"
  import { mixins } from "vue-class-component"
  import { filterDataProduct } from "@/helpers/filterProducts"
  import { IproductData } from "@/types/types-product"
  import { MixinServiceProducts } from "@/mixins/services/mixinServiceProducts"
  // import { namespace } from "vuex-class"

  // const cacheStore = namespace("cacheStoreModule")
  // const dialogStore = namespace("dialogStoreModule")

  @Component({
    components: {}
  })

  export default class viewDishes extends mixins(
    MixinServiceProducts,
  ) {
    // @dialogStore.Getter("DialogServiceClient") getDialogServiceClient
    // @dialogStore.Action("ActionDialogServiceClient") setDialogSeviceClient
    // @cacheStore.Getter("CacheLoading") getCacheLoading

    filterDataProduct = filterDataProduct

    // get cacheLoading (): {
    //   status: boolean,
    //   msg: string
    // }  {
    //   return this.getCacheLoading()
    // }

    // get dialogServiceClient (): boolean {
    //   return this.getDialogServiceClient()
    // }

    // set dialogServiceClient (value: boolean) {
    //   this.setDialogSeviceClient(value)
    // }

    get productDataApperStart (): IproductData[]|string {
      const PRODUCT_FILTER = (filterDataProduct() as IproductData[]).filter((productIndividual) => {
        return productIndividual.apper_start === true
      })

      if (PRODUCT_FILTER.length <= 0) {
        return (filterDataProduct() as IproductData[]).slice(0, 2)
      }

      return PRODUCT_FILTER
    }

    created (): void {
      this.getAllProducts()
        .then((responseMixin) => {
          if (responseMixin) sessionStorage.setItem("products", JSON.stringify(responseMixin))
        })
    }

    // getDialogSegmentProducts (): void {
    //   this.dialogServiceClient = !this.dialogServiceClient
    // }
  }
</script>
