<template>
  <v-container
    fluid
    class="pa-0"
  >
    <v-row
      no-gutters
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
            v-for="(item, index) in filterDataProduct(category)"
            :key="`slide-card-dishes-selected-${index}`"
            class="mr-5"
          >
            <div>
              <card-product
                :image="item.url_image"
                :name="item.name"
                :description="item.description"
                :differences="item.differences"
              />
            </div>
          </v-slide-item>
        </v-slide-group>
      </v-col>

      <v-col
        cols="12"
        class="hidden-md-and-up"
      >
        <v-carousel
          hide-delimiters
          class="fix-caroucel-cards"
          bottom
        >
          <v-carousel-item
            v-for="(item, index) in filterDataProduct(category)"
            :key="`caroucel-card-dishes-selected-${index}`"
          >
            <card-product
              :name="item.name"
              :description="item.description"
              :differences="item.differences"
            />
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from "vue-property-decorator"
  import { filterDataProduct } from "@/helpers/filterProducts"
  import "@/styles/components/layout/caroucel.styl"

  @Component({
    components: {
      CardProduct: () => import(
        /* webpackChuckName: "card-product-component" */
        /* webpackMode: "eager" */
        "@/components/cards/product/CardProduct.vue"
      )
    }
  })
  export default class ContentProduct extends Vue {
    @Prop({ default: "" }) category?: string

    filterDataProduct = filterDataProduct
  }
</script>
