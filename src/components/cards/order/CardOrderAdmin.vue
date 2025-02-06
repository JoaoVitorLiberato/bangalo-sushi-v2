<template>
  <v-card
    width="310"
  >
    <v-row
      no-gutters
      class="pa-4"
    >
      <v-col
        cols="12"
        class="d-flex align-center justify-space-between"
      >
        <span
          v-font-size="14"
          class="font-weight-bold text-uppercase"
        >
          Pedido:
        </span>

        <span
          v-font-size="14"
          class="text-uppercase"
        >
          {{ String(item.pedido).substring(0, 8) }}
        </span>
      </v-col>

      <v-col
        cols="12"
        class="py-1"
      />

      <v-col
        cols="12"
        class="grey lighten-4"
      >
        <v-row
          no-gutters
        >
          <v-col
            cols="12"
          >
            <v-col
              cols="12"
            >
              <span
                v-font-size="14"
                class="font-weight-bold text-uppercase d-block"
              >
                Nome do cliente:
              </span>

              <span
                v-font-size="14"
                class="text-uppercase"
              >
                {{ item.nome }}
              </span>
            </v-col>

            <v-col
              cols="12"
              class="py-1"
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

  export default class CardOrderAdmin extends Vue {
    @Prop({}) item!: IOrderData
  }
</script>
