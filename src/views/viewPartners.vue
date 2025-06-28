<template>
  <v-card
    v-border.radius="'0px'"
    elevation="0"
    class="pb-6 partners-section-card"
  >
    <v-row
      no-gutters
      class="pa-4 mx-auto partners-section-row"
      justify="center"
      style="width: 100%;max-width: 1100px;"
    >
      <v-col
        cols="12"
        class="text-center mb-2"
      >
        <h2
          v-font-size="$vuetify.breakpoint.smAndDown ? 19 : 27"
          class="font-weight-bold text-uppercase partners-title"
        >
          Conheça nosso{{imagesPartners.length > 1 ? 's' : ''}} parceiro{{imagesPartners.length > 1 ? 's' : ''}}
        </h2>
      </v-col>

      <v-col
        cols="12"
        class="hidden-sm-and-down"
      >
        <div
          class="d-flex justify-center align-center partners-desktop-list"
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
              class="ma-3 partners-slide-item"
            >
              <div class="partners-card-desktop">
                <a
                  :href="link"
                  target="_blank"
                  style="display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%; height: 100%; text-decoration: none;"
                >
                  <v-img
                    :src="url"
                    :alt="`Conheça nosso parceiro ${name}`"
                    :title="`Conheça nosso parceiro ${name}`"
                    contain
                    class="partners-img-desktop"
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
          height="220"
          hide-delimiter-background
          :show-arrows="false"
          centered
          class="fix-caroucel-parceiro partners-mobile-carousel"
        >
          <v-carousel-item
            v-for="{ name, url, link } in imagesPartners"
            :key="`partners-mobile-${name}`"
            style="max-width: 340px;"
            class="mx-auto partners-mobile-carousel-item"
          >
            <div class="partners-mobile-card">
              <a
                :href="link"
                target="_blank"
                style="display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;"
              >
                <v-img
                  :src="url"
                  :alt="`Conheça nosso parceiro ${name}`"
                  :title="`Conheça nosso parceiro ${name}`"
                  contain
                  class="partners-img-mobile"
                />
              </a>
            </div>
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

<style scoped>
.partners-section-card {
  background: linear-gradient(120deg, #f2f2f2 80%, #fffbe6 100%);
  border-radius: 18px;
  box-shadow: 0 2px 16px 0 rgba(31,41,55,0.07);
  margin: 0 auto;
  border: none;
}
.partners-section-row {
  padding-top: 32px !important;
  padding-bottom: 32px !important;
}
.partners-title {
  color: #1f2937;
  letter-spacing: 1.2px;
  font-size: 2.2rem;
  margin-bottom: 1.2rem;
  font-family: 'Montserrat', Arial, sans-serif;
}
@media (max-width: 600px) {
  .partners-title {
    font-size: 1.18rem;
    margin-bottom: 0.2rem;
  }
  .partners-section-row {
    padding-top: 16px !important;
    padding-bottom: 16px !important;
  }
}
.partners-desktop-list {
  gap: 40px;
  align-items: stretch;
}
.partners-slide-item {
  transition: transform 0.18s, box-shadow 0.18s;
  display: flex;
  align-items: center;
  height: 340px;
  min-width: 340px;
  max-width: 520px;
  justify-content: center;
}
.partners-card-desktop {
  background: #fff;
  border-radius: 36px;
  box-shadow: 0 6px 32px 0 rgba(31,41,55,0.10);
  padding: 48px 48px 32px 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 260px;
  min-width: 260px;
  max-width: 420px;
  transition: box-shadow 0.18s, transform 0.18s;
}
.partners-slide-item:hover .partners-card-desktop {
  box-shadow: 0 12px 48px 0 rgba(31,41,55,0.16);
  transform: translateY(-4px) scale(1.025);
}
.partners-img-desktop {
  border-radius: 18px;
  width: 100%;
  height: 120px;
  max-width: 320px;
  object-fit: contain;
  background: #fff;
  box-shadow: none;
  margin: 0 auto;
  display: block;
}
.partners-name-desktop {
  font-size: 1.18rem;
  font-weight: 600;
  color: #FFD600;
  letter-spacing: 0.5px;
  text-align: center;
  font-family: 'Montserrat', Arial, sans-serif;
  margin-top: 18px;
  text-shadow: 0 1px 0 #fffbe6;
}
.partners-img {
  border-radius: 22px;
  width: 100%;
  height: 100%;
  max-width: 320px;
  max-height: 160px;
  min-width: 120px;
  min-height: 60px;
  object-fit: contain;
  background: #fff;
  box-shadow: none;
  margin: 0 auto;
  display: block;
}
.partners-slide-item:hover .partners-img {
  transform: scale(1.045);
  box-shadow: 0 8px 32px 0 rgba(31,41,55,0.13);
  border-color: #FFD600;
}
@media (max-width: 600px) {
  .partners-img {
    border-radius: 14px;
    width: 100% !important;
    max-width: 320px;
    min-width: 160px;
    height: 120px !important;
    box-shadow: 0 2px 10px 0 rgba(31,41,55,0.08);
  }
  .partners-img-mobile {
    width: 100%;
    height: 100% !important;
    min-width: 0;
    min-height: 0;
    object-fit: cover;
    border-radius: 18px;
    background: #fff;
    box-shadow: none;
    margin: 0;
    display: block;
  }
  .partners-mobile-carousel {
    border-radius: 16px;
    box-shadow: 0 2px 12px 0 rgba(31,41,55,0.10);
    background: #fffbe6;
  }
  .partners-mobile-carousel-item {
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 140px;
  }
  .partners-mobile-card {
    background: #fff;
    border-radius: 18px;
    box-shadow: 0 2px 12px 0 rgba(31,41,55,0.10);
    padding: 0;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
