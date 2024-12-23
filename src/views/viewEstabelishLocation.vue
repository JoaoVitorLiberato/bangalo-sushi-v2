<template>
  <v-row
    no-gutters
    class="px-4 py-8"
  >
    <v-col
      cols="12"
    >
      <v-row
        v-width.max="'1400px'"
        no-gutters
        justify="center"
        class="mx-auto"
      >
        <v-col
          cols="12"
          md="5"
        >
          <v-row
            no-gutters
          >
            <v-col
              cols="12"
              class="text-center text-md-start"
            >
              <span
                v-font-size="$vuetify.breakpoint.smAndDown ? 19 : 24"
                class="font-weight-medium"
              >
                Onde você pode nos encontrar?
              </span>
            </v-col>

            <v-col
              cols="12"
              class="py-2"
            />

            <v-col
              cols="12"
              class="text-center text-md-start"
            >
              <span
                v-font-size="17"
                class="font-weight-thin font-italic"
              >
                Av. Prof. João Morais de Sousa, Localizado na praça de<br class="hidden-sm-and-down"> alimentação do Águia, Santa Luzia de Paruá - MA
              </span>
            </v-col>

            <v-col
              cols="12"
              class="py-2"
            />

            <v-col
              cols="12"
              class="text-center text-md-start"
            >
              <p
                v-font-size="16"
                class="font-weight-medium"
              >
                Ou fale conosco através do WhatsApp:
              </p>

              <a
                href="https://wa.me/98985094324"
                style="color:var(--v-primary-text)"
                class="d-flex align-center justify-center justify-md-start"
                title="Clique aqui para entrar em contato com Bangalô Sushi Lounge via WhatsApp"
                target="_blank"
              >
                <span
                  class="mr-2 font-weigth-regular"
                >
                  (98) 9 8509-4324
                </span>
                <img
                  src="/img/project/rede-sociais/whatsapp.png"
                  alt="Entre em contato através do WhatsApp com o Bangalô Sushi Lounge"
                  width="20"
                  height="20"
                />
              </a>
            </v-col>
          </v-row>
        </v-col>

        <v-col
          cols="12"
          class="py-4 hidden-md-and-up"
        />

        <v-col
          cols="12"
          :md="$vuetify.breakpoint.width >= 965 && $vuetify.breakpoint.width < 1200 ? 6 : 4"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7971.757999592258!2d-45.78272450566551!3d-2.546287689728101!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x92b3907a2690c73d%3A0x2b53d0b87609ad91!2sSanta%20Luzia%20do%20Paru%C3%A1%2C%20MA%2C%2065272-000%2C%20Brasil!5e0!3m2!1spt-BR!2sus!4v1734981996586!5m2!1spt-BR!2sus"
            alt="Saiba mais sobre nossa localização clicando no mapa"
            title="Saiba mais sobre nossa localização clicando no mapa"
            :width="$vuetify.breakpoint.smAndDown ? '100%' : 500"
            :height="$vuetify.breakpoint.smAndDown ? 300 : 350"
            style="border:0;border-radius:15px"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator"

  @Component({})
  export default class viewEstabelishLocation extends Vue {}
</script>
