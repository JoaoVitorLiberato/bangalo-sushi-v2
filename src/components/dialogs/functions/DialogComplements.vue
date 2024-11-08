<template>
  <v-dialog
    v-model="open"
    fullscreen
    persistent
  >
    <v-card
      style="border-radius:0" 
    >
      <div>
        Complementos
      </div>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
  import { Component, Prop } from "vue-property-decorator"
  import { mixins } from "vue-class-component"

  @Component({})
  export default class DialogComplements extends mixins() {
    @Prop({ default: false }) open!: boolean
  }
</script>
