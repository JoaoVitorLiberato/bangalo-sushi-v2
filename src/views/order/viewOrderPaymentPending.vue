<template>
  <v-row
    no-gutters
    justify="center"
    align="center"
    class="pa-4 fill-height"
    style="height:70vh"
  >
    <v-col
      cols="12"
      md="6"
      class="d-flex align-center justify-center"
    >
      <v-card
        width="400"
        color="grey lighten-4"
        class="pa-4"
      >
        <v-row
          no-gutters
        >
          <v-col
            cols="12"
            class="text-center"
          >
            <h2
              v-font-size="16"
              class="font-weight-bold text-uppercase"
            >
              Pagamento pendente
            </h2>
          </v-col>

          <v-col
            cols="12"
            class="py-1"
          />

          <v-col
            cols="12"
            class="text-center"
            style="line-height:16px"
          >
            <span
              v-font-size="14"
              class="font-weight-regular"
            >
              Seu pedido já está salvo em nosso sistema, clicando no botão abaixo
              você será redirecionado para o checkout pagamento.
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
              @click.stop="redirectCheckout()"
            >
              <span
                v-font-size="13"
                class="black--text"
              >
                Pagar agora
              </span>
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator"
  import { namespace } from "vuex-class"

  const cacheStore = namespace("cacheStoreModule")
  const payloadStore = namespace("payloadStoreModule")

  @Component({})
  export default class VueOrderPaymentPending extends Vue {
    @cacheStore.Action("actionRastreamentoUsuarioCheckoutExternal") setRastreamentoUsuarioCheckoutExternal
    @cacheStore.Getter("CacheRastreamentoUsuarioCheckoutExternal") getCacheRastreamentoUsuarioCheckoutExternal
    @payloadStore.Getter("PayloadOrder") getPayloadOrder

    created (): void {
      if (!this.getCacheRastreamentoUsuarioCheckoutExternal()) {
        this.setRastreamentoUsuarioCheckoutExternal(
          sessionStorage.getItem("external-link")
        )
      }
    }

    redirectCheckout (): void {
      window.open(this.getCacheRastreamentoUsuarioCheckoutExternal(), "_self")
    }
  }
</script>
