<template>
  <div>
    <v-app-bar
      elevation="1"
      height="65"
      class="fix-toolbar-app-bar"
      color="primary"
      app
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
            @click.stop="navDrawer = !navDrawer"
          >
            <v-icon>
              menu
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-app-bar>

    <v-navigation-drawer
      v-model="navDrawer"
      temporary
      app
      right
      open-on-hover
    >
      <v-list-item>
        <v-list-item-content>
          <v-img
            src="/favicon.png"
            alt="Bangalô Sushi Lounge - Seu sushi com qualidade, sabor e tradição"
            width="150"
            height="115"
            contain
          />
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="({ icon, name, path }) in routesDrawer"
          :key="`drawer-list-${name}`"
          link
          color="secondary"
          @click="/delivery|local/i.test(String(name)) ? returnProductRoute(path) : $router.replace(path)"
        >
          <v-list-item-icon>
            <v-icon>
              {{ icon }}
            </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>
              {{ name }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
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
  ) {
    navDrawer = false

    get routesDrawer (): Array<{
      icon:string,
      name:string,
      path:string
    }> {
      return [
        {
          name: "Pedido Delivery",
          icon: "shopping_bag",
          path:"delivary"
        },
        {
          name: "Pedido Local",
          icon: "room_service",
          path:"local"
        }
      ]
    }
  }
</script>
