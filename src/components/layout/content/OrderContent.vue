<template>
  <v-container
    fluid
    class="pa-0"
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
            v-for="item in 5"
            :key="`slide-card-dishes-selected-${item}`"
            class="mr-5"
          >
            <div>
              <CardOrderAdmin />
            </div>
          </v-slide-item>
        </v-slide-group>
      </v-col>

      <v-col
        cols="12"
        class="hidden-md-and-up"
      >
        <v-card
          color="grey lighten-4"
          elevation="0"
          class="pa-4"
        >
          MObile sem tela
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator"

  @Component({
    components: {
      CardOrderAdmin: () => import(
        /* webpackChuckName: "card-order-admin-component" */
        /* webpackMode: "eager" */
        "@/components/cards/order/CardOrderAdmin.vue"
      )
    }
  })
  export default class OrderContent extends Vue {}
</script>
