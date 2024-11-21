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
    location.replace(`/admin/login${location.search}`)
  }

  goToDatailOrder (): void {
    this.$router.replace(`/detalhes/pedido${location.search}`)
  }
}
