<template>
  <v-overlay
    :value="open"
    opacity="1"
  >
    <v-dialog
      v-model="open"
      hide-overlay
      max-width="400"
      persistent
    >
      <v-card
        color="primary"
        class="mx-auto"
      >
        <v-row
          v-border="'1px solid var(--v-secondary-base)'"
          no-gutters
        >
          <v-col
            cols="12"
            class="text-end pa-2"
          >
            <v-btn
              icon
              @click.stop="$emit('closeOverlay')"
            >
              <v-icon>
                close
              </v-icon>
            </v-btn>
          </v-col>

          <v-col
            cols="12"
            class="px-4 pb-4"
          >
            <span
              class="font-weight-regular d-block pb-2"
              style="color:var(--v-primary-text)"
            >
              Estamos fechados no momento.
              Nosso horário de funcionamento é das 17h30 às 23h00 podendo
              prolongar até às 1h da manhã.
            </span>

            <small>
              Equipe Bangalô
            </small>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </v-overlay>
</template>

<script lang="ts">
  import { Component, Vue, Prop, Emit } from "vue-property-decorator"

  @Component({})
  export default class OverlayMessageOffSystem extends Vue {
    @Emit()
      closeOverlay () {}
    @Prop({ default: false }) open!: boolean
  }
</script>
