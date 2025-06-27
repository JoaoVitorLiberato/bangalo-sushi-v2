<template>
  <div class="cook-bg-gradient py-6 px-2">
    <v-card
      class="cook-card-elevated"
      elevation="8"
      color="#fff"
    >
      <v-row no-gutters class="pa-4 pa-md-8">
        <v-col v-width.max="'1200px'" cols="12" class="mx-auto">
          <v-row no-gutters>
            <v-col cols="12" class="text-center pt-8">
              <h2 class="font-weight-bold text-uppercase cook-title">
                Curiosidades sobre o CEO do Bangalô Sushi Lounge
              </h2>
            </v-col>
            <v-col cols="12" class="py-4 py-md-6" />
            <v-col cols="12">
              <v-row no-gutters justify="center" align="center">
                <v-col
                  cols="12"
                  md="4"
                  class="mx-auto mx-md-2 d-flex justify-center align-center"
                >
                  <div class="cook-img-wrapper">
                    <v-img
                      src="/img/project/ceo-sushi.jpg"
                      alt="Imagem do CEO e Sushiman do Bangalô Sushi Lounge"
                      contain
                      width="340"
                      height="440"
                      class="cook-img"
                    />
                  </div>
                </v-col>
                <v-col cols="12" class="py-4 hidden-md-and-up" />
                <v-col cols="12" md="7" class="px-md-6">
                  <v-row no-gutters>
                    <v-col cols="12" class="text-center text-md-left mb-2">
                      <h2 class="font-weight-bold cook-name mb-1">Lailson Leal</h2>
                      <span class="font-weight-medium cook-role">Ceo & Sushiman</span>
                    </v-col>
                    <v-col cols="12" class="py-2" />
                    <v-col cols="12" style="line-height:22px">
                      <p class="font-weight-regular cook-text">
                        Lailson, {{ new Date().getFullYear() - 1998 }} anos, sushiman e empreendedor visionário não apenas encanta paladares exigentes,
                        mas também molda destinos gastronômicos com sua criatividade e paixão. Apaixonado pela arte da culinária desde
                        tenra idade, encontrou sua verdadeira vocação na fusão de sabores orientais e ocidentais.
                        Sua jornada rumo à excelência culinária foi pavimentada com uma combinação única de talento inato,
                        trabalho árduo e uma curiosidade insaciável.
                      </p>
                    </v-col>
                    <v-col cols="12" class="py-2" />
                    <v-col cols="12" style="line-height:22px">
                      <p class="font-weight-regular cook-text">
                        Em um momento de inspiração que Lailson deu vida ao Bangalô Sushi,
                        uma ode à delicadeza e complexidade da culinária japonesa, imbuída com um toque de brasilidade.
                        O Bangalô Sushi é uma variação contemporânea da culinária japonesa, fundindo técnicas tradicionais
                        com influências modernas. Essa tendência gastronômica muitas vezes combina elementos do sushi com toques
                        criativos e apresentação sofisticada, muitas vezes servidos em espaços elegantes e descontraídos. É uma experiência que apela tanto para os amantes da culinária japonesa
                        tradicional quanto para aqueles em busca de novas interpretações e sabores únicos.
                      </p>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator"

  @Component({})
  export default class viewDesciptionCook extends Vue {}
</script>

<style lang="stylus" scoped>
.cook-bg-gradient
  min-height 100vh
  background linear-gradient(120deg, #f2f2f2 60%, #FFD600 100%)
  padding 0

.cook-card-elevated
  border-radius 24px
  box-shadow 0 8px 32px 0 rgba(31,41,55,0.10)
  max-width 1200px
  margin 48px auto
  padding 0

.cook-title
  font-size 2rem
  color #1f2937
  letter-spacing 1px
  margin-bottom 0

.cook-img-wrapper
  border-radius 18px
  overflow hidden
  box-shadow 0 4px 24px 0 rgba(31,41,55,0.10)
  transition box-shadow 0.3s
  background #fff
  &:hover
    box-shadow 0 8px 32px 0 rgba(31,41,55,0.18)

.cook-img
  border-radius 18px
  object-fit cover

.cook-name
  font-size 1.7rem
  color #FFD600
  letter-spacing 0.5px
  margin-bottom 0

.cook-role
  font-size 1.1rem
  color #1f2937
  opacity 0.7
  margin-bottom 0

.cook-text
  font-size 1.08rem
  color #444
  text-align justify
  margin-bottom 0

@media (max-width: 960px)
  .cook-card-elevated
    margin 24px 8px
    padding 0
  .cook-img-wrapper
    margin-bottom 24px
  .cook-title
    font-size 1.3rem
  .cook-name
    font-size 1.2rem
  .cook-role
    font-size 1rem
  .cook-text
    font-size 0.98rem

@media (max-width: 600px)
  .cook-card-elevated
    margin 12px 0
    border-radius 12px
  .cook-title
    font-size 1.1rem
  .cook-img-wrapper
    border-radius 10px
  .cook-img
    border-radius 10px
</style>
