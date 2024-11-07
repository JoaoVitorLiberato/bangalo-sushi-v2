<template>
  <div>
    <v-overlay
      :value="getCacheFrameLoading().status"
    >
      <v-card
        color="primary"
        style="border-radius:50%"
        class="pa-1"
      >
        <v-progress-circular
          indeterminate
          color="amber"
          width="5"
          size="220"
        >
          <v-img
            src="/favicon.png"
            alt="Bangalô Sushi Lounge - Seu sushi com qualidade, sabor e tradição"
            width="200"
            height="180"
            contain
          />
        </v-progress-circular>
      </v-card>
    </v-overlay>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator"
  import { namespace } from "vuex-class"

  const cacheStore = namespace("cacheStoreModule")

  @Component({})
  export default class DialogFunctionsHelperSystem extends Vue {
    @cacheStore.Getter("CacheFrameLoading") getCacheFrameLoading
  }
</script>
