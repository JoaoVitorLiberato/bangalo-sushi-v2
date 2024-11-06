<template>
  <v-card
    v-border.radius="'0px'"
    elevation="0"
  >
    <v-row
      no-gutters
      class="px-4 py-8"
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
        class="py-4 py-md-8"
      />

      <v-col
        v-width="'100%'"
        v-width.max="'1100px'"
        cols="12"
        class="mx-auto"
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
            cols="12"
          >
            <v-row
              no-gutters
              justify="center"
            >
              <v-col
                cols="12"
                md="5"
                class="mt-4 mt-md-0"
              >
                <v-row
                  no-gutters
                >
                  <v-col
                    cols="12"
                  >
                    <v-autocomplete
                      v-model="category"
                      :items="categories"
                      outlined
                      auto-select-first
                      hide-details
                      style="color:#000"
                      color="secondary"
                      item-text="name"
                      item-value="id"
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    class="py-2"
                  />

                  <v-col
                    v-if="productsList.length"
                    cols="12"
                  >
                    <v-autocomplete
                      :items="productsList"
                      outlined
                      auto-select-first
                      hide-details
                      style="color:#000"
                      color="secondary"
                      item-text="name"
                      item-value="id"
                      @change="changeProductDataList"
                    />
                  </v-col>
                </v-row>
              </v-col>

              <v-col
                cols="12"
                md="2"
                lg="2"
                class="py-3 my-4"
              />

              <v-col
                v-if="productSelected"
                cols="12"
                md="3"
                class="d-flex justify-center"
              >
                <v-card
                  v-border="'1px solid var(--v-secondary-base)'"
                  v-position.relative
                  v-border.radius="'15px'"
                  elevation="0"
                  max-width="300"
                >
                  <div
                    class="secondary px-2 py-1 text-center"
                    style="width:100%;max-width:150px;position:absolute;top:-27px;right:0"
                  >
                    <span
                      v-font-size="12"
                      class="text-uppercase font-weight-bold"
                      v-text="productSelected.category"
                    />
                  </div>

                  <v-img
                    :src="productSelected.url_image"
                    :alt="`Conheça nosso ${productSelected.name}`"
                    :title="`Conheça nosso ${productSelected.name}`"
                    style="border-radius: 15px 15px 0px 0"
                    width="100%"
                    height="190"
                  />

                  <v-row
                    v-if="productSelected.id"
                    no-gutters
                    justify="space-between"
                    class="px-2 pt-3 pb-2"
                  >
                    <v-col
                      cols="12"
                      style="line-height:15px"
                    >
                      <span
                        v-font-size="15"
                        class="font-weight-medium text-uppercase"
                        v-text="productSelected.name"
                      />
                    </v-col>

                    <v-col
                      cols="12"
                      class="py-2"
                    />

                    <v-col
                      cols="12"
                      style="line-height:15px"
                    >
                      <span
                        v-font-size="14"
                        class="font-weight-normal"
                        v-text="productSelected.description"
                      />
                    </v-col>

                    <v-col
                      cols="12"
                      class="py-2"
                    />

                    <v-col
                      cols="12"
                    >
                      <v-btn
                        color="secondary"
                        depressed
                        class="text-none"
                        style="border-radius:15px"
                        block
                        large
                        @click="setDialogFunctionHelperSystem(true)"
                      >
                        <span
                          v-font-size="16"
                          class="black--text font-weight-medium"
                        >
                          Conhecer produtos
                        </span>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card>
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
  import CATEGORIES_DATA from "@/data/products/category.json"

  const cacheStore = namespace("cacheStoreModule")
  const dialogStore = namespace("dialogStoreModule")

  @Component({
    components: {}
  })

  export default class viewDishes extends mixins(
    MixinServiceProducts,
  ) {
    @cacheStore.Getter("CacheFrameLoading") declare getCacheFrameLoading
    @dialogStore.Getter("getDialogFunctionHelperSystem") getDialogFunctionHelperSystem
    @dialogStore.Action("setDialogFunctionHelperSystem") setDialogFunctionHelperSystem

    filterDataProduct = filterDataProduct

    category = ""
    productSelected: IproductData = {} as IproductData

    get categories (): typeof CATEGORIES_DATA {
      return CATEGORIES_DATA
    }

    get productsList (): IproductData[] {
      if (!this.category || !filterDataProduct(this.category)) return []
      return filterDataProduct(this.category) as IproductData[]
    }

    changeProductDataList (value: IproductData): void {
      this.productSelected = this.productsList.find((product) => {
        if (String(product.id || "") === String(value || "")) return product
      }) || {} as IproductData
    }

    created (): void {
      this.getAllProducts()
        .then((responseMixin) => {
          if (responseMixin && filterDataProduct()) {
            this.category = this.categories[0].id
            this.productSelected = filterDataProduct(this.category)[0] as IproductData
          }
        })
    }
  }
</script>
