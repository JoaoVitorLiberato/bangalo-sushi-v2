<template>
  <v-footer
    dark
    class="footer-component"
    padless
  >
    <!-- Main Footer Content -->
    <v-container fluid class="pa-0">
      <!-- Top Section with Links -->
      <v-row no-gutters class="footer-main">
        <v-col cols="12">
          <v-container max-width="1400">
            <v-row no-gutters>
              <!-- Company Info -->
              <v-col cols="12" md="6" class="pa-4">
                <div class="footer-section">
                  <div class="footer-logo mb-4">
                    <h3 class="text-h5 font-weight-bold text-uppercase">
                      <span class="primary--text">Bangalo</span>
                      <span class="secondary--text">Sushi</span>
                    </h3>
                    <p class="text-caption text-medium-emphasis mt-2">
                      Sabor japonês autêntico em cada mordida
                    </p>
                  </div>

                  <p class="text-body-2 text-medium-emphasis mb-4">
                    Descubra a autenticidade da culinária japonesa com nossos pratos especiais,
                    preparados com ingredientes frescos e técnicas tradicionais.
                  </p>

                  <!-- Social Media -->
                  <div class="social-media">
                    <h4 class="text-subtitle-1 font-weight-medium mb-3">Siga-nos</h4>
                    <div class="social-icons">
                      <v-btn
                        icon
                        small
                        color="secondary"
                        class="mr-3"
                        aria-label="Instagram"
                      >
                        <span class="material-icons">photo_camera</span>
                      </v-btn>
                      <v-btn
                        icon
                        small
                        color="secondary"
                        class="mr-3"
                        aria-label="Facebook"
                      >
                        <span class="material-icons">facebook</span>
                      </v-btn>
                    </div>
                  </div>
                </div>
              </v-col>

              <!-- Contact Info -->
              <v-col cols="12" md="6" class="pa-4">
                <div class="footer-section">
                  <h4 class="text-h6 font-weight-bold mb-4 text-uppercase">
                    Contato
                  </h4>

                  <div class="contact-info">
                    <div class="contact-item mb-3">
                      <div class="d-flex align-center">
                        <span class="material-icons" style="color: #FFD600; font-size: 18px; margin-right: 12px;">place</span>
                        <div>
                          <p class="text-body-2 font-weight-medium mb-1">Endereço</p>
                          <p class="text-caption text-medium-emphasis">
                            R. João Castelo, 59<br>
                            Santa Luzia de Paruá - MA
                          </p>
                        </div>
                      </div>
                    </div>

                    <div class="contact-item mb-3">
                      <div class="d-flex align-center">
                        <span class="material-icons" style="color: #FFD600; font-size: 18px; margin-right: 12px;">phone</span>
                        <div>
                          <p class="text-body-2 font-weight-medium mb-1">Telefone</p>
                          <p class="text-caption text-medium-emphasis">
                            (98) 9 8509-4324
                          </p>
                        </div>
                      </div>
                    </div>

                    <div class="contact-item">
                      <div class="d-flex align-center">
                        <span class="material-icons" style="color: #FFD600; font-size: 18px; margin-right: 12px;">schedule</span>
                        <div>
                          <p class="text-body-2 font-weight-medium mb-1">Horário</p>
                          <p class="text-caption text-medium-emphasis">
                            Seg-Sex: 11h às 22h<br>
                            Sáb-Dom: 12h às 23h
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>

      <!-- Bottom Section -->
      <v-row no-gutters class="footer-bottom">
        <v-col cols="12">
          <v-container max-width="1400">
            <v-row no-gutters align="center" justify="space-between">
              <v-col cols="12" sm="6" class="py-3">
                <p class="text-caption text-center text-sm-left mb-0">
                  © {{ currentYear }} Bangalo Sushi. Todos os direitos reservados.
                </p>
              </v-col>

              <v-col cols="12" sm="6" class="py-3">
                <div class="d-flex justify-center justify-sm-end">
                  <v-btn
                    text
                    small
                    color="secondary"
                    class="text-caption"
                    @click="scrollToTop"
                  >
                    <span class="material-icons" style="font-size: 16px; margin-right: 4px;">keyboard_arrow_up</span>
                    Voltar ao topo
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator"

  @Component({})
  export default class FooterComponent extends Vue {
    get currentYear(): number {
      return new Date().getFullYear()
    }

    scrollToTop(): void {
      this.$vuetify.goTo(0, {
        duration: 500,
        easing: 'easeInOutCubic'
      })
    }
  }
</script>

<style lang="stylus" scoped>
  // Variables
  $primary-color = #1f2937
  $secondary-color = #FFD600
  $footer-bg = #0f172a
  $footer-text = #94a3b8

  .footer-component
    background linear-gradient(135deg, $footer-bg 0%, #1e293b 100%)
    color $footer-text
    position relative
    overflow hidden

    &::before
      content ''
      position absolute
      top 0
      left 0
      right 0
      height 1px
      background linear-gradient(90deg, transparent 0%, $secondary-color 50%, transparent 100%)

  .footer-main
    padding 60px 0 40px
    @media (max-width: 600px)
      padding 40px 0 20px

  .footer-section
    height 100%

  .footer-logo
    h3
      letter-spacing 2px
      margin-bottom 8px

  .social-media
    .social-icons
      .v-btn
        transition all 0.3s ease
        &:hover
          transform translateY(-2px)
          box-shadow 0 4px 12px rgba(255, 214, 0, 0.3)

  .contact-info
    .contact-item
      padding 8px 0

      .material-icons
        flex-shrink 0

  .footer-bottom
    background rgba(0, 0, 0, 0.2)
    border-top 1px solid rgba(255, 255, 255, 0.1)

    .v-btn
      transition all 0.3s ease
      &:hover
        transform translateY(-1px)
        color $secondary-color

  // Responsive adjustments
  @media (max-width: 960px)
    .footer-section
      text-align center
      margin-bottom 32px
      &:last-child
        margin-bottom 0
      .contact-info
        align-items center
        display flex
        flex-direction column
        text-align center
        width 100%
        .contact-item
          width 100%
          justify-content center
          .d-flex
            justify-content center
            width 100%

  @media (max-width: 600px)
    .footer-main
      .v-col
        padding 16px !important

    .footer-bottom
      text-align center

      .v-col
        padding 8px !important

  // Animation for social icons
  .social-icons .v-btn
    animation fadeInUp 0.6s ease forwards
    opacity 0
    transform translateY(20px)

    &:nth-child(1)
      animation-delay 0.1s
    &:nth-child(2)
      animation-delay 0.2s
    &:nth-child(3)
      animation-delay 0.3s
    &:nth-child(4)
      animation-delay 0.4s

  @keyframes fadeInUp
    to
      opacity 1
      transform translateY(0)
</style>
