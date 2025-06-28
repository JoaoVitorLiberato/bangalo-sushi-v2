<template>
  <v-main>
    <v-container
      fluid
      class="pa-0"
    >
      <header>
        <toolbar-component
          :disableButton="/^(admin-details-view)$/i.test(String($route.name))"
        />
      </header>
      <main id="main-content" role="main">
        <router-view
          name="viewAuthLogin"
        />
      </main>
      <footer>
        <!-- Adicione um footer acessível se necessário -->
      </footer>
      <dialog-functions-helper-system>
        <template
          #tryAgain
        />
      </dialog-functions-helper-system>
      <loading-overlay-component
        v-if="!/^(admin-details-view)$/i.test(String($route.name || ''))"
      />
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

  export default class routeAdmin extends Vue {
    created (): void {
      const TOKEN_USER = sessionStorage.getItem("token-user")
      const PERMISION_USER =  sessionStorage.getItem("permision-user")

      if (TOKEN_USER || PERMISION_USER) {
        propertysCacheDetele()
      }
    }
  }
</script>
