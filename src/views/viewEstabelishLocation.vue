<template>
  <v-row
    no-gutters
    class="estab-section px-0 py-8"
    align="center"
    justify="center"
  >
    <v-col cols="12">
      <v-container max-width="1100" class="pa-2 mt-4">
        <v-row no-gutters align="center" justify="center">
          <v-col cols="12" md="5" class="estab-info-col pa-2">
            <div class="estab-title text-center text-md-left mb-4">
              <v-icon color="secondary" left class="mr-2 d-none d-md-inline">location_on</v-icon>
              <span class="font-weight-bold estab-title-text">Onde você pode nos encontrar?</span>
            </div>
            <div class="estab-address-block">
              <div class="estab-address text-center text-md-left mb-3">
                <v-icon color="secondary" left class="mr-2 d-none d-md-inline">place</v-icon>
                <span class="font-weight-regular estab-address-text">
                  R. João Castelo, 59, <br class="hidden-sm-and-down">Santa Luzia de Paruá - MA
                </span>
              </div>
            </div>
            <div class="estab-contact text-center text-md-left mb-4 estab-contact-mobile">
              <span class="font-weight-medium d-block mb-2">Fale conosco pelo WhatsApp:</span>
              <v-btn
                color="success"
                class="estab-whatsapp-btn"
                rounded
                large
                block
                href="https://wa.me/98985094324"
                target="_blank"
                elevation="8"
                style="font-weight:700; letter-spacing:0.5px;"
              >
                <v-icon left x-large>whatsapp</v-icon>
                (98) 9 8509-4324
              </v-btn>
            </div>
          </v-col>
          <v-col cols="12" md="7" class="d-flex justify-center align-center">
            <div class="estab-map-wrapper">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3985.8927434127677!2d-45.77562762614781!3d-2.5418412974364952!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x92b3905e64c175f3%3A0x83e675e277d96da0!2sR.%20Jo%C3%A3o%20Castelo%2C%2059%2C%20Santa%20Luzia%20do%20Paru%C3%A1%20-%20MA%2C%2065272-000!5e0!3m2!1spt-BR!2sbr!4v1750995111851!5m2!1spt-BR!2sbr"
                alt="Saiba mais sobre nossa localização clicando no mapa"
                title="Saiba mais sobre nossa localização clicando no mapa"
                :width="$vuetify.breakpoint.smAndDown ? '98%' : 500"
                :height="$vuetify.breakpoint.smAndDown ? 220 : 350"
                class="estab-map"
                style="border:0; border-radius:18px; box-shadow:0 4px 32px 0 rgba(31,41,55,0.13);"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-col>
  </v-row>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator"

  @Component({})
  export default class viewEstabelishLocation extends Vue {}
</script>

<style lang="stylus" scoped>
.estab-section
  background #fff
  border-radius 18px
  box-shadow 0 2px 16px 0 rgba(31,41,55,0.07)
  margin 0 auto
  @media (max-width: 600px)
    padding 0 !important
    border-radius 0
    box-shadow none

.estab-info-col
  padding 32px 24px 32px 32px
  @media (max-width: 960px)
    padding 18px 8px 12px 8px
  @media (max-width: 600px)
    padding 12px 2vw 8px 2vw
    text-align center !important
    display flex
    flex-direction column
    align-items center
    gap 18px

.estab-title
  font-size 1.45rem
  color #1f2937
  display flex
  align-items center
  justify-content flex-start
  @media (max-width: 600px)
    font-size 1.15rem
    justify-content center
    margin-bottom 10px
    flex-direction column
    text-align center
    .v-icon
      display none !important

.estab-title-text
  color #1f2937
  font-weight 800
  letter-spacing 1.1px

.estab-address-block
  background #f7f7fa
  border 1.5px solid #e9ecef
  border-radius 14px
  padding 16px 10px
  margin-bottom 18px
  box-shadow 0 2px 10px 0 rgba(31,41,55,0.06)
  @media (max-width: 600px)
    padding 12px 4px
    margin-bottom 14px
    width 100%
    max-width 98vw
    margin-left auto
    margin-right auto

.estab-address
  font-size 1.12rem
  color #374151
  display flex
  align-items center
  margin-bottom 0
  @media (max-width: 600px)
    font-size 1.05rem
    justify-content center
    flex-direction column
    text-align center
    .v-icon
      display none !important

.estab-address-text
  color #374151
  font-weight 500
  @media (max-width: 600px)
    font-size 1.08rem
    line-height 1.4
    display block
    margin 0 auto
    padding 0 2px

.estab-contact
  font-size 1.08rem
  color #222
  display flex
  align-items center
  flex-wrap wrap
  gap 8px
  @media (max-width: 600px)
    font-size 1rem
    flex-direction column
    align-items center
    gap 8px
    margin-bottom 10px
    text-align center
    width 100%
    padding 0

.estab-contact-mobile
  @media (max-width: 600px)
    width 100%
    margin 0 auto 10px auto
    padding 0
    .estab-whatsapp-btn
      width 100% !important
      font-size 1.18rem
      min-height 56px
      border-radius 18px !important
      margin-top 2px
      margin-bottom 0
      box-shadow 0 4px 18px 0 rgba(39,174,96,0.13)
      .v-icon
        font-size 1.7rem

.estab-map-wrapper
  width 100%
  display flex
  justify-content center
  align-items center
  padding 12px 0
  @media (max-width: 600px)
    padding 0
    margin-top 18px

.estab-map
  width 100%
  max-width 500px
  min-width 180px
  border-radius 18px
  box-shadow 0 4px 32px 0 rgba(31,41,55,0.13)
  @media (max-width: 600px)
    min-width 120px
    max-width 98vw
    border-radius 14px
    box-shadow 0 2px 12px 0 rgba(31,41,55,0.10)
</style>
