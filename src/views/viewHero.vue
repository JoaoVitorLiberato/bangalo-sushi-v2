<template>
  <div>
    <div class="hero-modern">
      <img
        src="/img/project/logo-sem-fundo.png"
        class="hero-bg-logo"
        alt="Logo decorativa"
      />

      <v-container
        class="fill-height d-flex align-center"
        :style="`position: relative; z-index:2; min-height: ${$vuetify.breakpoint.smAndDown ? 380 : 620}px;`"
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            md="6"
            :class="$vuetify.breakpoint.smAndDown ? 'd-flex flex-column justify-center align-center hero-text-col-mobile' : 'd-flex flex-column justify-center align-start hero-text-col'"
          >
            <span
              class="font-weight-medium text-uppercase white--text hero-top-text"
            >
              Qualidade, sabor e tradição.
            </span>

            <h1
              class="display-2 font-weight-bold mb-2 hero-title"
            >
              <span class="hero-title-highlight">
                Bangalô Sushi Lounge
              </span>
            </h1>
            <div class="subtitle-1 mb-6 hero-subtitle">
              Sinta o sabor da tradição japonesa com um toque de inovação.
              Ingredientes frescos, ambiente acolhedor e entrega rápida para surpreender seu paladar.
            </div>

            <div :class="$vuetify.breakpoint.smAndDown ? 'd-flex flex-column align-center mb-4 w-100' : 'd-flex mb-6 flex-wrap'">
              <v-btn
                v-for="cta in ctas"
                :key="cta.text"
                color="yellow darken-2"
                :outlined="cta.outlined"
                class="hero-cta"
                :class="$vuetify.breakpoint.smAndDown ? 'mb-3 px-8 py-4 w-100' : 'mr-4 mb-2 px-6 py-3'"
                large
                rounded
                @click.stop="cta.href ? cta.href() : ''"
              >
                {{ cta.text }}
              </v-btn>
            </div>
          </v-col>

          <v-col
            cols="12"
            md="6"
            :class="$vuetify.breakpoint.smAndDown ? 'hidden-sm-and-down' : 'd-flex justify-center align-center hero-img-col'"
          >
            <v-img
              src="/img/project/prato-sushi.webp"
              alt="Bangalô Sushi Lounge - Qualidade, sabor e tradição"
              :max-width="$vuetify.breakpoint.smAndDown ? 260 : 420"
              :max-height="$vuetify.breakpoint.smAndDown ? 180 : 440"
              class="elevation-12 hero-main-img"
              style="border-radius: 24px; object-fit: cover; background: #fff;"
              contain
            />
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

interface CTA {
  text: string
  outlined?: boolean
  href?: () => void
  target?: string
}

@Component({
  name: 'HeroBangalo'
})
export default class HeroBangalo extends Vue {
  ctas: CTA[] = [
    { text: 'Peça Agora', outlined: false, href: () => this.$router.replace("/produtos/delivery/vamoscomecar") },
    { text: 'Ver Cardápio', outlined: true, href: () => this.$vuetify.goTo("#cardapio") }
  ]
}
</script>

<style lang="stylus" scoped>
  .hero-modern
    position relative
    background linear-gradient(120deg, #1f2937 60%, #FFD600 100%)
    min-height 600px
    overflow hidden
    display flex
    align-items center
    @media (max-width: 600px)
      background: linear-gradient(160deg, #1f2937 78%, #ffd600 107%);
      min-height 380px
      padding-top 18px
      padding-bottom 18px

  .hero-bg-logo
    position absolute
    top 50%
    left 50%
    width 600px
    max-width 90vw
    opacity 0.08
    transform translate(-50%, -50%) scale(1.1)
    z-index 1
    pointer-events none
    filter blur(0.5px)
    @media (max-width: 600px)
      width 90vw
      min-width 220px

  .hero-title
    color #fff
    line-height 1.1
    text-align left
    @media (max-width: 600px)
      font-size 2.1rem !important
      text-align center
      margin-bottom 8px

  .hero-title-highlight
    color #FFD600
    background linear-gradient(90deg, #FFD600 60%, #fff 100%)
    -webkit-background-clip text
    -webkit-text-fill-color transparent
    background-clip text

  .hero-subtitle
    color #e0e0e0
    max-width 420px
    @media (max-width: 600px)
      color #fff
      font-size 1.08rem
      text-align center
      margin-bottom 18px
      max-width 95vw
      padding 0 6px

  .hero-cta
    font-size 1.15rem
    letter-spacing 0.5px
    font-weight 700
    @media (max-width: 600px)
      font-size 1.08rem
      border-radius 18px !important
      min-height 48px
      box-shadow 0 2px 12px rgba(31,41,55,0.10)
      margin-bottom 10px
      margin-right 0 !important
      width 100% !important
      padding 0

  .hero-main-img
    margin-top 32px
    margin-bottom 32px
    display block
    box-sizing border-box
    position relative
    box-shadow 0 16px 48px 0 rgba(0,0,0,0.18)
    border 4px solid #FFD600
    @media (max-width: 600px)
      margin-top 12px
      margin-bottom 12px
      border-radius 18px
      max-width 90vw !important
      max-height 180px !important
      left 0 !important

  .hero-text-col-mobile
    align-items center !important
    text-align center !important
    padding 0 !important
    margin 0 !important

  .hero-img-col-mobile
    justify-content center !important
    align-items center !important
    display flex !important
    margin-top 0 !important
    margin-bottom 0 !important

  .hero-top-text
    font-size 0.98rem
    letter-spacing 1.2px
    margin-bottom 8px
    @media (max-width: 600px)
      font-size 0.93rem
      margin-bottom 6px
      color #FFD600
</style>
