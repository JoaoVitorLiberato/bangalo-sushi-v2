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
        class="py-6"
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
              justify="space-around"
            >
              <v-col
                cols="12"
                md="5"
                order="2"
                order-md="1"
                class="mt-4 mt-md-0"
              >
                <v-row
                  no-gutters
                >
                  <v-col
                    v-for="(product) in productDataApperStart"
                    :key="`product-name-${product.id}`"
                    v-border="`1px solid ${String(productID) === String(product.id) ? 'var(--v-secondary-base)' : '#f2f2f2'}`"
                    v-border.radius="'5px'"
                    cols="12"
                    class="my-2"
                  >
                    <v-card
                      :color="String(productID) === String(product.id) ? '#f2f2f2' : '#fff'"
                      elevation="0"
                      class="pa-4"
                      @click="productID = product.id, productSelected = product"
                    >
                      <v-row
                        no-gutters
                        justify="space-between"
                      >
                        <v-col
                          cols="10"
                        >
                          <span
                            class="font-weight-medium text-uppercase"
                            v-text="product.name"
                          />
                        </v-col>

                        <v-col
                          cols="1"
                          class="d-flex align-center justify-end"
                        >
                          <v-avatar
                            :color="String(productID) === String(product.id) ? 'var(--v-secondary-base)' : '#f2f2f2'"
                            size="14"
                          />
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-col>
                </v-row>
              </v-col>

              <v-col
                v-border="'1px solid var(--v-secondary-base)'"
                v-border.radius="'2px'"
                cols="12"
                md="5"
                order="1"
                order-md="2"
              >
                <v-row
                  v-if="productSelected"
                  class="pa-2"
                  justify="space-between"
                >
                  <v-col
                    cols="12"
                    md="6"
                    class="shrink"
                  >
                    <v-row
                      no-gutters
                    >
                      <v-col
                        cols="12"
                        :class="$vuetify.breakpoint.smAndDown ? 'text-center' : ''"
                      >
                        <span
                          v-font-size="$vuetify.breakpoint.smAndDown ? 14 : 10"
                          class="text-uppercase font-weight-bold"
                          v-text="productSelected.name"
                        />
                      </v-col>

                      <v-col
                        cols="12"
                        class="py-2"
                      />

                      <v-col
                        cols="12"
                        :class="$vuetify.breakpoint.smAndDown ? 'd-flex' : 'hidden-md-and-up'"
                      >
                        <v-img
                          :src="productSelected.url_image"
                          :alt="`Conheça nosso ${productSelected.name}`"
                          :title="`Conheça nosso ${productSelected.name}`"
                          width="200"
                          height="205"
                        />
                      </v-col>

                      <v-col
                        cols="12"
                        :class="$vuetify.breakpoint.smAndDown ? 'py-2' : 'hidden-md-and-up'"
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
                          :block="$vuetify.breakpoint.smAndDown"
                        >
                          <span
                            class="black--text"
                          >
                            Quero Conhecer
                          </span>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-col>

                  <v-col
                    class="hidden-sm-and-down shrink"
                  >
                    <v-img
                      :src="productSelected.url_image"
                      :alt="`Conheça nosso ${productSelected.name}`"
                      :title="`Conheça nosso ${productSelected.name}`"
                      width="200"
                      height="205"
                    />
                  </v-col>
                </v-row>
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

    productID = ""
    productSelected: IproductData = {} as IproductData

    get productDataApperStart (): IproductData[]|string {
      const PRODUCT_FILTER = (filterDataProduct() as IproductData[]).filter((productIndividual) => {
        return productIndividual.apper_start === true
      })

      if (PRODUCT_FILTER.length <= 0) {
        return (filterDataProduct() as IproductData[]).slice(0, 2)
      }

      this.productID = String(PRODUCT_FILTER[0].id)
      this.productSelected = PRODUCT_FILTER[0]
      return PRODUCT_FILTER
    }

    created (): void {
      this.getAllProducts()
        .then((responseMixin) => {
          if (responseMixin) {
            sessionStorage.setItem("products", JSON.stringify(responseMixin))
          }
        })
    }
  }
</script>
