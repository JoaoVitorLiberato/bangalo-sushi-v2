<template>
  <v-card
    max-width="310"
    :loading="/^(preparando|entrega)$/i.test(String(order.status))"
    style="border-radius: 0 0 5px 5px;"
  >
    <template
      v-slot:progress
    >
      <v-progress-linear
        color="secondary"
        height="5"
        indeterminate
      />
    </template>

    <v-row
      no-gutters
      class="pa-4"
      style="border:2px solid;border-color:var(--v-secondary-base)"
    >
      <v-col
        cols="12"
        style="line-height:1"
        class="text-center"
      >
        <span
          v-if="/^(preparando)$/i.test(String(order.status))"
          v-font-size="13"
          class="font-weight-regular"
        >
          O pedido está sendo preparado...
        </span>

        <span
          v-if="/^(entrega)$/i.test(String(order.status))"
          v-font-size="13"
          class="font-weight-regular"
        >
          Seu pedido está em rota de entrega...
        </span>

        <span
          v-if="/^(cancelado)$/i.test(String(order.status)) || order.status === null"
          v-font-size="13"
          class="font-weight-regular"
        >
          Seu pedido foi cancelado.
        </span>

        <span
          v-if="/^(concluido)$/i.test(String(order.status))"
          v-font-size="13"
          class="font-weight-regular"
        >
          Seu pedido foi concluído.
        </span>
      </v-col>

      <v-col
        cols="12"
        class="py-3"
      />

      <v-col
        cols="12"
        style="line-height:1"
      >
        <span
          v-font-size="13"
          class="font-weight-bold text-uppercase d-block"
        >
          Nome:
        </span>

        <span
          v-font-size="13"
          class="font-weight-light text-uppercase"
        >
          {{ order.nome }}
        </span>
      </v-col>

      <v-col
        cols="12"
        class="py-1"
      />

      <v-col
        cols="12"
        style="line-height:1"
      >
        <span
          v-font-size="13"
          class="font-weight-bold text-uppercase d-block"
        >
          Telefone:
        </span>

        <span
          v-font-size="13"
          class="font-weight-light text-uppercase"
        >
          {{ order.telefone }}
        </span>
      </v-col>

      <v-col
        cols="12"
        class="py-1"
      />

      <v-col
        cols="12"
        style="line-height:1"
      >
        <span
          v-font-size="13"
          class="font-weight-bold text-uppercase d-block"
        >
          Segmento:
        </span>

        <span
          v-font-size="13"
          class="font-weight-light text-uppercase"
        >
          {{ order.segmento }}
        </span>
      </v-col>

      <v-col
        cols="12"
        class="py-1"
      />

      <v-col
        v-if="order.produtos.length > 0"
        cols="12"
      >
        <span
          v-font-size="13"
          class="font-weight-bold text-uppercase d-block"
        >
          Produtos:
        </span>

        <v-row
          no-gutters
        >
          <v-col
            v-for="(item, index) in order.produtos"
            :key="`card-product-order-${item.name}-${index}`"
            cols="12"
            class="my-2"
            :style="String(getCacheRastreamentoUsuarioProductsCart()[getCacheRastreamentoUsuarioProductsCart().length - 1].id) === String(item.id )? 'margin-bottom:200px' : ''"
          >
            <card-cart
              :name="item.name"
              :qtd_product="item.price.qtd_product"
              :product="item"
              :price_total="item.price.total"
              :complements="item.complements"
              :differences="item.differences"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from "vue-property-decorator"
  import { IOrderData } from "@/types/type-order"

  @Component({})
  export default class CardOrderToday extends Vue {
    @Prop({}) order!: IOrderData

    created (): void {
      console.log("orders", this.order)
    }
  }
</script>
