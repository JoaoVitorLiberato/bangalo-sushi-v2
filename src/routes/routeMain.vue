<template>
  <v-main>
    <v-container
      fluid
      class="pa-0"
    >
      <router-view
        name="viewHero"
      />
      <router-view
        name="viewDishes"
      />
      <router-view
        name="viewDescriptionCook"
      />
      <router-view
        name="viewPartners"
      />
      <router-view
        name="viewEstabelishLocation"
      />
    </v-container>
  </v-main>
</template>

<script lang="ts">
  import { Component } from "vue-property-decorator"
  import { mixins } from "vue-class-component"

  @Component({})

  export default class routeMain extends mixins() {}
</script>
