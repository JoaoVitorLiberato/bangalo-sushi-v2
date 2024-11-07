<template>
  <div>
    <v-btn
      color="secondary"
      fab
      large
      fixed
      right
      bottom
      title="Botão Cart - Abrir o carrinho"
    >
      <v-badge
        color="error"
        :content="0"
      >
        <v-icon
          color="#000"
        >
          shopping_cart
        </v-icon>
      </v-badge>
    </v-btn>
  </div>
</template>

<script lang="ts">
  import { Component } from "vue-property-decorator"
  import { mixins } from "vue-class-component"

  @Component({})
  export default class ButtonCartProduct extends mixins() {}
</script>