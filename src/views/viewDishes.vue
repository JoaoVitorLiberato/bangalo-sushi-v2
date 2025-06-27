<template>
  <v-container fluid class="pa-0">
    <!-- Hero Section -->
    <v-row no-gutters class="hero-section hero-section-dishes">
      <v-col cols="12" class="text-center py-12 hero-col-mobile">
        <h1
          class="text-h3 text-h4-sm font-weight-bold text-uppercase mb-4 white--text hero-title-dishes"
        >
          Nossos Pratos Especiais
        </h1>
        <p class="text-body-1 text-medium-emphasis max-width-600 mx-auto px-4 hero-desc-dishes">
          Descubra nossa seleção exclusiva de pratos japoneses preparados com ingredientes frescos e técnicas tradicionais
        </p>
      </v-col>
    </v-row>

    <!-- Category Filter Section -->
    <v-row no-gutters class="category-filter-section py-6" id="cardapio">
      <v-col cols="12">
        <v-container max-width="600">
          <div class="text-center">
            <h3 class="text-h6 font-weight-medium mb-4 grey--text text--darken-2">
              Escolha uma categoria
            </h3>

            <!-- Desktop: Chips -->
            <div class="d-none d-md-block">
              <div class="category-chips-container">
                <v-chip
                  v-for="cat in categories"
                  :key="cat.id"
                  :color="selectedCategory === cat.id ? 'secondary' : 'grey lighten-3'"
                  :text-color="selectedCategory === cat.id ? 'white' : 'grey darken-2'"
                  class="ma-1 category-chip"
                  large
                  @click="selectCategory(cat.id)"
                >
                  <v-icon left class="mr-2">
                    restaurant
                  </v-icon>
                  {{ cat.name }}
                </v-chip>
              </div>
            </div>

            <!-- Mobile: Autocomplete -->
            <div class="d-md-none">
              <v-autocomplete
                v-model="selectedCategory"
                :items="categories"
                item-text="name"
                item-value="id"
                outlined
                hide-details
                placeholder="Selecione uma categoria"
                prepend-inner-icon="restaurant"
                clearable
                color="secondary"
                class="category-autocomplete"
                @change="onCategoryChange"
              >
                <template v-slot:item="{ item }">
                  <v-icon left class="mr-3">restaurant</v-icon>
                  {{ item.name }}
                </template>
              </v-autocomplete>
            </div>
          </div>
        </v-container>
      </v-col>
    </v-row>

    <v-row no-gutters class="products-section pb-12">
      <v-col cols="12">
        <v-container max-width="1400">
          <!-- Loading State -->
          <v-row v-if="getCacheFrameLoading().status" no-gutters>
            <v-col
              v-for="n in 6"
              :key="n"
              cols="12"
              sm="6"
              md="4"
              lg="3"
              class="pa-2"
            >
              <v-skeleton-loader
                type="card"
                class="mx-auto"
                max-width="300"
              />
            </v-col>
          </v-row>


          <v-row
            v-else
            no-gutters
            justify="center"
          >
            <v-col
              v-for="product in paginatedProducts"
              :key="product.id || product.name"
              cols="12"
              sm="6"
              md="4"
              lg="3"
              class="pa-2"
            >
              <v-card
                class="product-card mx-auto"
                max-width="320"
                elevation="4"
                hover
                @click="selectProduct(product)"
              >
                <div class="product-image-container">
                  <v-img
                    :src="product.url_image"
                    :alt="product.name"
                    :title="product.name"
                    height="200"
                    cover
                    class="product-image"
                  >
                    <template v-slot:placeholder>
                      <v-row class="fill-height ma-0" align="center" justify="center">
                        <v-progress-circular indeterminate color="primary" />
                      </v-row>
                    </template>
                  </v-img>
                  <!-- Category Badge -->
                  <v-chip
                    color="grey"
                    text-color="white"
                    small
                    class="category-badge"
                  >
                    {{ product.category.name }}
                  </v-chip>
                </div>

                <v-card-text class="pa-4">
                  <h3 class="text-h6 font-weight-bold mb-2 product-name">
                    {{ product.name }}
                  </h3>
                  <p class="text-body-2 text-medium-emphasis mb-3 product-description">
                    {{ product.description }}
                  </p>

                  <div class="price-section">
                    <div class="d-flex align-center justify-space-between">
                      <div class="price-info">
                        <span class="text-h6 font-weight-bold secondary--text">
                          R$ {{ getReadingValue(Number(product.price), ".") }}
                        </span>
                      </div>

                      <v-btn
                        color="secondary"
                        rounded
                        small
                        depressed
                        @click.stop="viewProductDetails(product)"
                      >
                        <v-icon left small>visibility</v-icon>
                        Ver
                      </v-btn>
                    </div>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <!-- Controles de paginação -->
          <div
            v-if="filteredProducts.length > 0 && !getCacheFrameLoading().status"
            class="pagination-ux my-10">
            <v-btn
              color="secondary"
              outlined
              rounded
              elevation="3"
              :disabled="currentPage === 1"
              @click="prevPage"
              class="pagination-btn-ux"
              aria-label="Página anterior"
            >
              <transition name="icon-bounce">
                <v-icon left v-if="currentPage !== 1">chevron_left</v-icon>
              </transition>
              <span class="pagination-btn-label">Anterior</span>
            </v-btn>
            <span class="pagination-info-ux" aria-live="polite">
              <span class="pagination-page-ux">{{ currentPage }}</span>
              <span class="pagination-separator-ux">/</span>
              <span class="pagination-total-ux">{{ totalPages }}</span>
            </span>
            <v-btn
              color="secondary"
              outlined
              rounded
              elevation="3"
              :disabled="currentPage === totalPages"
              @click="nextPage"
              class="pagination-btn-ux"
              aria-label="Próxima página"
            >
              <span class="pagination-btn-label">Próxima</span>
              <transition name="icon-bounce">
                <v-icon right v-if="currentPage !== totalPages">chevron_right</v-icon>
              </transition>
            </v-btn>
          </div>

          <v-row v-if="filteredProducts.length === 0 && !getCacheFrameLoading().status" no-gutters>
            <v-col cols="12" class="text-center py-12">
              <v-icon size="64" color="grey lighten-1" class="mb-4">no_food</v-icon>
              <h3 class="text-h5 text-medium-emphasis mb-2">Nenhum produto encontrado</h3>
              <p class="text-body-1 text-medium-emphasis">
                Não encontramos produtos na categoria selecionada.
              </p>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>

    <v-dialog
      v-model="showProductDialog"
      :max-width="$vuetify.breakpoint.smAndDown ? '100vw' : '500px'"
      :fullscreen="$vuetify.breakpoint.smAndDown"
      scrollable
      transition="dialog-bottom-transition"
      persistent
    >
      <v-card
        v-if="selectedProductData"
        class="dialog-product-card"
        :class="{ 'dialog-mobile': $vuetify.breakpoint.smAndDown }"
      >
        <v-btn
          icon
          large
          color="grey darken-2"
          class="dialog-close-btn"
          @click="closeProductDialog"
          aria-label="Fechar"
        >
          <v-icon>close</v-icon>
        </v-btn>
        <v-img
          :src="selectedProductData.url_image"
          :alt="selectedProductData.name"
          height="220"
          contain
          class="dialog-product-img"
        />
        <v-card-title class="dialog-product-title">
          {{ selectedProductData.name }}
        </v-card-title>
        <v-card-text class="dialog-product-desc">
          <p>{{ selectedProductData.description }}</p>
          <div class="price-details mb-4">
            <span class="dialog-product-price">
              R$ {{ getReadingValue(Number(selectedProductData.price), ".") }}
            </span>
          </div>
          <v-chip
            color="grey"
            text-color="white"
            class="mb-4"
          >
            {{ selectedProductData.category.name }}
          </v-chip>
        </v-card-text>
        <v-card-actions class="dialog-product-actions">
          <v-btn
            color="secondary"
            large
            block
            rounded
            depressed
            @click="addToCart()"
          >
            <v-icon left>add_shopping_cart</v-icon>
            Fazer meu pedido
          </v-btn>
        </v-card-actions>
      </v-card>
      <div v-else class="d-flex flex-column align-center justify-center pa-8">
        <v-skeleton-loader type="card" width="100%" height="300" />
        <span class="grey--text mt-4">Carregando produto...</span>
      </div>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
  import { Component, Watch } from "vue-property-decorator"
  import { mixins } from "vue-class-component"
  import { namespace } from "vuex-class"
  import { filterDataProduct } from "@/helpers/filterProducts"
  import { IproductData } from "@/types/types-product"
  import { MixinServiceProducts } from "@/mixins/services/mixinServiceProducts"
  import { MixinServiceCategories } from "@/mixins/services/mixinServiceCategories"
  import { MixinFunctionsSystem } from "@/mixins/system/MixinFunctionsSystem"

  const cacheStore = namespace("cacheStoreModule")

  @Component({
    components: {}
  })

  export default class viewDishes extends mixins(
    MixinServiceProducts,
    MixinServiceCategories,
    MixinFunctionsSystem
  ) {
    @cacheStore.Getter("CacheFrameLoading") declare getCacheFrameLoading

    filterDataProduct = filterDataProduct

    selectedCategory = ""
    categories = [] as Array<{ id: string, name: string }>
    showProductDialog = false
    selectedProductData: IproductData | null = null

    // Paginação
    currentPage = 1
    pageSize = this.$vuetify.breakpoint.mobile ? 1 : 8

    get filteredProducts(): IproductData[] {
      return filterDataProduct(this.selectedCategory) as IproductData[]
    }

    get paginatedProducts(): IproductData[] {
      const products = Array.isArray(this.filteredProducts) ? this.filteredProducts : [];
      const start = (this.currentPage - 1) * this.pageSize;
      return products.slice(start, start + this.pageSize);
    }

    get totalPages(): number {
      const products = Array.isArray(this.filteredProducts) ? this.filteredProducts : [];
      return Math.ceil(products.length / this.pageSize) || 1;
    }

    nextPage(): void {
      if (this.currentPage < this.totalPages) this.currentPage++
      this.$vuetify.goTo("#cardapio")
    }

    prevPage(): void {
      if (this.currentPage > 1) this.currentPage--
      this.$vuetify.goTo("#cardapio")
    }

    selectCategory(id: string): void {
      this.selectedCategory = id
      this.currentPage = 1 // Resetar página ao trocar categoria
    }

    selectProduct(product: IproductData): void {
      this.selectedProductData = product
      this.showProductDialog = !this.showProductDialog
    }

    viewProductDetails(product: IproductData): void {
      this.selectProduct(product)
    }

    addToCart(): void {
      this.$router.replace("/produtos/delivery/vamoscomecar")
      this.showProductDialog = false
    }

    getFinalPrice(product: IproductData): number {
      return product.price.default
    }

    created(): void {
      this.loadCategories()
      this.loadProducts()
    }

    async loadCategories(): Promise<void> {
      try {
        const response = await this.getAllCategories()
        if (response.length > 0) {
          this.selectCategory(response[0].id)
          this.categories = response
        }
      } catch (error) {
        console.error('Error loading categories:', error)
      }
    }

    async loadProducts(): Promise<void> {
      try {
        await this.getAllProducts()
      } catch (error) {
        console.error('Error loading products:', error)
      }
    }

    onCategoryChange(value: string): void {
      this.selectCategory(value)
    }

    closeProductDialog() {
      this.showProductDialog = false;
      this.selectedProductData = null;
    }

    @Watch('showProductDialog')
    onDialogClose(val: boolean) {
      if (!val) {
        this.selectedProductData = null;
      }
    }
  }
