<template>
  <v-card
    v-border.radius="'0px'"
    elevation="0"
    color="#f2f2f2"
    class="pb-6"
  >
    <v-row
      no-gutters
      class="pa-4 mx-auto"
      justify="center"
      style="width: 100%;max-width: 1100px;"
    >
      <v-col
        cols="12"
        class="text-center"
      >
        <h2
          v-font-size="$vuetify.breakpoint.smAndDown ? 19 : 27"
          class="font-weight-bold text-uppercase"
        >
          Conheça nosso{{imagesPartners.length > 1 ? 's' : ''}} parceiro{{imagesPartners.length > 1 ? 's' : ''}}
        </h2>
      </v-col>

      <v-col
        cols="12"
        class="py-4"
      />

      <v-col
        cols="12"
        class="hidden-sm-and-down"
      >
        <div
          class="d-flex justify-center align-center"
        >
          <v-slide-group
            show-arrows
            mobile
            prev-icon="arrow_back"
            next-icon="arrow_forward"
            :class="`d-flex fix--v-slide-group flex-wrap`"
            center-active
            mandatory
          >
            <v-slide-item
              v-for="{ name, url, link } in imagesPartners"
              :key="`partners-${name}`"
              class="mr-5 py-5"
            >
              <div>
                <a
                  :href="link"
                  target="_blank"
                >
                  <v-img
                    :src="url"
                    :alt="`Conheça nosso parceiro ${name}`"
                    :title="`Conheça nosso parceiro ${name}`"
                    contain
                    :width="$vuetify.breakpoint.width > 970 && $vuetify.breakpoint.width <= 1024 ? 260 : 300"
                    :height="$vuetify.breakpoint.width > 970 && $vuetify.breakpoint.width <= 1024 ? 200 : 250"
                  />
                </a>
            </div>
            </v-slide-item>
          </v-slide-group>
        </div>
      </v-col>

      <v-col
        cols="12"
        class="hidden-md-and-up"
      >
        <v-carousel
          cycle
          height="300"
          hide-delimiter-background
          :show-arrows="false"
          centered
          class="fix-caroucel-parceiro"
        >
          <v-carousel-item
            v-for="{ name, url, link } in imagesPartners"
            :key="`partners-mobile-${name}`"
            style="max-width: 400px;"
            class="mx-auto"
          >
            <a
              :href="link"
              target="_blank"
            >
              <v-img
                :src="url"
                :alt="`Conheça nosso parceiro ${name}`"
                :title="`Conheça nosso parceiro ${name}`"
                contain
                width="300"
                height="250"
              />
            </a>
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator"
  import PARTNERS_DATA from "@/data/partners/partners.json"
  import "@/styles/views/viewPartners.styl"
  import "@/styles/views/viewDishes.styl"

  @Component({})
  export default class viewPartners extends Vue {
    get imagesPartners (): typeof PARTNERS_DATA {
      return PARTNERS_DATA
    }
  }
</script>
