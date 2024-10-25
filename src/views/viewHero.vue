<template>
  <v-row
    no-gutters
  >
    <v-col
      cols="12"
    >
      <v-img
        src="/img/project/sushi-bank.jpg"
        :height="$vuetify.breakpoint.smAndDown ? 320 : 400"
        alt="O melhor sushi de Santa Luzia de Paruá"
      >
        <v-row
          no-gutters
          class="fill-height"
        >
          <v-col
            cols="12"
            md="5"
            :style="`background-color:#ffffffdb;border-radius:${$vuetify.breakpoint.mdAndUp ? '0 70px 70px 0' : '0'};`"
            class="px-3 py-6"
          >
            <v-row
              align="center"
              class="text-center"
            >
              <v-col
                cols="12"
                class="py-md-6 py-4"
              />
              <v-col
                cols="12"
              >
                <h4
                  v-font-size="$vuetify.breakpoint.smAndDown ? 12 : 16"
                  class="text-uppercase font-weigt-medium"
                >
                  Qualidade, Sabor e Tradição
                </h4>
              </v-col>

              <v-col
                cols="12"
                style="line-height:1"
              >
                <h1
                  class="font-weigt-bold mb-1"
                  :style="$vuetify.breakpoint.smAndDown ? 'font-size: 25px;line-height: 25px;color:var(--v-primary-text)' : 'font-size:37px;line-height: 40px;color:var(--v-primary-text)'"
                >
                  Seu Cantinho do Japão<br> Mais Próximo de Você
                </h1>

                <span
                  v-font-size="$vuetify.breakpoint.smAndDown ? 12 : 14"
                  style="line-height:10px"
                  class="font-weight-regular"
                >
                  Experimente a Autêntica Culinária Japonesa<br> no Bangalô Sushi Lounge
                </span>
              </v-col>

              <v-col
                cols="12"
              >
                <v-row
                  no-gutters
                >
                  <v-col
                    cols="12 mt-md-3"
                  >
                    <v-btn
                      class="text-none"
                      color="secondary"
                      depressed
                      large
                      width="300"
                      title="Faça seu pedido via delivery"
                      @click.stop="returnProductRoute('delivery')"
                    >
                      <span
                        v-font-size="14"
                        class="font-weight-bold text-uppercase black--text"
                      >
                        Fazer meu pedido (Delivery)
                      </span>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-img>
    </v-col>
  </v-row>
</template>

<script lang="ts">
  import { Component } from "vue-property-decorator"
  import { mixins } from "vue-class-component"
  import MixinRedirectLinks from "@/mixins/redirect-links/MixinRedirectLinks"

  @Component({})

  export default class viewHero extends mixins(
    MixinRedirectLinks,
  ) {}
</script>
