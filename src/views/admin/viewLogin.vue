<template>
  <v-container
    fluid
  >
    <v-row
      no-gutters
      align="center"
      justify="center"
      justify-md="space-between"
      :style="`max-width:${$vuetify.breakpoint.smAndDown ? 414 : 1100}px;margin:0 auto`"
    >
      <v-col
        cols="12"
        md="5"
      >
        <v-img
          src="/favicon.png"
          alt="Bangalô Sushi Lounge - O melhor sushi de Santa Luzia de Paruá"
          :width="$vuetify.breakpoint.smAndDown ? '100%' : 594"
          :height="$vuetify.breakpoint.smAndDown ? 230 : 420"
          contain
        />
      </v-col>

      <v-col
        cols="12"
        class="py-2 hidden-md-and-up"
      />

      <v-col
        cols="12"
        md="5"
      >
        <v-form
          v-model="formValidate"
          ref="formvalidate"
        >
          <v-row
            no-gutters
          >
            <v-col
              v-for="({ type, label }, input) in admin_data_form"
              :key="`input-form-admin-${input}`"
              cols="12"
              class="my-2"
            >
              <v-text-field
                v-model="admin_data_form[input].value"
                :label="label"
                :rules="[required, admin_data_form[input].valid]"
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
                :disabled="cacheFrameLoading.status"
                @click.stop="validateDataForm ? signinAdmin() : validate()"
              >
                <span
                  class="black--text font-weight-bold"
                >
                  {{ cacheFrameLoading.status ? "Aguarde..." : "Entrar" }}
                </span>
              </v-btn>
            </v-col>
          </v-row>
        </v-form>

        <v-snackbar
          :timeout="7000"
          :value="snackbar.status"
          absolute
          bottom
          color="red"
          text
          max-width="310"
          transition="scale-transition"
        >
          <div
            class="text-center"
          >
            <span
              class="font-weight-regular"
              v-text="snackbar.message"
            />
          </div>
        </v-snackbar>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
  import { Component, Watch } from "vue-property-decorator"
  import { mixins } from "vue-class-component"
  import { required, email } from "@/helpers/rules"
  import { $refs } from "@/implements/types"
  import { mixinServiceAuthAdmin } from "@/mixins/services/mixinServiceAuthAdmin"
  import { MixinRedirectLinks } from "@/mixins/redirect-links/MixinRedirectLinks"

  @Component({})
  export default class ViewAuthLogin extends mixins(
    mixinServiceAuthAdmin,
    MixinRedirectLinks,
  ) implements $refs {
    $refs

    required = required
    formValidate = false
    loadingService = false
    snackbar = {
      status: false,
      message: ""
    }

    get validateDataForm (): boolean {
      return [
        this.formValidate
      ].every(o=>!!o)
    }

    admin_data_form: {
      [key:string]: {
        [key:string]: string|boolean
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

    @Watch("admin_data_form", { deep: true })
      changeAdminDataForm (): void {
        Object.keys(this.admin_data_form).forEach(input => {
          if (/^(email)$/i.test(String(input))) {
            this.admin_data_form[input].valid = email(String(this.admin_data_form[input].value))
          }

          if (/^(password)$/i.test(String(input))) {
            if (String(this.admin_data_form[input].value).length < 8) {
              this.admin_data_form[input].valid = "Min. 8 caracteres"
            } else this.admin_data_form[input].valid = true
          }
        })
      }

    validate (): void {
      if (this.$refs.formvalidate.validate) {
        this.$refs.formvalidate.validate()
      }
    }

    async signinAdmin (): Promise<void> {
      try {
        const RESPONSE_MIXIN = await this.signinUser(
          {
            email: this.admin_data_form.email.value as string,
            password: this.admin_data_form.password.value as string,
          }
        )

        if ("error" in RESPONSE_MIXIN) throw Error(RESPONSE_MIXIN.error)


        location.replace(`https://sushi-project-alpha.vercel.app/admin?token=${RESPONSE_MIXIN.token}&role=${RESPONSE_MIXIN.role}&user=${this.admin_data_form.email.value}`)
      } catch (error) {
        const ERROR_SPLITED = String(error).split(": ")

        if (String(ERROR_SPLITED[1]) === "senha incorreta") {
          this.snackbar = {
            status: true,
            message: `E-mail ou senha incorreto.`,
          }
        } else {
          this.snackbar = {
            status: true,
            message: `
              Usuário não encontrado, Por favor, tente novamente.
            `,
          }
        }
      } finally {
        setTimeout(() => { this.snackbar.status = false }, 7000)
      }
    }
  }
</script>
