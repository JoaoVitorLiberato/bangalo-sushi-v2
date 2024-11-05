<template>
  <v-main>
    <v-container
      fluid
      class="pa-0"
    >
      <toolbar-component />
    
      <router-view
        name="viewProducts"
      />

      <dialog-functions-helper-system>
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
      ToolbarComponent: () => import(
        /* webpackChuckName: "layout-toolbar-component" */
        /* webpackMode: "eager" */
        "@/components/layout/ToolbarComponent.vue"
      ),
      DialogFunctionsHelperSystem: () => import(
        /* webpackChuckName: "dialog-function-helper-system-component" */
        /* webpackMode: "eager" */
        "@/components/dialogs/functions/DialogFunctionsHelperSystem.vue"
      ),
    }
  })

  export default class routeProducts extends mixins() {}
</script>
