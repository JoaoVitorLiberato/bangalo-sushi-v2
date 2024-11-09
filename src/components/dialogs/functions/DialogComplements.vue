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
                :max-width="$vuetify.breakpoint.smAndDown ? 310 : 360"
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
                  >
                    <span
                      class="font-weight-medium"
                    >
                      {{ item.name }}
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
                      {{ getReadingValue(item.price) }}
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
                      @click="item.qtd -= 1"
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
                      @click="item.qtd += 1"
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
          class="hidden-sm-and-down"
        >
          <v-card
            class="pa-4"
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
                  class="font-weight-bold text-uppercase"
                >
                  Complementos
                </span>
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
  }
</script>
