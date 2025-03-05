<template>
  <v-main>
    <v-container
      fluid
      class="pa-0"
    >
      <toolbar-component />

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

  export default class routeMain extends Vue {
    created (): void {
      propertysCacheDetele()
    }
  }
</script>
