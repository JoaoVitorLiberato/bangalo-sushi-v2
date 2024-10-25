<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script lang="ts">
  import { Component } from "vue-property-decorator"
  import { mixins } from "vue-class-component"
  import { namespace } from "vuex-class"
  import { channelSource } from "@/helpers/analyticsChannel"

  const cacheStore = namespace("cacheStoreModule")
  const payloadStore = namespace("payloadStoreModule")

  @Component({})

  export default class app extends mixins() {
    @cacheStore.Action("actionCacheRastreamentoUsuarioSource") setCacheRastreamentoUsuarioPayloadSource
    @payloadStore.Action("actionPayloadChannelAnalytics") setPayloadChannelAnalytics

    created (): void {
      channelSource().then((source: string) => {
        this.setCacheRastreamentoUsuarioPayloadSource({ source: String(source) })
        this.setPayloadChannelAnalytics()
      })
    }
  }
</script>

<style lang="stylus">
  #app
    .application--wrap
      height 100vh
</style>
