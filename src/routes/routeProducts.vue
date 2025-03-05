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
      <button-whats-app />
      <loading-overlay-component />
      <button-cart-products />
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
      ButtonCartProducts: () => import(
        /* webpackChuckName: "button-cart-products-component" */
        /* webpackMode: "eager" */
        "@/components/buttons/ButtonCartProducts.vue"
      ),
      ButtonWhatsApp: () => import(
        /* webpackChuckName: "button-whats-chat-component" */
        /* webpackMode: "eager" */
        "@/components/buttons/buttonWhatsApp.vue"
      ),
    }
  })

  export default class routeProducts extends Vue {
    created (): void {
      propertysCacheDetele()
    }
  }
</script>
