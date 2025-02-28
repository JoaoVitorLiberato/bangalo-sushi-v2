<template>
  <v-card
    v-border.radius="'0px'"
    elevation="0"
    color="#f2f2f2"
  >
    <v-row
      no-gutters
      class="lighten-1 pa-4"
    >
      <v-col
        v-width.max="'1400px'"
        cols="12"
        class="mx-auto"
      >
        <v-row
          no-gutters
        >
          <v-col
            cols="12"
            style="line-height:1"
            class="text-center pt-8"
          >
            <h2
              v-font-size="$vuetify.breakpoint.smAndDown ? 19 : 27"
              class="font-weight-bold text-uppercase"
            >
              Curiosidades sobre o CEO da Bangalô Sushi Lounge
            </h2>
          </v-col>

          <v-col
            cols="12"
            class="py-4 py-md-6"
          />

          <v-col
            cols="12"
          >
            <v-row
              no-gutters
              justify="center"
            >
              <v-col
                v-width.max="$vuetify.breakpoint.smAndDown ? '400px': ''"
                cols="12"
                :md="$vuetify.breakpoint.width >= 965 && $vuetify.breakpoint.width < 1200 ? 5 : 4"
                class="mx-auto mx-md-2"
              >
                <v-img
                  v-border.radius="'10px 0 0 10px'"
                  src="/img/project/ceo-sushi.jpg"
                  alt="Imagem do CEO e Sushiman do Yumi shusi"
                  contain
                  width="400"
                  height="500"
                />
              </v-col>

              <v-col
                cols="12"
                class="py-4 hidden-md-and-up"
              />

              <v-col
                cols="12"
                :md="$vuetify.breakpoint.width >= 965 && $vuetify.breakpoint.width < 1200 ? 6 : 5"
              >
                <v-row
                  no-gutters
                >
                  <v-col
                    cols="12"
                    style="line-height:1"
                    class="text-center text-md-start"
                  >
                    <h2
                      v-font-size="28"
                      class="font-weight-medium"
                    >
                      Lailson Leal
                    </h2>
                    <span
                      v-font-size="15"
                      class="font-weight-thin font-italic"
                    >
                      Ceo &amp; Sushiman
                    </span>
                  </v-col>

                  <v-col
                    cols="12"
                    class="py-3"
                  />

                  <v-col
                    cols="12"
                    style="line-height:22px"
                  >
                    <p
                      class="font-weight-regular"
                    >
                      Lailson, {{ new Date().getFullYear() - 1998 }} anos, sushiman e empreendedor visionário não apenas encanta paladares exigentes,
                      mas também molda destinos gastronômicos com sua criatividade e paixão. Apaixonado pela arte da culinária desde
                      tenra idade, encontrou sua verdadeira vocação na fusão de sabores orientais e ocidentais.
                      Sua jornada rumo à excelência culinária foi pavimentada com uma combinação única de talento inato,
                      trabalho árduo e uma curiosidade insaciável.

                    </p>
                  </v-col>

                  <v-col
                    cols="12"
                    class="py-3"
                  />

                  <v-col
                    cols="12"
                    style="line-height:22px"
                  >
                    <p
                      class="font-weight-regular"
                    >
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
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator"

  @Component({})
  export default class viewDesciptionCook extends Vue {}
</script>
