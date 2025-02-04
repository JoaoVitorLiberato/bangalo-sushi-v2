<template>
  <v-container
    fluid
  >
    <v-row
      no-gutters
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
      >
        <order-content />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
  import { Component } from "vue-property-decorator"
  import { mixins } from "vue-class-component"

  @Component({
    components: {
      OrderContent: () => import(
        /* webpackChuckName: "order-content-component" */
        /* webpackMode: "eager" */
        "@/components/layout/content/OrderContent.vue"
      )
    }
  })
  export default class ViewDetails extends mixins() {}
</script>
