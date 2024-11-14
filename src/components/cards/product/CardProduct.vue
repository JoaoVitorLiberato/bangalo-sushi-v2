<template>
  <v-card
    v-border="'1px solid var(--v-secondary-base)'"
    v-position.relative
    v-border.radius="'15px'"
    v-z-index="2"
    elevation="0"
    max-width="300"
  >
    <div
      class="secondary px-2 py-1 text-center"
      style="width:100%;max-width:150px;position:absolute;top:-27px;right:0;"
    >
      <span
        v-font-size="14"
        class="text-uppercase font-weight-bold"
        v-text="setTypeDifferences(differences)"
      />
    </div>

    <v-img
      :src="image"
      :alt="`Conheça nosso`"
      :title="`Conheça nosso`"
      style="border-radius: 15px 15px 0px 0"
      width="100%"
      height="190"
    />

    <v-row
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
          v-text="name"
        />
      </v-col>

      <v-col
        cols="12"
        class="py-2"
      />

      <v-col
        cols="12"
        style="line-height:15px;min-height:50px;max-height:70px;overflowY:scroll;"
      >
        <span
          v-font-size="14"
          class="font-weight-normal"
          v-text="description"
        />
      </v-col>

      <v-col
        cols="12"
        class="py-2"
      />

      <v-col
        cols="12"
      >
        <v-divider
          color="#fcb900"
        />
      </v-col>

      <v-col
        v-if="differences"
        cols="12"
        class="my-2"
      >
        <v-checkbox
          v-if="differences.flambed && /actived/i.test(String(differences.flambed.input))"
          v-model="differences.flambed.active"
          :readonly="differences.flambed.readonly"
          color="secondary"
          hide-details
          class="pa-0 ma-0"
        >
          <template v-slot:label>
            <span
              v-font-size="16"
              class="black--text font-weight-normal"
            >
              {{ differences.flambed.active ? 'O produto será flambado' : 'Desejo flambar o produto' }}
            </span>
          </template>
        </v-checkbox>

        <v-checkbox
          v-else-if="differences.breaded && /actived/i.test(String(differences.breaded.input))"
          v-model="differences.breaded.active"
          :readonly="differences.breaded.readonly"
          color="secondary"
          hide-details
          class="pa-0 ma-0"
        >
          <template v-slot:label>
            <span
              v-font-size="16"
              class="black--text font-weight-normal"
            >
              {{ differences.breaded.active ? 'O produto será empanado' : 'Desejo empanar o produto' }}
            </span>
          </template>
        </v-checkbox>

        <v-checkbox
          v-else-if="differences.especial && /actived/i.test(String(differences.especial.input))"
          v-model="differences.especial.active"
          :readonly="differences.especial.readonly"
          color="secondary"
          hide-details
          class="pa-0 ma-0"
        >
          <template v-slot:label>
            <span
              v-font-size="16"
              class="black--text font-weight-normal"
            >
              {{ differences.especial.active ? 'O produto será especial' : 'Desejo o produto especial' }}
            </span>
          </template>
        </v-checkbox>

        <div
          v-else
        >
          <v-icon>
            check
          </v-icon>

          <span
            v-font-size="16"
            class="black--text font-weight-normal"
          >
            Produto totalmente narutal
          </span>
        </div>
      </v-col>

      <v-col
        cols="12"
      >
        <v-divider
          color="#fcb900"
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
          justify="space-between"
          align="center"
        >
          <v-col
            cols="5"
          >
            <v-row
              no-gutters
              style="line-height:1"
            >
              <v-col
                cols="12"
              >
                <span
                  v-font-size="12"
                  class="font-weight-medium text-uppercase"
                >
                  Por apenas
                </span>
              </v-col>

              <v-col
                cols="12"
                class="d-flex"
              >
                <span
                  v-font-size="24"
                  class="font-weight-medium pr-1"
                >
                  R$
                </span>

                <span
                  v-font-size="24"
                  class="font-weight-medium"
                >
                  {{ setPriceProductCard(product, productAmount).priceFormated }}
                </span>
              </v-col>
            </v-row>
          </v-col>

          <v-col
            cols="6"
            class="d-flex align-center justify-space-between"
          >
            <v-btn
              color="secondary"
              depressed
              small
              style="width:30px;height:30px;border-radius:15px"
              class="pa-0 ma-0"
              :disabled="productAmount <= 1"
              @click="productAmount -= 1"
            >
              <v-icon
                color="#000"
                size="16"
              >
                remove
              </v-icon>
            </v-btn>

            <span
              class="font-weight-bold mx-2"
            >
              {{ productAmount }}
            </span>

            <v-btn
              color="secondary"
              depressed
              small
              style="width:30px;height:30px;border-radius:15px"
              class="pa-0 ma-0"
              @click="productAmount += 1"
            >
              <v-icon
                color="#000"
                size="16"
              >
                add
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
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
          class="text-none d-flex align-center"
          style="border-radius:15px"
          block
          large
          @click="changeProductWithAmount(product)"
        >
          <span
            v-font-size="16"
            class="black--text font-weight-medium text-uppercase"
          >
            Comprar
          </span>

          <v-icon
            color="#000"
          >
            shopping_cart
          </v-icon>
        </v-btn>

        <dialog-complements
          :open="dialogComplements"
          @closeDialog="v=>dialogComplements=v"
        />
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
  import { Component, Prop, Watch } from "vue-property-decorator"
  import { mixins } from "vue-class-component"
  import { namespace } from "vuex-class"
  import { MixinFunctionsSystem } from "@/mixins/system/MixinFunctionsSystem"
  import { IDifferences, IproductData } from "@/types/types-product"
  import { MixinServiceProducts } from "@/mixins/services/mixinServiceProducts"
  import { MixinServiceComplements } from "@/mixins/services/mixinServiceComplements"
  import { event } from "@/plugins/firebase"

  const cacheStore = namespace("cacheStoreModule")

  @Component({
    components: {
      DialogComplements: () => import(
        /* webpackChuckName: "dialog-complements-component" */
        /* webpackMode: "eager" */
        "@/components/dialogs/functions/DialogComplements.vue"
      )
    }
  })

  export default class CardProduct extends mixins(
    MixinFunctionsSystem,
    MixinServiceComplements,
    MixinServiceProducts,
  ) {
    @Prop({ default: "" }) image!: string
    @Prop({ default: "" }) name!: string
    @Prop({ default: "" }) description!: string
    @Prop({}) differences!: IDifferences
    @Prop({}) product!: IproductData

    @cacheStore.Action("actionRastreamentoUsuarioProductSelected") setRastreamentoUsuarioProductSelected
    @cacheStore.Action("actionCacheComplements") setCacheComplements

    productAmount = 1
    dialogComplements = false

    @Watch("dialogComplements")
      changeStatusDialog (value:boolean): void {
        if (value === false) {
          this.getAllProducts()
        }
      }

    changeProductWithAmount (product:IproductData): void {
      event("click_button_card_product")

      const PRODUCT_DATA = {
        ...product,
        price: {
          ...product.price,
          qtd_product: this.productAmount,
          total: Number(this.setPriceProductCard(this.product, this.productAmount).priceCalculed)
        }
      }

      this.setRastreamentoUsuarioProductSelected(PRODUCT_DATA)

      this.getAllComplements()
        .then((responseMixin) => {
          this.setCacheComplements(responseMixin)
          this.dialogComplements = true
        })
    }
  }
</script>
