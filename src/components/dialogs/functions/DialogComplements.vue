<template>
  <v-dialog
    v-model="open"
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
                      {{ getReadingValue(item.price) }}
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
                      {{ Number(item.qtd) !== 0 ? getReadingValue(Number(item.price) * Number(item.qtd)) :  getReadingValue(0)}}
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
                        item.priceTotal = Number(item.price) * Number(item.qtd),
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
                        item.priceTotal = Number(item.price) * Number(item.qtd),
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
                class="py-2"
              />

              <v-col
                cols="12"
              >
                <v-row
                  no-gutters
                >
                  <v-col
                    v-for="complement in cartComplements"
                  :key="`card-complement-${complement.id}`"
                    cols="12"
                    class="my-1"
                  >
                    <v-card
                      color="secondary"
                      class="pa-2"
                      elevation="0"
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
                            v-text="getReadingValue(complement.priceTotal)"
                          />

                          <span
                            v-text="`Quantidade: ${complement.qtd}`"
                          />
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
  import { Component, Prop } from "vue-property-decorator"
  import { mixins } from "vue-class-component"
  import { namespace } from "vuex-class"
  import { MixinFunctionsSystem } from "@/mixins/system/MixinFunctionsSystem"
  import { IComplements } from "@/types/types-product"
  // import { event } from "@/plugins/firebase"

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
    @Prop({ default: false }) open!: boolean

    @cacheStore.Getter("CacheComplements") getCacheComplements

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
  }
</script>
