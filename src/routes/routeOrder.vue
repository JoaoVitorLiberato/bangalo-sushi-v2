<template>
  <v-main>
    <v-container
      fluid
      class="pa-0"
    >
      <header>
        <toolbar-component
          :disableButton="/^(form-view|order-pending-view)$/i.test(String($route.name))"
        />
      </header>
      <main id="main-content" role="main">
        <router-view
          name="viewForm"
        />

        <router-view
          name="viewOrderPending"
        />

        <router-view
          name="viewOrder"
        />
      </main>
      <footer>
        <footer-component />
      </footer>

      <dialog-functions-helper-system>
        <template
          #errorPayment
        />
        <template
          #tryAgain
        />
      </dialog-functions-helper-system>
      <button-whats-app />

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
      FooterComponent: () => import(
        /* webpackChuckName: "layout-footer-component" */
        /* webpackMode: "eager" */
        "@/components/layout/FooterComponent.vue"
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
      ButtonWhatsApp: () => import(
        /* webpackChuckName: "button-whats-chat-component" */
        /* webpackMode: "eager" */
        "@/components/buttons/buttonWhatsApp.vue"
      ),
    }
  })

  export default class routeForm extends Vue {
    created (): void {
      propertysCacheDetele()
    }
  }
</script>
