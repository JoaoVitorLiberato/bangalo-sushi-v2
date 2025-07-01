<template>
  <v-container fluid class="pa-0 pedidos-container">
    <!-- Header -->
    <header class="pedido-header" role="banner">
      <v-row no-gutters align="center">
        <v-col cols="12" md="8">
          <div class="header-content">
            <h1 class="header-title">Faça seu Pedido</h1>
            <p class="header-subtitle">Selecione os produtos e monte seu pedido personalizado</p>
          </div>
        </v-col>
        <v-col cols="12" md="4" class="d-flex justify-end align-center">
          <v-btn
            class="carrinho-btn"
            rounded
            large
            elevation="2"
            @click="showCartDialog = true"
            aria-label="Abrir carrinho"
          >
            <v-icon left aria-hidden="true">shopping_cart</v-icon>
            Carrinho
            <v-badge
              color="secondary"
              overlap
              bordered
              :content="cartCount"
              v-if="cartCount > 0"
              :aria-label="'Itens no carrinho: ' + cartCount"
            />
          </v-btn>
        </v-col>
      </v-row>
    </header>

    <v-divider class="header-divider" />

    <main id="main-content" role="main">
      <v-row no-gutters class="main-content">
        <!-- Sidebar -->
        <v-col cols="12" md="3" class="sidebar-col">
          <aside class="sidebar" aria-label="Categorias de produtos">
            <v-text-field
              v-model="search"
              placeholder="Buscar produtos..."
              outlined
              dense
              hide-details
              class="search-field"
              prepend-inner-icon="search"
              color="secondary"
              aria-label="Buscar produtos"
            />

            <div v-if="categories.length > 0" class="categories-section">
              <h2 class="categories-title">Categorias</h2>
              <nav class="categories-list" aria-label="Lista de categorias">
                <v-btn
                  v-for="cat in categories"
                  :key="cat.id || ''"
                  :class="['category-btn', { 'category-btn--active': selectedCategory === cat.id }]"
                  block
                  rounded
                  depressed
                  @click="selectCategory(String(cat.id))"
                  :aria-pressed="selectedCategory === cat.id"
                  :aria-label="'Selecionar categoria ' + cat.name"
                >
                  <span class="category-name">{{ cat.name }}</span>
                  <span class="category-count">{{ cat.count }}</span>
                </v-btn>
              </nav>
            </div>
          </aside>
        </v-col>

        <!-- Products Grid -->
        <v-col cols="12" md="9" class="products-col">
          <!-- Loading State -->
          <v-row v-if="loading" no-gutters>
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
                aria-label="Carregando produto"
              />
            </v-col>
          </v-row>

          <!-- Products -->
          <section
            v-else
            class="products-grid"
            aria-label="Lista de produtos"
          >
            <v-row no-gutters justify="center">
              <v-col
                v-for="product in paginatedProducts"
                :key="product.id || product.name"
                cols="12"
                sm="6"
                md="4"
                lg="3"
                class="product-col"
              >
                <v-card
                  class="product-card"
                  max-width="350"
                  elevation="3"
                  hover
                  :aria-labelledby="'product-title-' + product.id"
                  role="region"
                >
                  <div class="product-image-container">
                    <v-img
                      :src="product.tumbnail && product.tumbnail.url"
                      :alt="product.name"
                      :title="product.name"
                      height="210"
                      cover
                      class="product-image"
                    >
                      <template v-slot:placeholder>
                        <v-row class="fill-height ma-0" align="center" justify="center">
                          <v-progress-circular indeterminate color="primary" aria-label="Carregando imagem" />
                        </v-row>
                      </template>
                    </v-img>

                    <!-- Badges -->
                    <div class="product-badges">
                      <v-chip
                        v-if="product.category && product.category.name"
                        color="grey lighten-4"
                        text-color="secondary"
                        small
                        class="category-badge"
                        :aria-label="'Categoria: ' + product.category.name"
                      >
                        {{ product.category && product.category.name }}
                      </v-chip>

                      <v-chip
                        v-if="product.price.discount && product.price.discount.status"
                        color="error"
                        text-color="white"
                        small
                        class="discount-badge"
                        aria-label="Produto com desconto"
                      >
                        -{{ product.price.discount.percentage }}%
                      </v-chip>

                      <div>
                        <v-chip
                          v-if="product.differences && product.differences.especial && product.differences.especial.status"
                          color="warning"
                          text-color="white"
                          small
                          class="special-badge"
                          aria-label="Produto especial"
                        >
                          <v-icon left x-small aria-hidden="true">star</v-icon>
                          Especial
                        </v-chip>

                        <v-chip
                          v-else-if="product.differences && product.differences.breaded && product.differences.breaded.status"
                          color="warning"
                          text-color="white"
                          small
                          class="special-badge"
                          aria-label="Produto empanado"
                        >
                          <v-icon left x-small aria-hidden="true">star</v-icon>
                          Empanado
                        </v-chip>

                        <v-chip
                          v-else-if="product.differences && product.differences.flambed && product.differences.flambed.status"
                          color="warning"
                          text-color="white"
                          small
                          class="special-badge"
                          aria-label="Produto flambado"
                        >
                          <v-icon left x-small aria-hidden="true">star</v-icon>
                          Flambado
                        </v-chip>

                        <v-chip
                          v-else
                          color="warning"
                          text-color="white"
                          small
                          class="special-badge"
                          aria-label="Produto Natural"
                        >
                          <v-icon left x-small aria-hidden="true">star</v-icon>
                          Natural
                        </v-chip>
                      </div>
                    </div>
                  </div>

                  <v-card-text class="product-content">
                    <h3 class="product-name" :id="'product-title-' + product.id">
                      {{ product.name }}
                    </h3>

                    <div class="product-rating" v-if="product.note_client !== undefined" aria-label="Nota do cliente">
                      <div class="stars">
                        <v-icon
                          v-for="(star, i) in getStars(product.note_client)"
                          :key="i"
                          small
                          :color="star === 'full' || star === 'half' ? 'warning' : 'grey lighten-1'"
                          :aria-label="star === 'full' ? 'Estrela cheia' : star === 'half' ? 'Meia estrela' : 'Estrela vazia'"
                        >
                          {{ star === 'full' ? 'star' : star === 'half' ? 'star_half' : 'star_border' }}
                        </v-icon>
                      </div>
                      <span class="rating-value">{{ product.note_client.toFixed(1) }}</span>
                    </div>
                    <p class="product-description">
                      {{ product.description }}
                    </p>

                    <v-switch
                      v-if="product.differences && Object.keys(product.differences).length > 0"
                      v-model="productDifferenceSwitch[product.id]"
                      color="success"
                      class="mt-2 mb-2"
                      :disabled="product.differences.readonly"
                      dense
                      hide-details
                      @change="toggleProductDifference(product, Object.keys(product.differences)[0])"
                    >
                      <template v-slot:label>
                        <span
                          v-if="product.differences.especial"
                          style="font-size:16px; font-weight:600;"
                        >
                          Especial?
                          <span :style="`color:${product.differences.especial.status ? 'green' : 'red'}`">{{ product.differences.especial.status ? 'sim' : 'não' }}</span>
                        </span>

                        <span
                          v-else-if="product.differences.breaded"
                          style="font-size:16px; font-weight:600;"
                        >
                          Empanado?
                          <span :style="`color:${product.differences.breaded.status ? 'green' : 'red'}`">{{ product.differences.breaded.status ? 'sim' : 'não' }}</span>
                        </span>

                        <span
                          v-else-if="product.differences.flambed"
                          style="font-size:16px; font-weight:600;"
                        >
                          Flambado?
                          <span :style="`color:${product.differences.flambed.status ? 'green' : 'red'}`">
                            {{ product.differences.flambed.status ? 'sim' : 'não' }}
                          </span>
                        </span>

                        <span
                          v-else
                          style="font-size:16px; font-weight:600;"
                        >
                          Natural
                        </span>
                      </template>
                    </v-switch>

                    <!-- Price Section -->
                    <div class="price-section">
                      <span
                        v-if="product.price.discount && product.price.discount.status"
                        class="original-price"
                        aria-label="Preço original"
                      >
                        R$ {{ getReadingPrice(Number(product.price.default), ".") }}
                      </span>

                      <span class="final-price" aria-label="Preço final">
                        R$ {{ getReadingPrice(getFinalProductPrice(product), ".") }}
                      </span>

                      <span
                        v-if="product.differences && product.differences.especial && product.differences.especial.status"
                        class="special-price"
                        aria-label="Preço especial"
                      >
                        +R$ {{ getReadingPrice(Number(product.differences.especial.value), ".") }} especial
                      </span>

                      <span
                        v-if="product.differences && product.differences.breaded && product.differences.breaded.status"
                        class="special-price"
                        aria-label="Preço empanado"
                      >
                        +R$ {{ getReadingPrice(Number(product.differences.breaded.value), ".") }} empanado
                      </span>

                      <span
                        v-if="product.differences && product.differences.flambed && product.differences.flambed.status"
                        class="special-price"
                        aria-label="Preço flambado"
                      >
                        +R$ {{ getReadingPrice(Number(product.differences.flambed.value), ".") }} flambado
                      </span>
                    </div>

                    <v-btn
                      color="secondary"
                      block
                      rounded
                      class="select-btn"
                      @click="openComplementDialog(product)"
                      :aria-label="'Selecionar ' + product.name"
                    >
                      <v-icon left aria-hidden="true">add_circle</v-icon>
                      Selecionar
                    </v-btn>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </section>

          <!-- Pagination -->
          <nav
            v-if="filteredProducts.length > 0 && !loading"
            class="pagination-container"
            aria-label="Paginação de produtos"
          >
            <v-btn
              color="secondary"
              outlined
              rounded
              elevation="3"
              :disabled="currentPage === 1"
              @click="prevPage"
              class="pagination-btn"
              aria-label="Página anterior"
            >
              <v-icon left v-if="currentPage !== 1" aria-hidden="true">chevron_left</v-icon>
              Anterior
            </v-btn>

            <div class="pagination-info" aria-live="polite">
              <span class="current-page">{{ currentPage }}</span>
              <span class="separator">/</span>
              <span class="total-pages">{{ totalPages }}</span>
            </div>

            <v-btn
              color="secondary"
              outlined
              rounded
              elevation="3"
              :disabled="currentPage === totalPages"
              @click="nextPage"
              class="pagination-btn"
              aria-label="Próxima página"
            >
              Próxima
              <v-icon right v-if="currentPage !== totalPages" aria-hidden="true">chevron_right</v-icon>
            </v-btn>
          </nav>

          <!-- Empty State -->
          <v-row v-if="filteredProducts.length === 0 && !loading" no-gutters>
            <v-col cols="12" class="text-center empty-state" aria-live="polite">
              <v-icon size="64" color="grey lighten-1" class="empty-icon" aria-hidden="true">no_food</v-icon>
              <h3 class="empty-title">Nenhum produto encontrado</h3>
              <p class="empty-description">
                Não encontramos produtos na categoria selecionada.
              </p>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </main>

    <!-- Complement Dialog -->
    <v-dialog v-model="showComplementDialog" max-width="500" persistent scrollable aria-modal="true" role="dialog" aria-labelledby="complement-dialog-title">
      <v-card class="complement-dialog">
        <v-card-title id="complement-dialog-title" class="complement-dialog-title">
          Selecione complementos
          <div class="product-name">{{ selectedProduct && selectedProduct.name }}</div>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="complement-content">
          <div class="complement-instructions mb-2" style="font-size:0.98rem; color:#888;">
            Você pode escolher mais de um complemento para este produto.
          </div>
          <v-list class="complement-list">
            <v-list-item
              v-for="complement in complements"
              :key="complement.id"
              @click="toggleComplement(complement)"
              :class="{'selected-complement': isComplementSelected(complement)}"
              dense
              :aria-selected="isComplementSelected(complement)"
              :aria-label="'Complemento: ' + complement.name"
              tabindex="0"
              style="cursor:pointer; border-radius:10px; margin-bottom:8px; transition:background 0.2s;"
            >
              <v-list-item-content>
                <v-list-item-title class="complement-name" style="font-weight:600; font-size:1.05rem;">
                  {{ complement.name }}
                </v-list-item-title>
                <v-list-item-subtitle class="complement-desc" style="font-size:0.95rem; color:#666;">
                  {{ complement.description }}
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action class="complement-action" style="display:flex; align-items:center; gap:10px;">
                <v-checkbox
                  :input-value="isComplementSelected(complement)"
                  :value="complement.id"
                  color="secondary"
                  @change="toggleComplement(complement)"
                  @click.stop
                  :aria-label="'Selecionar complemento ' + complement.name"
                  style="margin-right:0;"
                />
                <span class="complement-price" style="font-weight:700; color:#232b3e; font-size:1rem;">
                  R$ {{ getReadingPrice(complement.price, ".") }}
                </span>
              </v-list-item-action>
            </v-list-item>
          </v-list>
          <div v-if="selectedComplementsIds.length > 0" class="selected-complements-summary mt-3 pa-2" style="background:#fffbe6; border-radius:10px;">
            <div style="font-size:0.98rem; color:#bfa100; font-weight:700; margin-bottom:4px;">Complementos selecionados:</div>
            <v-chip
              v-for="id in selectedComplementsIds"
              :key="id"
              small
              color="secondary"
              text-color="white"
              class="ma-1"
            >
              {{ complements.find(c => c.id === id)?.name }}
            </v-chip>
          </div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="complement-actions">
          <v-btn text color="grey" @click="closeComplementDialog" aria-label="Cancelar seleção de complementos">Cancelar</v-btn>
          <v-spacer />
          <v-btn color="secondary" depressed large rounded @click="confirmComplements" aria-label="Adicionar ao pedido">
            <v-icon left aria-hidden="true">save</v-icon>
            Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Cart Drawer -->
    <v-navigation-drawer v-model="showCartDialog" right temporary app width="400" class="cart-drawer" aria-label="Carrinho de compras" role="complementary">
      <v-card class="cart-dialog">
        <v-card-title class="cart-dialog-title">
          <v-icon left color="secondary" aria-hidden="true">shopping_cart</v-icon>
          Meu Carrinho
          <v-btn
            icon
            small
            color="grey darken-2"
            class="close-btn"
            @click="closeCartDialog"
            aria-label="Fechar carrinho"
          >
            <v-icon aria-hidden="true">close</v-icon>
          </v-btn>
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text class="cart-content">
          <!-- Empty Cart -->
          <div v-if="cartItems.length === 0" class="empty-cart" aria-live="polite">
            <v-icon size="64" color="grey lighten-1" class="empty-cart-icon" aria-hidden="true">shopping_cart_outlined</v-icon>
            <h3 class="empty-cart-title">Carrinho vazio</h3>
            <p class="empty-cart-desc">Adicione produtos ao seu carrinho para continuar.</p>
          </div>

          <!-- Cart Items -->
          <div v-else>
            <v-list class="cart-list">
              <v-list-item
                v-for="item in cartItems"
                :key="item.id"
                class="cart-item"
                dense
                role="listitem"
                :aria-label="'Produto no carrinho: ' + item.product.name"
              >
                <v-list-item-avatar class="cart-item-avatar">
                  <v-img
                    :src="item.product.tumbnail && item.product.tumbnail.url"
                    :alt="item.product.name"
                    width="60"
                    height="60"
                    class="cart-item-img"
                  />
                </v-list-item-avatar>

                <v-list-item-content class="cart-item-content">
                  <div class="cart-item-header">
                    <v-list-item-title class="cart-item-title">
                      {{ item.product.name }}
                    </v-list-item-title>
                    <div class="cart-item-controls">
                      <v-btn icon small class="cart-details-btn" @click="toggleDetails(item.id)" :aria-label="expandedItems[item.id] ? 'Ocultar detalhes' : 'Ver detalhes'">
                        <v-icon>{{ expandedItems[item.id] ? 'expand_less' : 'expand_more' }}</v-icon>
                      </v-btn>
                      <div class="quantity-controls" role="group" aria-label="Controle de quantidade">
                        <v-btn
                          icon
                          small
                          color="secondary"
                          @click="decreaseQuantity(item)"
                          :disabled="item.quantity <= 1"
                          aria-label="Diminuir quantidade"
                        >
                          <v-icon aria-hidden="true">remove</v-icon>
                        </v-btn>
                        <span class="quantity-display" aria-live="polite">{{ item.quantity }}</span>
                        <v-btn
                          icon
                          small
                          color="secondary"
                          @click="increaseQuantity(item)"
                          aria-label="Aumentar quantidade"
                        >
                          <v-icon aria-hidden="true">add</v-icon>
                        </v-btn>
                      </div>
                    </div>
                  </div>
                  <div>
                    <span
                        v-if="item.difference && item.difference.especial && item.difference.especial.status"
                        class="special-price"
                        aria-label="Preço especial"
                      >
                        especial
                      </span>

                      <span
                        v-else-if="item.difference && item.difference.breaded && item.difference.breaded.status"
                        class="special-price"
                        aria-label="Preço empanado"
                      >
                        empanado
                      </span>

                      <span
                        v-else-if="item.difference && item.difference.flambed && item.difference.flambed.status"
                        class="special-price"
                        aria-label="Preço flambado"
                      >
                        flambado
                      </span>

                      <span
                        v-else
                        class="special-price"
                        aria-label="Preço natural"
                      >
                        natural
                      </span>
                  </div>
                  <div class="cart-item-value">R$ {{ getReadingPrice(getItemTotalPrice(item), ".") }}</div>

                  <v-btn
                    small
                    text
                    block
                    color="error"
                    class="cart-delete-btn"
                    @click="removeFromCart(item)"
                    aria-label="Remover do carrinho"
                  >
                    <v-icon aria-hidden="true">delete</v-icon>
                    Remover
                  </v-btn>

                  <v-expand-transition>
                    <div v-if="expandedItems[item.id] && item.complements && item.complements.length > 0" class="cart-complements-summary">
                      <div class="complement-summary-title">Complementos</div>
                      <ul class="complement-summary-list">
                        <li v-for="complement in item.complements" :key="complement.id" class="complement-summary-item">
                          <span class="complement-summary-name">{{ complement.name }}</span>
                          <span class="complement-summary-price">+ R$ {{ getReadingPrice(complement.price, ".") }}</span>
                        </li>
                      </ul>
                    </div>
                  </v-expand-transition>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </div>
        </v-card-text>

        <!-- Cart Summary -->
        <v-divider v-if="cartItems.length > 0"></v-divider>
        <v-card-actions v-if="cartItems.length > 0" class="cart-summary">
          <div class="cart-total">
            <div class="total-row">
              <span class="total-label">Subtotal:</span>
              <span class="total-value">R$ {{ getReadingPrice(getCartSubtotal(), ".") }}</span>
            </div>
            <div class="total-row">
              <span class="total-label">Total de itens:</span>
              <span class="total-items">{{ getCartTotalItems() }}</span>
            </div>
          </div>

          <div class="cart-actions">
            <v-btn
              text
              color="grey"
              @click="closeCartDialog"
              class="continue-btn"
              large
              aria-label="Continuar comprando"
            >
              Continuar Comprando
            </v-btn>
            <v-btn
              color="secondary"
              large
              rounded
              @click="proceedToCheckout"
              class="checkout-btn"
              aria-label="Finalizar pedido"
            >
              <v-icon left aria-hidden="true">shopping_cart_checkout</v-icon>
              Finalizar Pedido
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-navigation-drawer>
  </v-container>