</script>

<style lang="stylus" scoped>
  // Variables
  $primary-color = #1f2937
  $secondary-color = #FFD600
  $grey-light = #f8f9fa
  $grey-border = #e9ecef

  // Mixins
  transition-all()
    transition all 0.3s ease

  hover-lift()
    transform translateY(-2px)
    box-shadow 0 4px 12px rgba(0, 0, 0, 0.15)

  .hero-section-dishes
    background linear-gradient(135deg, #1f2937 0%, #374151 100%)
    color white
    min-height 180px
    display flex
    align-items center
    justify-content center
    @media (max-width: 600px)
      min-height 120px
      padding 24px 0
      .hero-col-mobile
        padding 0 8px !important
      .hero-title-dishes
        font-size 1.45rem !important
        margin-bottom 10px !important
        text-align center
        letter-spacing 1.2px
      .hero-desc-dishes
        font-size 1.01rem !important
        color #e0e0e0 !important
        text-align center
        max-width 98vw
        margin 0 auto
        padding 0 2px

  .category-filter-section
    background-color $grey-light
    border-bottom 1px solid $grey-border

  .category-chips-container
    max-width 1200px
    margin 0 auto
    padding 0 16px

  .category-chip
    transition-all()

    &:hover
      hover-lift()

  .category-autocomplete
    max-width 400px
    margin 0 auto

    ::v-deep .v-input__control
      border-radius 12px

    ::v-deep .v-input__slot
      border-radius 12px
      box-shadow 0 2px 8px rgba(0, 0, 0, 0.1)

      &:hover
        box-shadow 0 4px 12px rgba(0, 0, 0, 0.15)

  .products-section
    background-color #ffffff

  .product-card
    transition-all()
    border-radius 12px
    overflow hidden
    border 1px solid $grey-border

    &:hover
      transform translateY(-8px)
      box-shadow 0 12px 24px rgba(31, 41, 55, 0.15)
      border-color $secondary-color

  .product-image-container
    position relative

  .product-image
    transition transform 0.3s ease

  .product-card:hover .product-image
    transform scale(1.05)

  .category-badge
    position absolute
    top 12px
    left 12px
    z-index 2
    background-color $primary-color !important
    color white !important

  .discount-badge
    position absolute
    top 12px
    right 12px
    z-index 2

  .product-name
    color $primary-color
    line-height 1.3
    display -webkit-box
    -webkit-line-clamp 2
    -webkit-box-orient vertical
    overflow hidden

  .product-description
    line-height 1.4
    display -webkit-box
    -webkit-line-clamp 3
    -webkit-box-orient vertical
    overflow hidden
    color #6b7280

  .price-section
    border-top 1px solid $grey-border
    padding-top 12px

  .price-info
    display flex
    align-items center
    flex-wrap wrap

  .max-width-600
    max-width 600px

  // Responsive adjustments
  @media (max-width: 600px)
    .hero-section
      min-height 150px
      padding 24px 16px

    .category-chips-container
      padding 0 8px

    .category-chip
      margin 4px

    .product-card
      max-width 100% !important

  @media (max-width: 960px)
    .category-chips-container
      display flex
      flex-wrap wrap
      justify-content center

  .pagination-ux
    display flex
    justify-content center
    align-items center
    gap 24px
    margin-top 40px
    margin-bottom 40px
    flex-wrap wrap

    .pagination-btn-ux
      min-width 140px
      font-size 1.15rem
      font-weight 600
      letter-spacing 0.5px
      border-radius 28px
      box-shadow 0 2px 12px rgba(31,41,55,0.10)
      transition all 0.22s cubic-bezier(.4,0,.2,1)
      background #fff
      padding 12px 28px
      display flex
      align-items center
      justify-content center
      position relative
      overflow hidden
      &:hover:not([disabled])
        background $secondary-color
        color #fff
        box-shadow 0 8px 24px 0 rgba(31,41,55,0.18)
        transform translateY(-2px) scale(1.045)
        .v-icon
          color #fff
      &:focus
        outline 2px solid $secondary-color
        outline-offset 2px
      &:active
        transform scale(0.98)
      &[disabled]
        opacity 0.5
        cursor not-allowed

      .pagination-btn-label
        margin 0 4px

    .pagination-info-ux
      display flex
      align-items center
      font-size 1.5rem
      font-weight 700
      color $primary-color
      background #fff
      border-radius 16px
      padding 8px 18px
      box-shadow 0 1px 6px rgba(31,41,55,0.07)
      margin 0 18px

      .pagination-page-ux
        color $secondary-color
        font-size 2rem
        font-weight 800
        margin 0 6px
        transition color 0.2s

      .pagination-separator-ux
        margin 0 6px
        color #bbb
        font-size 1.3rem

      .pagination-total-ux
        color #888
        font-size 1.2rem
        font-weight 600

  // Animação do ícone
  .icon-bounce-enter-active, .icon-bounce-leave-active
    transition transform 0.25s cubic-bezier(.68,-0.55,.27,1.55)
  .icon-bounce-enter, .icon-bounce-leave-to
    transform scale(0.7) rotate(-20deg)
  .icon-bounce-enter-to, .icon-bounce-leave
    transform scale(1) rotate(0deg)

  // Responsivo aprimorado
  @media (max-width: 600px)
    .pagination-ux
      flex-direction column
      gap 12px
      margin-top 18px
      margin-bottom 18px
      .pagination-btn-ux
        min-width 90vw
        max-width 98vw
        width 100%
        font-size 1.05rem
        padding 12px 0
        margin 0
        border-radius 18px
      .pagination-info-ux
        font-size 1.1rem
        padding 6px 0
        margin 0
        border-radius 10px
        .pagination-page-ux
          font-size 1.2rem
        .pagination-separator-ux
          font-size 1rem
        .pagination-total-ux
          font-size 1rem

  .dialog-product-card
    position relative
    border-radius 18px
    overflow hidden
    padding-bottom 0
    @media (max-width: 600px)
      border-radius 0
      min-height 100vh
      max-height 100vh
      padding-bottom 0

  .dialog-close-btn
    position absolute
    top 12px
    right 12px
    z-index 10
    background #fff
    border-radius 50%
    box-shadow 0 2px 8px rgba(31,41,55,0.10)
    &:hover
      background $secondary-color
      color #fff

  .dialog-product-img
    border-radius 18px 18px 0 0
    object-fit cover
    width 100%
    @media (max-width: 600px)
      border-radius 0
      height 180px

  .dialog-product-title
    font-size 1.5rem
    font-weight 700
    color $primary-color
    text-align center
    margin-top 12px
    margin-bottom 0
    @media (max-width: 600px)
      font-size 1.15rem

  .dialog-product-desc
    font-size 1.1rem
    color #444
    text-align center
    padding 12px 18px
    @media (max-width: 600px)
      font-size 1rem
      padding 8px 6px

  .dialog-product-price
    display block
    font-size 1.6rem
    font-weight 800
    color $secondary-color
    margin 18px 0 8px 0
    text-align center

  .dialog-product-actions
    display flex
    flex-direction row
    gap 12px
    padding 18px
    @media (max-width: 600px)
      flex-direction column
      gap 10px
      padding 12px 8px
      .v-btn
        font-size 1.1rem
        min-height 48px
        border-radius 12px
        margin 0
</style>
