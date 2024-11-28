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
              class="py-2"
            />

            <v-col
              cols="12"
              class="pa-4"
            >

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
  import { MixinServiceOrder } from "@/mixins/services/mixinServiceOrder"
  import { $refs } from "@/implements/types"
  import { IOrderData } from "@/types/type-order"
  import { required, telefone } from "@/helpers/rules"

  const cacheStore = namespace("cacheStoreModule")

  @Component({})
  export default class viewOrder extends mixins(
    MixinServiceOrder,
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
        }, 5000)
      }

    closeDialogGetOrders (): void {
      window.clearInterval(this.updateOrder)
      this.verifyUpdate = false
      this.$refs.dialogGetOrders.save()
    }

    searchOrder (): void {
      const PHONE_FORMATED = String(this.numberPhone.value).replace(/\D/g, "")
      this.getCostumerOrder(PHONE_FORMATED)
        .then((responseService) => {
          if (!responseService) {
            this.numberPhone.valid = "Pedido não encontrado."
            return
          }

          this.orders = responseService
          this.$refs.dialogGetOrders.isActive = true
          this.verifyUpdate = true
        })
    }
  }
</script>
