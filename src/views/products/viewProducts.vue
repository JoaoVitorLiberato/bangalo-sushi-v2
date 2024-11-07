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
    </v-col>
  </v-row>
</template>

<script lang="ts">
  import { Component } from "vue-property-decorator"
  import { mixins } from "vue-class-component"
  import { MixinServiceProducts } from "@/mixins/services/mixinServiceProducts"
  import { filterDataProduct } from "@/helpers/filterProducts"
  import DATA_CATEGORIES_PRODUCTS from "@/data/products/category.json"

  @Component({
    components: {
      ContentProductCompenent: () => import(
        /* webpackChuckName: "content-products-layout-component" */
        /* webpackMode: "eager" */
        "@/components/layout/content/ProductsContent.vue"
      )
    }
  })

  export default class viewProducts extends mixins(
    MixinServiceProducts,
  ) {
    filterDataProduct = filterDataProduct

    get categories (): typeof DATA_CATEGORIES_PRODUCTS {
      return DATA_CATEGORIES_PRODUCTS
    }

    created (): void {
      this.getAllProducts()
    }
  }
</script>
