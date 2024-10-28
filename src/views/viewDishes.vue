<template>
  <v-card
    v-border.radius="'0px'"
    elevation="0"
  >
    <v-row
      id="tetse"
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
          v-if="getCacheFrameLoading().status"
          min-height="400"
          max-width="1100"
          class="mx-auto"
          type="card, paragraph, sentences"
        />

        <v-row
          v-else
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
            <v-row
              no-gutters
            >
              <v-col
                cols="12"
                md="5"
              >
                teste
              </v-col>

              <v-col
                cols="12"
                md="5"
              >
                teste
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
  import { Component } from "vue-property-decorator"
  import { mixins } from "vue-class-component"
  import { namespace } from "vuex-class"
  import { filterDataProduct } from "@/helpers/filterProducts"
  import { IproductData } from "@/types/types-product"
  import { MixinServiceProducts } from "@/mixins/services/mixinServiceProducts"

  const cacheStore = namespace("cacheStoreModule")

  @Component({
    components: {}
  })

  export default class viewDishes extends mixins(
    MixinServiceProducts,
  ) {
    @cacheStore.Getter("CacheFrameLoading") getCacheFrameLoading

    filterDataProduct = filterDataProduct

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
          if (responseMixin) {
            sessionStorage.setItem("products", JSON.stringify(responseMixin))
          }
        })
      
      // console.log("tetste", this.productDataApperStart)
    }
  }
</script>
