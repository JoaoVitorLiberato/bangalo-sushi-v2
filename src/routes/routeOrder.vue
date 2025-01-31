<template>
  <v-main>
    <v-container
      fluid
      class="pa-0"
    >
      <toolbar-component
        :disableButton="/^(form-view)$/i.test(String($route.name))"
      />

      <router-view
        name="viewForm"
      />

      <router-view
        name="viewOrder"
      />

      <dialog-functions-helper-system>
        <template
          #tryAgain
        />
      </dialog-functions-helper-system>

      <loading-overlay-component />
    </v-container>
  </v-main>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator"
  import { propertysCacheDetele } from "@/helpers/propertysCacheDetele"

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
      LoadingOverlayComponent: () => import(
        /* webpackChuckName: "loading-overlay-component" */
        /* webpackMode: "eager" */
        "@/components/overlay/LoadingOverlay.vue"
      ),
    }
  })

  export default class routeForm extends Vue {
    created (): void {
      propertysCacheDetele()
    }
  }
</script>
