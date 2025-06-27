<template>
  <div>
    <v-app-bar
      elevation="2"
      height="70"
      class="modern-toolbar-app-bar"
      color="primary"
      :app="!disableButton"
      dense
    >
      <v-row no-gutters align="center" justify="space-between" class="w-100">
        <v-col cols="2" class="d-flex align-center">
          <v-btn
            v-if="!disableButton"
            icon
            class="modern-menu-btn"
            aria-label="Abrir menu"
            color="#000"
            small
            @click.stop="navDrawer = !navDrawer"
          >
            <v-icon size="32">menu</v-icon>
          </v-btn>
        </v-col>

        <v-col cols="8" class="d-flex justify-center align-center">
          <v-img
            src="/favicon.png"
            alt="Bangalô Sushi Lounge - Seu sushi com qualidade, sabor e tradição"
            width="120"
            height="60"
            contain
            class="modern-toolbar-logo"
            @click.stop="goToHome()"
            style="cursor:pointer;"
          />
        </v-col>
        <v-col cols="2"></v-col>
      </v-row>
    </v-app-bar>

    <v-navigation-drawer
      v-model="navDrawer"
      temporary
      left
      app
      class="modern-toolbar-drawer"
      overlay-color="#000A"
      width="270"
    >
      <v-list-item class="modern-drawer-header">
        <v-list-item-content>
          <v-img
            src="/favicon.png"
            alt="Logo Bangalô Sushi Lounge"
            contain
          />
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense nav>
        <v-list-item
          v-for="({ icon, name, path }) in routesDrawer"
          :key="`drawer-list-${name}`"
          link
          color="secondary"
          class="modern-drawer-item"
          :class="{ 'modern-drawer-item--active': isActiveRoute(path) }"
          @click="handleDrawerClick(name, path)"
        >
          <v-list-item-icon>
            <v-icon size="28">{{ icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="modern-drawer-item-title">
              {{ name }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
  import { Component, Prop } from "vue-property-decorator"
  import { mixins } from "vue-class-component"
  import { MixinRedirectLinks } from "@/mixins/redirect-links/MixinRedirectLinks"
  import "@/styles/components/layout/toolbarComponent.styl"

  @Component({})
  export default class ToolbarComponent extends mixins(
    MixinRedirectLinks,
  ) {
    @Prop({ default: false }) disableButton?: boolean

    navDrawer = false

    get routesDrawer (): Array<{
      icon:string,
      name:string,
      path:string
      routeName: string
    }> {
      return [
        {
          name: "Página Principal",
          icon: "home",
          path:"/",
          routeName: "home"
        },
        {
          name: "Pedido Delivery",
          icon: "receipt",
          path:"delivery",
          routeName: "products-view"
        },
        // {
        //   name: "Pedido Local",
        //   icon: "mdi-room-service",
        //   path:"local",
        //   routeName: "products-view"
        // },
        {
          name: "Meus Pedidos",
          icon: "shopping_bag",
          path:"/detalhes/pedido",
          routeName: "order-view"
        },
        {
          name: "Loja",
          icon: "storefront",
          path:"/admin",
          routeName: "admin-login-view"
        }
      ]
      .filter((item) => {
        if (/products-view/i.test(String(this.$route.name))) {
            const NAME_SPLITED = String(item.name).split(" ")
          if (String(NAME_SPLITED[1]).toLowerCase() !== String(this.$route.params.type)) return item
        } else if (String(item.routeName) !== String(this.$route.name)) {
          return item
        }
      })
    }

    isActiveRoute(path: string) {
      return this.$route.path === path
    }

    handleDrawerClick(name: string, path: string) {
      if (/delivery|local/i.test(String(name))) {
        this.returnProductRoute(path)
      } else if (/Loja/i.test(String(name))) {
        this.gotoAdminExternal()
      } else {
        this.$router.replace(path)
      }
      this.navDrawer = false
    }
  }
</script>

<style scoped>
  .modern-toolbar-app-bar {
    border-bottom: 1.5px solid #FFD600;
    background: #fff;
  }
  .modern-toolbar-logo {
    transition: transform 0.2s;
  }
  .modern-toolbar-logo:hover {
    transform: scale(1.05);
  }
  .modern-menu-btn {
    margin-left: 8px;
  }
  .modern-toolbar-drawer {
    box-shadow: 2px 0 8px #0003;
  }
  .modern-drawer-header {
    padding-top: 18px;
    padding-bottom: 8px;
  }
  .modern-drawer-title {
    font-size: 1.2rem;
    letter-spacing: 1px;
  }
  .modern-drawer-item {
    border-radius: 8px;
    margin: 4px 0;
    transition: background 0.15s;
  }
  .modern-drawer-item--active {
    background: #FFD60022 !important;
  }
  .modern-drawer-item-title {
    font-size: 1.08rem;
    font-weight: 500;
    color: #000;
  }
</style>
