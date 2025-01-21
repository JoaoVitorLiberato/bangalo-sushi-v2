<template>
  <v-container
    fluid
  >
    <v-row
      no-gutters
      style="max-width:414px;margin:0 auto."
    >
      <v-col
        cols="12"
      >
        <v-img
          src="/favicon.png"
          alt="Bangalô Sushi Lounge - O melhor sushi de Santa Luzia de Paruá"
          contain
        />
      </v-col>

      <v-col
        cols="12"
        class="py-2"
      />

      <v-col
        cols="12"
      >
        <v-form>
          <v-row
            no-gutters
          >
            <v-col
              v-for="({ type, valid, label }, name) in adminData"
              :key="`input-form-admin-${name}`"
              cols="12"
              class="my-2"
            >
              <v-text-field
                v-model="adminData[name].value"
                :label="label"
                :rules="[required, valid]"
                :type="type"
                hide-details="auto"
                outlined
                color="secondary"
              />
            </v-col>


            <v-col
              cols="12"
              class="my-2"
            />

            <v-col
              cols="12"
            >
              <v-btn
                block
                depressed
                color="secondary"
                x-large
                rounded
              >
                <span
                  class="black--text font-weight-bold"
                >
                  Entrar
                </span>
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator"
  import { required } from "@/helpers/rules"

  @Component({})
  export default class ViewAuthLogin extends Vue {
    required = required
    adminData: {
      [key:string]: {
        [key:string]: string
      }
    } = {
      email: {
        label: "E-mail",
        value: "",
        valid: "",
        type: "email"
      },
      password: {
        label: "Senha",
        value: "",
        valid: "",
        type: "password"
      }
    }
  }
</script>
