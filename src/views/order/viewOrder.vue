<template>
  <div
    style="height:80vh"
    class="d-flex align-center pa-4"
  >
    <div
      style="max-width:300px;border-radius:10px;"
      class="mx-auto px-3 py-4 grey lighten-4"
    >
      <v-row
        no-gutters
      >
        <v-col
          cols="12"
          class="text-center"
        >
          <h2
            v-font-size="18"
            class="text-uppercase font-weight-bold"
          >
            Pedido
          </h2>
        </v-col>

        <v-col
          cols="12"
          style="line-height:16px"
          class="text-center"
        >
          <span
            v-font-size="13"
            class="font-weight-regular"
          >
            Prezado cliente, Para seu pedido ser encontrado, por favor, informe o número de telefone
            utlizado na ao realizar sua compra.
          </span>
        </v-col>

        <v-col
          cols="12"
          class="py-2"
        />

        <v-col
          cols="12"
        >
          <v-form
            v-model="formValidate"
            ref="formValidateSearchOrder"
          >
            <v-row
              no-gutters
            >
              <v-col
                cols="12"
              >
                <v-text-field
                  v-mask="'(##) #####-####'"
                  v-model="numberPhone.value"
                  :rules="[required, numberPhone.valid]"
                  label="Nº do telefone"
                  type="tel"
                  placeholder="(99) 99999-9999"
                  autocomplete="no"
                  hide-details="auto"
                  outlined
                  color="secondary"
                  dense
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
                  :color="!validateForm || cacheFrameLoading.status ? 'grey lighten-2' : 'secondary'"
                  depressed
                  rounded
                  block
                  @click.stop="validateForm ? searchOrder() : activeValidate()"
                >
                  <span
                    class="font-weight-bold black--text"
                  >
                    {{ cacheFrameLoading.status ? "Aguarde..." : "Ver pedido" }}
                  </span>
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-col>
      </v-row>

      <v-dialog
        ref="dialogGetOrders"
        persistent
        fullscreen
      >
        <v-card>
          <v-row
            no-gutters
            class="pa-2"
          >
            <v-col
              cols="12"
              class="text-end"
            >
              <v-btn
                icon
                large
                @click.stop="closeDialogGetOrders()"
              >
                <v-icon>
                  close
                </v-icon>
              </v-btn>
            </v-col>

            <v-col
              cols="12"
            >
              <v-img
                src="/favicon.png"
                alt="Bangalô Sushi Lounge - Qualidade, Sabor e Tradição"
                contain
                height="150"
              />
            </v-col>

            <v-col
              cols="12"
              class="text-center pa-1"
              style="line-height:1"
            >
              <span
                v-font-size="$vuetify.breakpoint.smAndDown ? 13 : 16"
                class="font-weight-regular error--text"
              >
                Prezado cliente, Caso você possua mais de um pedido, arrasto os cards para lado para
                visualiza-los.
              </span>
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
                      v-for="(item, index) in orders"
                      :key="`slide-card-dishes-selected-${index}`"
                      class="mr-5"
                    >
                      <div>
                        <CardOrderToday
                          :order="item"
                        />
                      </div>
                    </v-slide-item>
                  </v-slide-group>
                </v-col>

                <v-col
                  cols="12"
                  class="hidden-md-and-up"
                >
                  <div
                    style="width:100%;max-width:304px;"
                    class="mx-auto"
                  >
                    <v-carousel
                      hide-delimiters
                      class="fix-caroucel-cards"
                      bottom
                    >
                      <v-carousel-item
                        v-for="(item, index) in orders"
                        :key="`caroucel-card-dishes-selected-${index}`"
                      >
                        <div
                          class="mt-5 mb-3 mx-1"
                        >
                          <CardOrderToday
                            :order="item"
                          />
                        </div>
                      </v-carousel-item>
                    </v-carousel>
                  </div>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Watch } from "vue-property-decorator"
  import { mixins } from "vue-class-component"
  import { namespace } from "vuex-class"
  import { MixinServicePayment } from "@/mixins/services/mixinServicePayment"
  import { MixinServiceOrder } from "@/mixins/services/mixinServiceOrder"
  import { $refs } from "@/implements/types"
  import { IOrderData } from "@/types/type-order"
  import { required, telefone } from "@/helpers/rules"
  import "@/styles/views/orders/viewOrder.styl"

  const cacheStore = namespace("cacheStoreModule")

  @Component({
    components: {
      CardOrderToday: () => import(
        /* webpackChuckName: "card-order-today-component" */
        /* webpackMode: "eager" */
        "@/components/cards/order/CardOrderToday.vue"
      ),
    }
  })

  export default class viewOrder extends mixins(
    MixinServiceOrder,
    MixinServicePayment
  ) implements $refs {
    @cacheStore.Getter("CacheRastreamentoUsuarioOrders") getCacheRastreamentoUsuarioOrders
    @cacheStore.Action("actionRastreamentoUsuarioOrders") setRastreamentoUsuarioOrders

    $refs
    required = required

    formValidate = false
    numberPhone: {
      value: string
      valid: boolean|string
    } = {
      value: "",
      valid: ""
    }

    get validateForm (): boolean {
      return [
        this.formValidate
      ].every(o => !!o)
    }

    get orders (): Array<IOrderData> {
      return this.getCacheRastreamentoUsuarioOrders()
    }

    set orders (value: Array<IOrderData>) {
      this.setRastreamentoUsuarioOrders(value)
    }

    @Watch("numberPhone.value")
      validatePhone (): void {
        this.numberPhone.valid = telefone(String(this.numberPhone.value).replace(/\D/g, ""))
      }

    activeValidate (): void {
      if (this.$refs.formValidateSearchOrder.validate) {
        this.$refs.formValidateSearchOrder.validate()
      }
    }

    updateOrder = 0
    verifyUpdate = false
    @Watch("verifyUpdate")
      updateOrderClient (value):void {
        if (value === false) return

        this.updateOrder = window.setInterval(() => {
          // if (/concluido/i.test(String(this.detailOrder.status))) {
          //   window.clearInterval(this.updateOrder)
          //   return
          // }

          this.searchOrder()
        }, 30000)
      }

    created (): void {
      if (
        [
          this.$route.query.slug,
          this.$route.query.order_nsu,
          this.$route.query.transaction_id,
        ].every(o => !!o)
      ) {
        this.updateStatusPayment()
          .then(responseService => {
            if (responseService) {
              this.$router.push("/detalhes/pedido")
            }
          })
      }

      const PHONE_COSTUMER = sessionStorage.getItem("phone-costumer")
      if (PHONE_COSTUMER) {
        this.numberPhone.value = PHONE_COSTUMER as string
      }
    }

    closeDialogGetOrders (): void {
      window.clearInterval(this.updateOrder)
      this.verifyUpdate = false
      this.orders = []
      this.$refs.dialogGetOrders.save()
    }

    searchOrder (): void {
      const PHONE_FORMATED = String(this.numberPhone.value).replace(/\D/g, "")
      this.getCostumerOrderByPhone(PHONE_FORMATED)
        .then((responseService) => {
          if (!responseService) {
            this.numberPhone.valid = "Pedido(s) não encontrado(s)."
            return
          }

          this.orders = responseService
          this.$refs.dialogGetOrders.isActive = true
          this.verifyUpdate = true
        })
    }
  }
</script>
