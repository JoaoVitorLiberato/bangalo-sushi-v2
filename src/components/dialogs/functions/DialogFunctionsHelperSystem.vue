<template>
  <div>
    <slot
      name="redirectSegment"
    >
      <v-overlay
        :value="dialogFunctionHelperSystem"
        opacity="0.9"
      >
        <v-dialog
          v-model="dialogFunctionHelperSystem"
          width="350"
        >
          <v-card>
            <v-row
              no-gutters
            >
              <v-col
                cols="12"
                class="text-end"
              >
                <v-btn
                  icon
                  large
                  @click="dialogFunctionHelperSystem = !dialogFunctionHelperSystem"
                >
                  <v-icon>
                    close
                  </v-icon>
                </v-btn>
              </v-col>

              <v-col
                cols="12"
                class="px-4 pb-3"
              >
                <v-row
                  no-gutters
                >
                  <v-col
                    cols="12"
                  >
                    <v-radio-group
                      v-model="segmentSelected"
                    >
                      <v-row
                        no-gutters
                        justify="center"
                      >
                        <v-col
                          v-for="servico in ['delivery']"
                          :key="`input-radio-${servico}`"
                          cols="12"
                          class="pb-2"
                        >
                          <v-row
                            no-gutters
                            justify="start"
                            justify-md="start"
                          >
                            <v-col
                              cols="12"
                            >
                              <v-radio
                                :value="servico"
                                color="secondary"
                              >
                                <template
                                  #label
                                >
                                  <span
                                    v-font-size="18"
                                    class="font-weight-regular"
                                    style="color: var(--v-primary-text);"
                                    v-text="/delivery/i.test(String(servico)) ? 'Delivery (Entrega)' : 'Estabelecimento (Local)'"
                                  />
                                </template>
                              </v-radio>
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-radio-group>
                  </v-col>

                  <v-col
                    cols="12"
                  />

                  <v-col
                    cols="12"
                  >
                    <v-btn
                      color="secondary"
                      depressed
                      class="text-none"
                      block
                      rounded
                      @click="() => (
                        event(`click_button_popup_redirect_${segmentSelected}`),
                        returnProductRoute(segmentSelected)
                      )"
                    >
                      <span
                        class="font-weight-bold"
                        style="color:var(--v-primary-text)"
                      >
                        Proseguir
                      </span>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-dialog>
      </v-overlay>
    </slot>

    <slot
      name="tryAgain"
    >
      <v-overlay
        :value="dialogErrorTryAgain"
        opacity="1"
      >
        <v-dialog
          v-model="dialogErrorTryAgain"
          persistent
          width="400"
        >
          <v-card>
            <v-row
              no-gutters
            >
              <v-col
                cols="12"
                class="text-end"
              >
                <v-btn
                  icon
                  @click="dialogErrorTryAgain = false"
                >
                  <v-icon>
                    close
                  </v-icon>
                </v-btn>
              </v-col>

              <!-- <v-col
                cols="12"
                class="py-2"
              /> -->

              <v-col
                cols="12"
              >
                <v-row
                  no-gutters
                  class="px-4 pb-4"
                >
                  <v-col
                    cols="12"
                  >
                    <span
                      v-font-size="20"
                      class="font-weight-medium d-block"
                    >
                      Opss...
                    </span>

                    <span
                      class="font-weight-regular pt-2"
                    >
                      {{ getCacheFrameLoading().message }}
                    </span>
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
                      block
                      rounded
                      class="text-none"
                      @click.stop="goToHome()"
                    >
                      <span
                        class="black--text font-weight-medium"
                      >
                        Tentar novamente
                      </span>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-dialog>
      </v-overlay>
    </slot>
  </div>
</template>

<script lang="ts">
  import { Component } from "vue-property-decorator"
  import { mixins } from "vue-class-component"
  import { namespace } from "vuex-class"
  import { MixinRedirectLinks } from "@/mixins/redirect-links/MixinRedirectLinks"
  import { event } from "@/plugins/firebase"

  const dialogStore = namespace("dialogStoreModule")
  const cacheStore = namespace("cacheStoreModule")

  @Component({})
  export default class DialogFunctionsHelperSystem extends mixins(
    MixinRedirectLinks,
  ) {
    @dialogStore.Getter("getDialogFunctionHelperSystem") getDialogFunctionHelperSystem
    @dialogStore.Action("setDialogFunctionHelperSystem") setDialogFunctionHelperSystem
    @dialogStore.Getter("getDialogErrorTryAgain") getDialogErrorTryAgain
    @dialogStore.Action("setDialogErrorTryAgain") setDialogErrorTryAgain
    @cacheStore.Getter("CacheFrameLoading") getCacheFrameLoading

    event = event

    segmentSelected = "delivery"

    get dialogFunctionHelperSystem (): boolean {
      return this.getDialogFunctionHelperSystem()
    }

    set dialogFunctionHelperSystem  (value:boolean) {
      this.setDialogFunctionHelperSystem(value)
    }

    get dialogErrorTryAgain (): boolean {
      return this.getDialogErrorTryAgain()
    }

    set dialogErrorTryAgain (value:boolean) {
      this.setDialogErrorTryAgain(value)
    }
  }
</script>
