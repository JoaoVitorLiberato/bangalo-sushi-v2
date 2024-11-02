<template>
  <div>
    <v-app-bar
      elevation="4"
      height="65"
      class="fix-toolbar-app-bar"
    >
      <v-row
        no-gutters
        align="center"
        justify="space-between"
      >
        <v-col
          cols="3"
        >
          <v-img
            src="/favicon.png"
            alt="Bangalô Sushi Lounge - Seu sushi com qualidade, sabor e tradição"
            width="110"
            height="65"
            contain
            @click.stop="goToHome()"
          />
        </v-col>

        <v-col
          cols="2"
          class="text-sm-end"
        >
          <v-btn
            icon
          >
            <v-icon>
              menu
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-app-bar>
  </div>
</template>

<script lang="ts">
  import { Component } from "vue-property-decorator"
  import { mixins } from "vue-class-component"
  import { MixinRedirectLinks } from "@/mixins/redirect-links/MixinRedirectLinks"
  import "@/styles/components/layout/toolbarComponent.styl"

  @Component({})
  export default class ToolbarComponent extends mixins(
    MixinRedirectLinks,
  ) {}
</script>