</template>

<script lang="ts">
  import { Component } from "vue-property-decorator"
  import { mixins } from "vue-class-component"
  import { namespace } from "vuex-class"

  import { MixinServiceProducts } from "@/mixins/services/mixinServiceProducts"
  import { MixinServiceCategories } from "@/mixins/services/mixinServiceCategories"
  import { MixinFunctionsSystem } from "@/mixins/system/MixinFunctionsSystem"

  import { IProduct } from "@/types/types-product"

  import "@/styles/views/products/viewProducts.styl"

  const cacheStore = namespace("cacheStoreModule")

  interface Complement {
    id: number
    name: string
    description: string
    price: number
  }

  interface CartItem {
    id: string
    product: IProduct
    quantity: number
    difference: {
      [key: string]: {
        status: boolean,
        value: number
      }
    }
    complements: Complement[]
  }

  @Component({})
  export default class ViewProducts extends mixins(
    MixinServiceProducts,
    MixinServiceCategories,
    MixinFunctionsSystem,
  ) {
    @cacheStore.Action("actionCacheProducts") declare setCacheProducts
    @cacheStore.Getter("CacheProducts") getCacheProducts
    @cacheStore.Action("actionsCacheCategories") declare setCacheCategories
    @cacheStore.Getter("CacheCategories") getCacheCategories

    loading: boolean = false
    search = ""
    selectedCategory: string = ""
    pageSize = this.$vuetify.breakpoint.mobile ? 1 : 8

    get categories () {
      const counts: Record<string, number> = {}
      this.getCacheProducts()
        .forEach((product: IProduct) => {
          const catId = product.category.id || 'outros'
          counts[catId] = (counts[catId] || 0) + 1
        })

      const CATEGORIES = [
        ...Array.from(
            new Set(this.getCacheProducts().map((p) => p.category?.id)))
              .filter(Boolean).map((id) => {
                const name = this.getCacheProducts().find(p => p.category?.id === id)?.category?.name || id
                return { id, name, count: counts[String(id)] }
              })
      ]

      return CATEGORIES
    }

    get filteredProducts() {
      let products = this.getCacheProducts()
      if (this.selectedCategory !== "") {
        products = products.filter((p) => p.category?.id === this.selectedCategory)
      }

      if (this.search) {
        const searchLower = this.search.toLowerCase()
        products = products.filter(p =>
          p.name.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower)
        )
      }

      return products
    }

    get paginatedProducts() {
      const start = (this.currentPage - 1) * this.pageSize
      return this.filteredProducts.slice(start, start + this.pageSize)
    }

    get totalPages(): number {
      return Math.ceil(this.filteredProducts.length / this.pageSize) || 1
    }

    get cartCount(): number {
      return this.cartItems.reduce((total, item) => total + item.quantity, 0)
    }

    mounted (): void {
      this.loadingConfigsView()
    }

    async loadingConfigsView (): Promise<void> {
      try {
        this.loading = true

        const [
          categories,
          products
        ] = await Promise.all([
          this.getAllCategories(),
          this.getAllProducts()
        ])

        this.setCacheCategories(categories)
        this.setCacheProducts(products)
      } catch (error) {
        window.log(`[ERROR loadingConfigsView] ${error}`)
      } finally {
        this.selectCategory(this.getCacheProducts()[0].category.id)
        this.loading = false
      }
    }

    nextPage(): void {
      if (this.currentPage < this.totalPages) this.currentPage++
    }

    prevPage(): void {
      if (this.currentPage > 1) this.currentPage--
    }

    toggleProductDifference(product: IProduct, type: string) {
      if (!product.differences[type]) return
      product.differences[type].status = this.productDifferenceSwitch[String(product.id)]
    }

    complements: Complement[] = [
      {
        id: 1,
        name: 'Molho Tarê',
        description: '100 ml',
        price: 400
      },
      {
        id: 2,
        name: 'Molho Pepino',
        description: '100 ml',
        price: 469
      }
    ]

    showComplementDialog = false
    selectedProduct: IProduct | null = null
    selectedComplementsIds: number[] = []
    showCartDialog = false
    cartItems: CartItem[] = []
    currentPage = 1
    expandedItems: Record<string, boolean> = {}
    productDifferenceSwitch: Record<string, boolean> = {}

    getFinalProductPrice(product: IProduct): number {
      if (product.price.discount?.status) {
        const discount = product.price.discount.percentage / 100
        return Math.round(product.price.default * (1 - discount))
      }
      return product.price.default
    }

    // --- Categoria ---
    selectCategory(id?: string) {
      if (id) {
        this.selectedCategory = id
        this.currentPage = 1
      }
    }

    // --- Complementos ---
    openComplementDialog(product: IProduct) {
      this.selectedProduct = product
      this.showComplementDialog = true
      this.selectedComplementsIds = []
    }
    closeComplementDialog() {
      this.showComplementDialog = false
      this.selectedProduct = null
      this.selectedComplementsIds = []
    }
    toggleComplement(complement: Complement) {
      const idx = this.selectedComplementsIds.indexOf(complement.id)
      if (idx === -1) {
        this.selectedComplementsIds.push(complement.id)
      } else {
        this.selectedComplementsIds.splice(idx, 1)
      }
    }
    isComplementSelected(complement: Complement) {
      return this.selectedComplementsIds.includes(complement.id)
    }
    confirmComplements() {
      if (!this.selectedProduct) return

      const selectedComplements = this.complements.filter(c => this.selectedComplementsIds.includes(c.id))

      const type_difference = Object.keys(this.selectedProduct.differences)[0]
      const cartItem: CartItem = {
        id: `${this.selectedProduct.id}-${Date.now()}`,
        product: this.selectedProduct,
        quantity: 1,
        difference: {
          [type_difference]: {
            status:  Boolean(this.selectedProduct.differences[type_difference].status),
            value: Number(this.selectedProduct.differences[type_difference].value)
          }
        },
        complements: selectedComplements
      }

      this.cartItems.push(cartItem)
      this.closeComplementDialog()
    }

    // --- Carrinho ---
    closeCartDialog() {
      this.showCartDialog = false
    }
    getItemTotalPrice(item: CartItem): number {
      // Soma o valor de todas as diferenças ativas
      let additionalDifference = 0;
      if (item.difference) {
        for (const key in item.difference) {
          if (item.difference[key] && item.difference[key].status) {
            additionalDifference += Number(item.difference[key].value) || 0;
          }
        }
      }
      const productTotal = (this.getFinalProductPrice(item.product) + additionalDifference) * item.quantity;
      const complementsTotal = item.complements.reduce((sum, c) => sum + c.price, 0);
      return productTotal + complementsTotal;
    }
    increaseQuantity(item: CartItem) {
      item.quantity++
    }
    decreaseQuantity(item: CartItem) {
      if (item.quantity > 1) item.quantity--
    }
    removeFromCart(item: CartItem) {
      const index = this.cartItems.findIndex(cartItem => cartItem.id === item.id)
      if (index > -1) this.cartItems.splice(index, 1)
    }
    getCartSubtotal(): number {
      return this.cartItems.reduce((total, item) => total + this.getItemTotalPrice(item), 0)
    }
    getCartTotalItems(): number {
      return this.cartItems.reduce((total, item) => {
        return total + item.quantity
      }, 0)
    }
    proceedToCheckout() {
      this.$router.push('/checkout')
      this.closeCartDialog()
    }

    // --- Utilitários de UI ---
    getStars(note: number): Array<'full' | 'half' | 'empty'> {
      const stars: Array<'full' | 'half' | 'empty'> = []
      for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(note)) {
          stars.push('full')
        } else if (i - note > 0 && i - note < 1) {
          stars.push('half')
        } else {
          stars.push('empty')
        }
      }
      return stars
    }
    toggleDetails(itemId: string) {
      this.$set(this.expandedItems, itemId, !this.expandedItems[itemId])
    }
  }
</script>
