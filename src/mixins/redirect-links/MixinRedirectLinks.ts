import { Component, Vue } from "vue-property-decorator"

@Component({})

export default class MixinRedirectLinks extends Vue {
  goToHome (): void {
    location.replace(`/${location.search}`)
  }

  returnProductRoute (key?: string): void {
    if (key) {
      location.replace(`/produto/${key}/vamoscomecar${location.search}`)
    } else {
      location.replace(`/produto/${this.$route.params.type}/vamoscomecar${location.search}`)
    }
  }

  goToAdminLogin(): void {
    location.replace(`/admin/login${location.search}`)
  }

  goToDatailOrder (): void {
    location.replace(`/detalhes/pedido${location.search}`)
  }
}
