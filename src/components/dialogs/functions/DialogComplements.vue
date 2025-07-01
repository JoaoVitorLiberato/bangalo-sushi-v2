<template>
  <v-dialog
    v-model="setDialog"
    fullscreen
    persistent
  >
    <toolbar-component
      :disableButton="true"
    />

    <v-card
      style="border-radius:0"
    >
      <v-row
        no-gutters
      >
        <v-col
          cols="12"
          md="8"
          class="pa-4"
        >
          <v-row
            no-gutters
            justify-sm="center"
          >
            <v-col
              v-for="item in getCacheComplements()"
              :key="`card-complement-${item.id}`"
              class="shrink d-flex justify-center"
              cols="12"
              sm="5"
              md="5"
            >
              <v-card
                :width="$vuetify.breakpoint.smAndDown ? 310 : 360"
                class="ma-2"
                style="border:2px solid var(--v-secondary-base);border-radius:20px"
              >
                <v-row
                  no-gutters
                  justify="space-between"
                  align="center"
                  class="pa-2"
                >
                  <v-col
                    cols="12"
                    class="d-flex align-center justify-space-between"
                  >
                    <span
                      class="font-weight-medium"
                    >
                      {{ item.name }}
                    </span>

                    <span
                      v-font-size="14"
                      class="font-weight-bold text-uppercase green--text"
                    >
                      {{ getReadingPrice(item.price) }}
                    </span>
                  </v-col>

                  <v-col
                    cols="12"
                    class="py-1"
                  />

                  <v-col
                    cols="12"
                  >
                    <span
                      v-font-size="14"
                      class="font-weight-regular"
                    >
                      {{ item.description }}
                    </span>
                  </v-col>

                  <v-col
                    cols="12"
                    class="py-1"
                  />

                  <v-col
                    cols="4"
                    md="4"
                  >
                    <span
                      class="font-weight-medium text-uppercase"
                    >
                      {{ Number(item.qtd) > 2 ? getReadingPrice((Number(item.price) * Number(item.qtd - 2))) :  getReadingPrice(0)}}
                    </span>
                  </v-col>

                  <v-col
                    cols="6"
                    md="6"
                    class="d-flex align-center justify-space-around"
                  >
                    <v-btn
                      color="secondary"
                      depressed
                      small
                      style="width:30px;height:30px;border-radius:15px"
                      class="pa-0 ma-0"
                      :disabled="item.qtd === 0"
                      @click="() => (
                        item.qtd -= 1,
                        item.priceTotal = item.qtd <= 2 ?  0 : Number(item.price) * Number(item.qtd - 2),
                        setCartComplement(item)
                      )"
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
                      {{ item.qtd }}
                    </span>

                    <v-btn
                      color="secondary"
                      depressed
                      small
                      style="width:30px;height:30px;border-radius:15px"
                      class="pa-0 ma-0"
                      @click="() => (
                        item.qtd += 1,
                        item.priceTotal = item.qtd >= 3 ? Number(item.price) * Number(item.qtd - 2) : 0,
                        setCartComplement(item)
                      )"
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
              </v-card>
            </v-col>
          </v-row>
        </v-col>

        <v-col
          cols="12"
          class="hidden-md-and-up py-6"
        />

        <v-col
          cols="12"
          md="4"
        >
          <v-card
            class="hidden-sm-and-down pa-4"
            elevation="0"
            style="border-radius:0;height:100vh"
            color="#f2f2f2"
          >
            <v-row
              no-gutters
            >
              <v-col
                cols="12"
              >
                <span
                  v-font-size="18"
                  class="font-weight-medium text-uppercase"
                >
                  Complementos
                </span>
              </v-col>

              <v-col
                cols="12"
              >
                <v-row
                  no-gutters
                >
                  <v-col
                    v-for="complement in cartComplements"
                    v-show="cartComplements.length"
                    :key="`card-complement-${complement.id}`"
                    cols="12"
                    class="my-1"
                  >
                    <v-card
                      color="secondary"
                      class="pa-2"
                      elevation="0"
                      style="border-radius:15px"
                    >
                      <v-row
                        no-gutters
                      >
                        <v-col
                          cols="12"
                          class="d-flex align-center justify-space-between"
                        >
                          <span
                            class="font-weight-medium"
                            v-text="complement.name"
                          />

                          <div>
                            <v-btn
                              icon
                              color="error"
                              @click.stop="removeComplementCart(String(complement.id))"
                            >
                              <v-icon>
                                delete
                              </v-icon>
                            </v-btn>
                          </div>
                        </v-col>

                        <v-col
                          cols="12"
                          class="py-1"
                        />

                        <v-col
                          cols="12"
                          class="d-flex justify-space-between align-center"
                        >
                          <span
                            v-text="getReadingPrice(complement.priceTotal)"
                          />

                          <span
                            v-text="`Quantidade: ${complement.qtd}`"
                          />
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-col>

                  <v-col
                    v-if="cartComplements.length === 0"
                    cols="12"
                  >
                    <span>
                      Sem complementos adicionado no momento.
                    </span>
                  </v-col>

                  <v-col
                    cols="12"
                    style="position:relative"
                  >
                    <v-btn
                      :style="`position:fixed;bottom:0;right:0`"
                      depressed
                      large
                      color="secondary"
                      block
                      @click.stop="setCacheCartProduct()"
                    >
                      <span
                        v-font-size="16"
                        class="black--text font-weight-medium"
                      >
                        Adicionar ao carrinho
                      </span>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card>

          <v-footer
            :class="`hidden-md-and-up px-1 ${activePainel ? 'fix-active-painel-complements' : 'fix-desatived-painel-complements'}`"
            color="secondary"
            app
          >
            <v-row
              v-position.relative
              no-gutters
              style="width:100%"
            >
              <v-col
                cols="12"
              >
                <v-btn
                  block
                  text
                  x-large
                  max-width="100%"
                  class="d-flex align-center justify-space-between px-1"
                  @click="activePainel = !activePainel"
                >
                  <span
                    v-font-size="16"
                    class="font-weight-medium"
                  >
                    {{ activePainel ? "Fechar complementos" : "Ver complementos" }}
                  </span>

                  <v-icon
                    size="30"
                    :style="activePainel ? 'transform: rotate(0deg);' : 'transform: rotate(-180deg);'"
                  >
                    keyboard_arrow_down
                  </v-icon>
                </v-btn>
              </v-col>

              <v-col
                cols="12"
                class="py-2"
              />

              <v-col
                cols="12"
                class="px-2"
              >
                <v-row
                  v-if="cartComplements.length"
                  no-gutters
                >
                  <v-col
                    v-for="complement in cartComplements"
                    :key="`card-complement-${complement.id}`"
                    cols="12"
                    class="my-1"
                  >
                    <v-card
                      color="primary"
                      class="pa-2"
                      elevation="0"
                      max-width="450"
                      style="border-radius:15px"
                    >
                      <v-row
                        no-gutters
                      >
                        <v-col
                          cols="12"
                          class="d-flex align-center justify-space-between"
                        >
                          <span
                            class="font-weight-medium"
                            v-text="complement.name"
                          />

                          <div>
                            <v-btn
                              icon
                              color="error"
                              @click.stop="removeComplementCart(String(complement.id))"
                            >
                              <v-icon>
                                delete
                              </v-icon>
                            </v-btn>
                          </div>
                        </v-col>

                        <v-col
                          cols="12"
                          class="py-1"
                        />

                        <v-col
                          cols="12"
                          class="d-flex justify-space-between align-center"
                        >
                          <span
                            v-text="getReadingPrice(complement.priceTotal)"
                          />

                          <span
                            v-text="`Quantidade: ${complement.qtd}`"
                          />
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-col>
                </v-row>

                <span
                  v-else
                >
                  Sem complementos adicionado no momento.
                </span>
              </v-col>

              <v-col
                cols="12"
                class="py-2"
              />

              <v-col
                cols="12"
                style="position:relative"
              >
                <v-btn
                  :style="`position:${activePainel ? 'fixed': 'relative'};bottom:0;left:0;right:0`"
                  depressed
                  x-large
                  block
                  @click.stop="setCacheCartProduct()"
                >
                  <span
                    v-font-size="16"
                    class="font-weight-medium"
                  >
                    Adicionar ao carrinho
                  </span>
                </v-btn>
              </v-col>
            </v-row>
          </v-footer>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
  import { Component, ModelSync } from "vue-property-decorator"
  import { mixins } from "vue-class-component"
  import { namespace } from "vuex-class"
  import { MixinFunctionsSystem } from "@/mixins/system/MixinFunctionsSystem"
  import { IComplements } from "@/types/types-product"
  import { v4 as uuidv4 } from "uuid"
  import { event } from "@/plugins/firebase"
  import "@/styles/components/dialogs/functions/dialogComplements.styl"

  const cacheStore = namespace("cacheStoreModule")

  @Component({
    components: {
      ToolbarComponent: () => import(
        /* webpackChuckName: "layout-toolbar-component" */
        /* webpackMode: "eager" */
        "@/components/layout/ToolbarComponent.vue"
      ),
    }
  })

  export default class DialogComplements extends mixins(
    MixinFunctionsSystem,
  ) {
    @ModelSync("open", "closeDialog", { type: Boolean })
      setDialog!: boolean

    @cacheStore.Getter("CacheComplements") getCacheComplements
    @cacheStore.Getter("CacheRastreamentoUsuarioProductSelected") getCacheRastreamentoUsuarioProductSelected
    @cacheStore.Action("actionRastreamentoUsuarioProductCart") setRastreamentoUsuarioProductCart

    activePainel = false
    cartComplements: Array<IComplements> = []

    setCartComplement (complement: IComplements): void {
      if (Number(complement.qtd) === 0) {
        this.removeComplementCart(String(complement.id))
        return
      }

      const FILTER_CART_COMPLEMENT = this.cartComplements.filter((item) => {
        if (String(item.id || "") === String(complement.id || "")) {
          return item
        }
      })

      if (FILTER_CART_COMPLEMENT.length === 0) {
        this.cartComplements.push(complement)
      } else {
        const COMLEMENT_CART_UPDATE = this.cartComplements.filter((item) => {
          if (String(item.id || "") !== String(complement.id || "")) {
            return item
          }
        })

        this.cartComplements = [
          ...COMLEMENT_CART_UPDATE,
          complement
        ]
      }
    }

    removeComplementCart (id:string): void {
      const COMPLEMENT_CART_DELETED = this.cartComplements.filter((item) => {
        if (String(item.id || "") !== String(id || "")) return item
      })

      this.cartComplements = COMPLEMENT_CART_DELETED
    }

    totalAmountComplements (complements: IComplements[]): number {
      let totalAmount = 0

      complements.forEach((item) => {
        if ("priceTotal" in item) totalAmount += item.priceTotal as number
      })

      return totalAmount
    }

    setCacheCartProduct (): void {
      this.totalAmountComplements(this.cartComplements)
      const PRODUCT_CACHE = {
        ...this.getCacheRastreamentoUsuarioProductSelected(),
        cart_id: uuidv4(),
        complements: this.cartComplements,
        price: {
          ...this.getCacheRastreamentoUsuarioProductSelected().price,
          total_price_complements: this.totalAmountComplements(this.cartComplements),
          total: Number(this.getCacheRastreamentoUsuarioProductSelected().price.total) + Number(this.totalAmountComplements(this.cartComplements))
        }
      }

      try {
        event("set-product-cart", {
          ...PRODUCT_CACHE
        })

        this.setRastreamentoUsuarioProductCart({
          product: PRODUCT_CACHE,
          function: "add"
        })

        this.cartComplements = []
        this.activePainel = false
        this.setDialog = false
      } catch {
        event("error-product-cart")
      }
    }
  }
</script>
