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

      <dialog-functions-helper-system>
        <template
          #redirectSegment
        />
        <template
          #tryAgain
        />
      </dialog-functions-helper-system>
    </v-container>
  </v-main>
</template>

<script lang="ts">
  import { Component } from "vue-property-decorator"
  import { mixins } from "vue-class-component"

  @Component({
    components: {
      DialogFunctionsHelperSystem: () => import(
        /* webpackChuckName: "dialog-function-helper-system-component" */
        /* webpackMode: "eager" */
        "@/components/dialogs/functions/DialogFunctionsHelperSystem.vue"
      )
    }
  })

  export default class routeMain extends mixins() {}
</script>
