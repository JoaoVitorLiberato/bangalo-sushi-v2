import { Component, Vue } from "vue-property-decorator"

@Component({})

export class MixinRedirectLinks extends Vue {
  goToHome (): void {
    location.replace(`/${location.search}`)
  }

  returnProductRoute (key?: string): void {
    if (key) {
      location.replace(`/produtos/${key}/vamoscomecar${location.search}`)
    } else {
      location.replace(`/produtos/${this.$route.params.type}/vamoscomecar${location.search}`)
    }
  }

  goToAdminLogin(): void {
    this.$router.push(`/admin${location.search}`)
  }

  goToDatailOrder (): void {
    this.$router.replace(`/detalhes/pedido${location.search}`)
  }

  goToDatailOrderForm (): void {
    this.$router.replace(`/detalhes/finalizar-compra${location.search}`)
  }

  goToDetailsAdmin (data: { permision:string, session:string }): void {
    this.$router.replace(`/admin/detalhes/${data.permision}/${data.session}`)
  }
}
