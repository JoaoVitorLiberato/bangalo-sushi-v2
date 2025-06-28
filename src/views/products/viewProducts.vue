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

            <div class="categories-section">
              <h2 class="categories-title">Categorias</h2>
              <nav class="categories-list" aria-label="Lista de categorias">
                <v-btn
                  v-for="cat in categoriesWithCount"
                  :key="cat.id || ''"
                  :class="['category-btn', { 'category-btn--active': selectedCategory === cat.id }]"
                  block
                  rounded
                  depressed
                  @click="selectCategory(cat.id)"
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
                    </div>
                  </div>

                  <v-card-text class="product-content">
                    <h3 class="product-name" :id="'product-title-' + product.id">
                      {{ product.name }}
                    </h3>

                    <p class="product-description">
                      {{ product.description }}
                    </p>

                    <!-- Rating -->
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

                    <!-- Price Section -->
                    <div class="price-section">
                      <span
                        v-if="product.price.discount && product.price.discount.status"
                        class="original-price"
                        aria-label="Preço original"
                      >
                        R$ {{ getReadingValue(Number(product.price.default), ".") }}
                      </span>

                      <span class="final-price" aria-label="Preço final">
                        R$ {{ getReadingValue(getFinalPrice(product), ".") }}
                      </span>

                      <span
                        v-if="product.differences && product.differences.especial && product.differences.especial.status"
                        class="special-price"
                        aria-label="Preço especial"
                      >
                        +R$ {{ getReadingValue(Number(product.differences.especial.value), ".") }} especial
                      </span>
                    </div>

                    <v-btn
                      color="secondary"
                      block
                      large
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
              :class="{'selected-complement': isSelected(complement)}"
              dense
              :aria-selected="isSelected(complement)"
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
                  :input-value="isSelected(complement)"
                  :value="complement.id"
                  color="secondary"
                  @change="toggleComplement(complement)"
                  @click.stop
                  :aria-label="'Selecionar complemento ' + complement.name"
                  style="margin-right:0;"
                />
                <span class="complement-price" style="font-weight:700; color:#232b3e; font-size:1rem;">
                  R$ {{ getReadingValue(complement.price, ".") }}
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
          <v-btn color="secondary" large rounded @click="confirmComplements" aria-label="Adicionar ao pedido">
            Adicionar ao pedido
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
                  <v-list-item-title class="cart-item-title">
                    {{ item.product.name }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="cart-item-desc">
                    {{ item.product.description }}
                  </v-list-item-subtitle>

                  <!-- Complements -->
                  <div v-if="item.complements && item.complements.length > 0" class="cart-complements">
                    <v-chip
                      v-for="complement in item.complements"
                      :key="complement.id"
                      small
                      color="secondary"
                      text-color="white"
                      class="complement-chip"
                      :aria-label="'Complemento: ' + complement.name"
                    >
                      {{ complement.name }}
                    </v-chip>
                  </div>
                </v-list-item-content>

                <v-list-item-action class="cart-item-actions">
                  <!-- Quantity Controls -->
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

                  <!-- Price -->
                  <div class="cart-item-price">
                    <span class="price-value">R$ {{ getReadingValue(getItemTotalPrice(item), ".") }}</span>
                  </div>

                  <!-- Remove Button -->
                  <v-btn
                    icon
                    small
                    color="error"
                    @click="removeFromCart(item)"
                    aria-label="Remover do carrinho"
                  >
                    <v-icon aria-hidden="true">delete</v-icon>
                  </v-btn>
                </v-list-item-action>
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
              <span class="total-value">R$ {{ getReadingValue(getCartSubtotal(), ".") }}</span>
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
import { Component, Vue } from "vue-property-decorator"
import { filterDataProduct } from "@/helpers/filterProducts"

interface Product {
  id: string | number
  name: string
  description: string
  price: {
    default: number
    discount?: {
      percentage: number
      status: boolean
    }
  }
  tumbnail?: { url: string, location?: string }
  category?: { id: string, name: string }
  note_client?: number
  differences?: {
    especial?: {
      readonly: boolean
      status: boolean
      value: number
    }
  }
}

interface Complement {
  id: number
  name: string
  description: string
  price: number
}

interface CartItem {
  id: string
  product: Product
  quantity: number
  complements: Complement[]
}

@Component({})
export default class viewProducts extends Vue {
  filterDataProduct = filterDataProduct

  search = ''
  selectedCategory: string = 'all'

  products: Product[] = [
    {
      id: 1,
      name: 'Sushi Especial',
      description: 'Sushi de salmão com cream cheese',
      price: {
        default: 3799,
        discount: {
          percentage: 27,
          status: true
        }
      },
      tumbnail: {
        url: 'https://th.bing.com/th/id/R.b5c8425f3ca5728ce7d1fc2ce0821103?rik=Yj9OLeKPjcqxDg&pid=ImgRaw&r=0'
      },
      category: { id: 'sushis', name: 'Entrada' }
    },
    {
      id: 2,
      name: 'Hot Roll',
      description: 'Hot roll crocante de salmão',
      price: { default: 2500 },
      tumbnail: {
        url: 'https://th.bing.com/th/id/OIP.8QwQwQwQwQwQwQwQwQwQwHaE8?pid=ImgDet&rs=1'
      },
      category: { id: 'hotrolls', name: 'Hot Rolls' }
    }
  ]

  complements: Complement[] = [
    {
      id: 1,
      name: 'Molho Tarê',
      description: '100 ml',
      price: 400
    }
  ]

  showComplementDialog = false
  selectedProduct: Product | null = null
  selectedComplementsIds: number[] = []

  // Cart
  showCartDialog = false
  cartItems: CartItem[] = []

  categories: Array<{ id: string, name: string }> = []
  loading: boolean = false

  // Pagination
  currentPage = 1
  pageSize = this.$vuetify.breakpoint.mobile ? 1 : 8

  get categoriesWithCount() {
    const counts: Record<string, number> = {}
    this.products.forEach(p => {
      const catId = p.category?.id || 'outros'
      counts[catId] = (counts[catId] || 0) + 1
    })
    const categories = [
      { id: 'all', name: 'Todos', count: this.products.length },
      ...Array.from(new Set(this.products.map(p => p.category?.id))).filter(Boolean).map(id => {
        const name = this.products.find(p => p.category?.id === id)?.category?.name || id
        return { id, name, count: counts[id!] }
      })
    ]
    return categories
  }

  get filteredProducts() {
    let filtered = this.products
    if (this.selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category?.id === this.selectedCategory)
    }
    if (this.search) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(this.search.toLowerCase()) ||
        p.description.toLowerCase().includes(this.search.toLowerCase())
      )
    }
    return filtered
  }

  get paginatedProducts(): Product[] {
    const products = Array.isArray(this.filteredProducts) ? this.filteredProducts : [];
    const start = (this.currentPage - 1) * this.pageSize;
    return products.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    const products = Array.isArray(this.filteredProducts) ? this.filteredProducts : [];
    return Math.ceil(products.length / this.pageSize) || 1;
  }

  get cartCount(): number {
    return this.getCartTotalItems();
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) this.currentPage++
  }

  prevPage(): void {
    if (this.currentPage > 1) this.currentPage--
  }

  getReadingValue(value: number, separator: string): string {
    return (value / 100).toFixed(2).replace('.', separator)
  }

  getFinalPrice(product: Product): number {
    let finalPrice = product.price.default;

    if (product.price.discount && product.price.discount.status) {
      const discountPercentage = product.price.discount.percentage / 100;
      finalPrice = finalPrice * (1 - discountPercentage);
    }

    return finalPrice;
  }

  selectCategory(id: string | undefined) {
    if (id) {
      this.selectedCategory = id
      this.currentPage = 1
    }
  }

  openComplementDialog(product: Product) {
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

  isSelected(complement: Complement) {
    return this.selectedComplementsIds.includes(complement.id)
  }

  confirmComplements() {
    if (this.selectedProduct) {
      const selectedComplements = this.complements.filter(c =>
        this.selectedComplementsIds.includes(c.id)
      )

      const cartItem: CartItem = {
        id: `${this.selectedProduct.id}-${Date.now()}`,
        product: this.selectedProduct,
        quantity: 1,
        complements: selectedComplements
      }

      this.cartItems.push(cartItem)
      this.closeComplementDialog()
    }
  }

  // Cart methods
  closeCartDialog() {
    this.showCartDialog = false
  }

  getItemTotalPrice(item: CartItem): number {
    let total = this.getFinalPrice(item.product)

    item.complements.forEach(complement => {
      total += complement.price
    })

    return total * item.quantity
  }

  increaseQuantity(item: CartItem) {
    item.quantity++
  }

  decreaseQuantity(item: CartItem) {
    if (item.quantity > 1) {
      item.quantity--
    }
  }

  removeFromCart(item: CartItem) {
    const index = this.cartItems.findIndex(cartItem => cartItem.id === item.id)
    if (index > -1) {
      this.cartItems.splice(index, 1)
    }
  }

  getCartSubtotal(): number {
    return this.cartItems.reduce((total, item) => total + this.getItemTotalPrice(item), 0)
  }

  getCartTotalItems(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  proceedToCheckout() {
    this.$router.push('/checkout')
    this.closeCartDialog()
  }

  async loadCategories() {
    this.categories = [
      { id: 'all', name: 'Todos' },
      { id: 'sushis', name: 'Sushis' },
      { id: 'hotrolls', name: 'Hot Rolls' }
    ]
    this.selectedCategory = this.categories[0].id
  }

  async loadProducts() {
    // Load products from API
  }

  onCategoryChange(value: string) {
    this.selectCategory(value)
  }

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
}
</script>

<style lang="stylus" scoped>
// Variables
$primary-color = #1f2937
$secondary-color = #FFD600
$grey-light = #f8f9fa
$grey-border = #e9ecef
$text-primary = #232b3e
$text-secondary = #6b7280

// Mixins
transition-all()
  transition all 0.3s cubic-bezier(.4,0,.2,1)

hover-lift()
  transform translateY(-8px) scale(1.025)
  box-shadow 0 16px 32px rgba(31, 41, 55, 0.18)

// Main Container
.pedidos-container
  background #fff
  min-height 100vh

// Header
.pedido-header
  padding 32px 0 0 0
  margin-bottom 8px

.header-content
  padding-left 24px

.header-title
  color $text-primary
  font-size 2.3rem
  font-weight 900
  letter-spacing 0.5px
  margin-bottom 8px

.header-subtitle
  color $text-secondary
  font-size 1.08rem
  margin 0

.header-divider
  margin 24px 0

.carrinho-btn
  background linear-gradient(90deg, $secondary-color 0%, #ffce00 100%) !important
  color $text-primary !important
  font-weight 700
  font-size 1.08rem
  min-width 130px
  box-shadow 0 2px 8px 0 rgba(255,214,0,0.10)
  letter-spacing 0.5px
  transition-all()

  &:hover
    background linear-gradient(90deg, #ffe066 0%, $secondary-color 100%) !important
    box-shadow 0 6px 18px 0 rgba(255,214,0,0.18)
    transform scale(1.04)

// Main Content
.main-content
  margin-top 24px

// Sidebar
.sidebar-col
  padding-right 24px
  margin-bottom 24px

.sidebar
  background $grey-light
  border-radius 20px
  box-shadow 0 2px 16px 0 rgba(31,41,55,0.08)
  padding 32px 22px 22px 22px
  min-height 320px

.search-field
  margin-bottom 24px

  ::v-deep .v-input__control
    border-radius 12px

.categories-section
  margin-top 18px

.categories-title
  font-size 1.1rem
  font-weight 700
  color $text-primary
  margin-bottom 16px

.categories-list
  display flex
  flex-direction column
  gap 8px

.category-btn
  background #fff !important
  color $text-primary !important
  font-weight 600
  font-size 1.08rem
  justify-content space-between
  border-radius 14px !important
  box-shadow none
  padding 10px 22px
  transition-all()
  border 1.5px solid #f3f4f6

  &:hover
    background #f7f7fa !important
    color $text-primary !important

  &--active
    background linear-gradient(90deg, $secondary-color 0%, #ffce00 100%) !important
    color $text-primary !important
    font-weight 700
    box-shadow 0 2px 8px 0 rgba(255,214,0,0.10)
    border-color $secondary-color

.category-name
  flex 1
  text-align left

.category-count
  background rgba(255,255,255,0.7)
  color $text-primary
  font-size 1.01rem
  font-weight 700
  border-radius 12px
  padding 2px 12px
  margin-left 12px
  box-shadow 0 1px 4px 0 rgba(31,41,55,0.06)

// Products Grid
.products-col
  padding-left 12px

.products-grid
  row-gap 32px
  column-gap 16px

.product-col
  padding 12px

.product-card
  border-radius 22px
  overflow hidden
  border 1.5px solid $grey-border
  background #fff
  color $text-primary
  box-shadow 0 6px 24px 0 rgba(31,41,55,0.10)
  min-height 440px
  max-height 500px
  height 100%
  display flex
  flex-direction column
  justify-content flex-start
  align-items stretch
  transition box-shadow 0.25s cubic-bezier(.4,0,.2,1), transform 0.22s cubic-bezier(.4,0,.2,1)

  &:hover
    box-shadow 0 16px 32px rgba(31, 41, 55, 0.18)
    border-color $secondary-color
    transform translateY(-6px) scale(1.025)

.product-image-container
  position relative
  min-height 180px
  max-height 180px
  display flex
  align-items flex-start
  justify-content center
  background $grey-light
  border-radius 22px 22px 0 0
  box-shadow 0 2px 12px 0 rgba(31,41,55,0.08)

.product-image
  border-radius 22px 22px 0 0
  object-fit cover
  width 100%
  height 180px
  background $grey-light
  transition transform 0.35s cubic-bezier(.4,0,.2,1)

  .product-card:hover &
    transform scale(1.04)

.product-placeholder
  width 100%
  height 180px
  display flex
  align-items center
  justify-content center
  color #cfcfcf
  font-size 3rem
  background $grey-light
  border-radius 22px 22px 0 0

.product-badges
  display flex
  flex-direction row
  align-items flex-start
  justify-content flex-start
  min-height 36px
  margin-bottom 4px
  width 100%
  gap 8px
  padding 0 12px
  position absolute
  top 12px
  left 0
  z-index 2

.category-badge
  background #fffbe6 !important
  color #e6b800 !important
  font-weight 800
  font-size 1.01rem
  border-radius 8px
  box-shadow 0 1px 4px 0 rgba(255,214,0,0.10)
  padding 0 12px
  min-height 28px
  display flex
  align-items center

.discount-badge
  background #ffebee !important
  color #d32f2f !important
  font-weight 900
  font-size 1.01rem
  border-radius 8px
  box-shadow 0 1px 4px 0 rgba(211,47,47,0.10)
  padding 0 12px
  min-height 28px
  display flex
  align-items center

.special-badge
  background #fff8e1 !important
  color #f59e0b !important
  font-weight 900
  font-size 1.01rem
  border-radius 8px
  box-shadow 0 1px 4px 0 rgba(245,158,11,0.10)
  padding 0 12px
  min-height 28px
  display flex
  align-items center
  gap 4px

.product-content
  flex 1 1 auto
  display flex
  flex-direction column
  justify-content flex-start
  align-items stretch
  min-height 260px
  padding 24px 20px 20px 20px
  background #fff

.product-name
  color $text-primary
  line-height 1.3
  font-size 1.28rem
  font-weight 900
  letter-spacing 0.5px
  margin-bottom 8px
  display -webkit-box
  -webkit-line-clamp 2
  -webkit-box-orient vertical
  overflow hidden
  text-overflow ellipsis
  min-height 2.6em

.product-description
  line-height 1.5
  color $text-secondary
  font-size 1.05rem
  min-height 2.8em
  margin-bottom 12px
  display -webkit-box
  -webkit-line-clamp 2
  -webkit-box-orient vertical
  overflow hidden
  text-overflow ellipsis

.product-rating
  display flex
  align-items center
  min-height 28px
  margin-bottom 12px
  .stars
    display flex
    align-items center
    font-size 1.25em
  .rating-value
    color $secondary-color
    font-weight 900
    font-size 1.08rem
    margin-left 8px
    background #fffbe6
    border-radius 8px
    padding 2px 10px
    box-shadow 0 1px 4px 0 rgba(255,214,0,0.10)

.price-section
  border-top 1.5px solid $grey-border
  padding-top 12px
  margin-bottom 18px
  display flex
  flex-direction column
  gap 4px
  min-height 56px
  max-height 56px
  justify-content center

.original-price
  text-decoration line-through
  color #bdbdbd
  font-size 1.01rem
  font-weight 600

.final-price
  color $secondary-color
  font-size 1.35rem
  font-weight 900
  letter-spacing 0.5px

.special-price
  color #f59e0b
  font-size 1.01rem
  font-weight 800

.select-btn
  width 100%
  display block
  margin-top auto
  margin-bottom 0
  min-height 54px
  border-radius 18px
  font-size 1.18rem
  font-weight 900
  letter-spacing 0.5px
  box-shadow 0 6px 18px 0 rgba(255,214,0,0.13)
  background linear-gradient(90deg, $secondary-color 0%, #ffce00 100%) !important
  color $text-primary !important
  text-transform uppercase
  transition-all()
  border 2px solid #ffe066

  &:hover
    background linear-gradient(90deg, #ffe066 0%, $secondary-color 100%) !important
    color $text-primary !important
    box-shadow 0 12px 32px 0 rgba(255,214,0,0.18)
    transform scale(1.045)

  .v-icon
    font-size 1.5em
    margin-right 10px
    color $text-primary !important

// Pagination
.pagination-container
  display flex
  justify-content center
  align-items center
  gap 24px
  margin 40px 0
  flex-wrap wrap

.pagination-btn
  min-width 140px
  font-size 1.15rem
  font-weight 600
  letter-spacing 0.5px
  border-radius 28px
  box-shadow 0 2px 12px rgba(31,41,55,0.10)
  transition-all()
  background #fff
  padding 12px 28px

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

.pagination-info
  display flex
  align-items center
  font-size 1.5rem
  font-weight 700
  color $text-primary
  background #fff
  border-radius 16px
  padding 8px 18px
  box-shadow 0 1px 6px rgba(31,41,55,0.07)
  margin 0 18px

.current-page
  color $secondary-color
  font-size 2rem
  font-weight 800
  margin 0 6px
  transition color 0.2s

.separator
  margin 0 6px
  color #bbb
  font-size 1.3rem

.total-pages
  color #888
  font-size 1.2rem
  font-weight 600

// Empty State
.empty-state
  padding 48px 16px

.empty-icon
  margin-bottom 16px

.empty-title
  font-size 1.5rem
  color $text-secondary
  margin-bottom 8px

.empty-description
  color $text-secondary
  font-size 1.1rem

// Dialogs
.complement-dialog, .cart-dialog
  border-radius 22px
  overflow hidden
  background $grey-light
  color $text-primary
  box-shadow 0 8px 32px 0 rgba(31,41,55,0.13)

.complement-dialog-title, .cart-dialog-title
  font-size 1.25rem
  color $text-primary
  font-weight 900
  text-align center
  padding 20px
  position relative

.close-btn
  position absolute
  top 12px
  right 12px
  background #fff
  border-radius 50%
  box-shadow 0 2px 8px rgba(31,41,55,0.10)

  &:hover
    background $secondary-color
    color #fff

.product-name
  font-size 1.05rem
  color $text-secondary
  font-weight 600
  margin-top 8px

.complement-content, .cart-content
  background #fff
  border-radius 12px
  margin 8px
  padding 16px

.complement-list, .cart-list
  background transparent

.complement-name
  font-weight 600
  color $text-primary

.complement-desc
  color $text-secondary
  font-size 0.9rem

.complement-action
  display flex
  align-items center
  gap 8px

.complement-price
  font-weight 700
  color $text-primary
  font-size 0.95rem

.selected-complement
  background #fffbe6 !important
  border-radius 10px
  box-shadow 0 2px 8px 0 rgba(255,214,0,0.08)

.complement-actions
  border-top 1px solid $grey-border
  background $grey-light
  border-radius 0 0 22px 22px
  padding 16px 20px

// Cart Items
.cart-item
  border-radius 12px
  margin-bottom 8px
  background #fff
  border 1px solid $grey-border
  transition-all()

  &:hover
    box-shadow 0 4px 12px rgba(31,41,55,0.08)
    border-color $secondary-color

.cart-item-avatar
  margin-right 16px

.cart-item-img
  border-radius 8px
  object-fit cover

.cart-item-title
  color $text-primary
  font-size 1.1rem
  font-weight 700
  margin-bottom 4px

.cart-item-desc
  color $text-secondary
  font-size 0.95rem
  line-height 1.4

.cart-complements
  display flex
  flex-wrap wrap
  gap 4px
  margin-top 8px

.complement-chip
  font-size 0.8rem

.cart-item-actions
  display flex
  flex-direction column
  align-items flex-end
  min-width 120px

.quantity-controls
  background $grey-light
  border-radius 20px
  padding 4px
  border 1px solid $grey-border
  display flex
  align-items center
  margin-bottom 8px

.quantity-display
  color $text-primary
  font-size 1.1rem
  font-weight 700
  min-width 30px
  text-align center
  margin 0 12px

.cart-item-price
  margin-bottom 8px

.price-value
  color $secondary-color
  font-size 1.2rem
  font-weight 900

// Cart Summary
.cart-summary
  background $grey-light
  border-top 1px solid $grey-border
  padding 20px

.cart-total
  width 100%
  margin-bottom 16px

.total-row
  display flex
  justify-content space-between
  align-items center
  margin-bottom 8px

.total-label
  font-size 1rem
  font-weight 600
  color $text-primary

.total-value
  font-size 1.3rem
  font-weight 900
  color $secondary-color

.total-items
  font-size 1rem
  font-weight 700
  color $text-primary

.cart-actions
  width 100%
  max-width 100%
  box-sizing border-box
  display flex
  flex-direction column
  gap 12px
  margin-top 8px

  .continue-btn, .checkout-btn
    width 100%
    min-width 0
    margin 0
    font-size 1.15rem
    min-height 56px
    border-radius 16px
    box-shadow 0 2px 8px 0 rgba(255,214,0,0.10)
    display flex
    align-items center
    justify-content center
    text-align center
    font-weight 700
    letter-spacing 0.5px
    text-transform uppercase
    padding 0

@media (max-width: 600px)
  .header-title
    font-size 1.5rem
    text-align center
    margin-bottom 4px
  .header-subtitle
    font-size 0.98rem
    text-align center
    margin-bottom 12px
  .carrinho-btn
    min-width 100px
    font-size 0.98rem
    padding 10px 0
    border-radius 14px
    margin 0 auto 12px auto
    display flex
    align-items center
    justify-content center
    .v-icon
      font-size 1.2em
      margin-right 6px
  .sidebar
    padding 14px 8px
    min-height 0
    border-radius 12px
    box-shadow 0 1px 6px 0 rgba(31,41,55,0.08)
  .categories-title
    font-size 1rem
    margin-bottom 10px
    text-align center
  .categories-list
    gap 4px
    .category-btn
      font-size 0.98rem
      padding 8px 10px
      border-radius 10px !important
      .category-count
        font-size 0.95rem
        padding 2px 8px
  .products-col
    padding-left 0
  .products-grid
    row-gap 18px
    column-gap 0
  .product-col
    padding 6px
  .product-card
    min-height 280px
    max-height 340px
    border-radius 12px
    .product-image-container
      min-height 120px
      max-height 120px
      border-radius 12px 12px 0 0
    .product-image
      border-radius 12px 12px 0 0
      height 120px !important
    .product-badges
      top 6px
      left 0
      gap 4px
      padding 0 4px
      min-height 24px
      .v-chip
        font-size 0.85rem
        min-height 20px
        border-radius 6px
        padding 0 6px
    .product-content
      padding 10px 8px 8px 8px
      min-height 120px
      .product-name
        font-size 1rem
        min-height 2.2em
        margin-bottom 2px
      .product-description
        font-size 0.95rem
        min-height 2.2em
        margin-bottom 6px
      .product-rating
        min-height 18px
        margin-bottom 6px
        .stars
          font-size 1em
        .rating-value
          font-size 0.95rem
          padding 2px 6px
      .price-section
        padding-top 6px
        margin-bottom 8px
        min-height 32px
        max-height 32px
        gap 2px
        .original-price
          font-size 0.95rem
        .final-price
          font-size 1.1rem
        .special-price
          font-size 0.95rem
      .select-btn
        min-height 38px
        font-size 0.98rem
        border-radius 10px
        margin-top 8px
        .v-icon
          font-size 1.1em
          margin-right 6px
  .pagination-container
    flex-direction column
    gap 8px
    margin 18px 0
    .pagination-btn
      min-width 90vw
      max-width 98vw
      width 100%
      font-size 0.98rem
      padding 10px 0
      margin 0
      border-radius 12px
    .pagination-info
      font-size 1rem
      padding 4px 0
      margin 0
      border-radius 8px
      .current-page
        font-size 1.1rem
      .separator
        font-size 0.95rem
      .total-pages
        font-size 0.95rem
  .empty-state
    padding 24px 8px
    .empty-title
      font-size 1.1rem
    .empty-description
      font-size 0.98rem
  .complement-dialog, .cart-dialog
    border-radius 0
    min-height 100vh
    max-height 100vh
    padding 0
  .complement-actions, .cart-summary
    border-radius 0
    padding 10px 8px
  .cart-drawer
    width 100vw !important
    min-width 0 !important
    max-width 100vw !important
    left 0 !important
    right 0 !important
    border-radius 0 !important
    box-shadow none !important
    top 0 !important
    height 100vh !important
    padding 0 !important
    background #fff !important
    display flex
    flex-direction column
    z-index 1200

  .cart-dialog
    min-height 100vh
    max-height 100vh
    display flex
    flex-direction column
    padding 0
    background #fff
    border-radius 0
    box-shadow none
    width 100vw
    height 100vh
    overflow hidden

  .cart-dialog-title
    font-size 1.15rem
    font-weight 900
    padding 20px 20px 14px 20px
    border-bottom 1px solid #eee
    background #fff
    position sticky
    top 0
    left 0
    right 0
    z-index 11
    display flex
    align-items center
    justify-content space-between
    min-height 60px

  .close-btn
    position static
    margin-left auto
    background #fff
    border-radius 50%
    box-shadow 0 2px 8px rgba(31,41,55,0.10)
    transition background 0.2s
    &:hover
      background $secondary-color
      color #fff

  .cart-content
    flex 1 1 auto
    overflow-y auto
    padding 18px 14px 24px 14px
    background #fafbfc
    display flex
    flex-direction column
    gap 18px

  .cart-list
    background transparent
    margin-bottom 0
    padding 0
    width 100%

  .cart-item
    display flex
    flex-direction row
    align-items flex-start
    background #fff
    border-radius 14px
    box-shadow 0 1px 4px 0 rgba(31,41,55,0.07)
    margin-bottom 14px
    padding 14px 10px
    position relative
    transition box-shadow 0.2s
    border 1px solid #f3f4f6
    gap 10px
    &:hover
      box-shadow 0 4px 12px rgba(31,41,55,0.10)
      border-color $secondary-color

    .cart-item-avatar
      margin-right 0
      min-width 48px
      max-width 48px
      min-height 48px
      max-height 48px
      border-radius 8px
      overflow hidden
      background $grey-light
      display flex
      align-items center
      justify-content center
    .cart-item-img
      border-radius 8px
      object-fit cover
      width 48px
      height 48px
    .cart-item-content
      flex 1
      min-width 0
      display flex
      flex-direction column
      gap 2px
      .cart-item-title
        color $text-primary
        font-size 1.05rem
        font-weight 700
        margin-bottom 2px
        white-space nowrap
        overflow hidden
        text-overflow ellipsis
      .cart-item-desc
        color $text-secondary
        font-size 0.93rem
        line-height 1.3
        margin-bottom 2px
        white-space nowrap
        overflow hidden
        text-overflow ellipsis
      .cart-complements
        display flex
        flex-wrap wrap
        gap 2px
        margin-top 2px
        .complement-chip
          font-size 0.75rem
          background $secondary-color !important
          color #fff !important
          border-radius 6px
          padding 1px 6px
    .cart-item-actions
      display flex
      flex-direction column
      align-items flex-end
      min-width 80px
      margin-left 8px
      gap 8px
      .quantity-controls
        background $grey-light
        border-radius 16px
        padding 2px 6px
        border 1px solid $grey-border
        display flex
        align-items center
        .v-btn
          min-width 28px
          min-height 28px
          border-radius 50%
          font-size 1em
        .quantity-display
          color $text-primary
          font-size 1rem
          font-weight 700
          min-width 22px
          text-align center
          margin 0 6px
      .cart-item-price
        color $secondary-color
        font-size 1.08rem
        font-weight 900
        margin-bottom 0
      .remove-btn
        background transparent
        color #d32f2f
        min-width 24px
        min-height 24px
        border-radius 50%
        transition background 0.2s
        &:hover
          background #ffebee
          color #b71c1c

  .cart-summary
    padding 18px 14px 18px 14px
    border-radius 0
    background #fff
    box-shadow 0 -2px 12px 0 rgba(31,41,55,0.07)
    position sticky
    bottom 0
    left 0
    right 0
    z-index 10
    display flex
    flex-direction column
    gap 12px
    .cart-total
      width 100%
      margin-bottom 8px
      display flex
      flex-direction row
      justify-content space-between
      align-items flex-end
      .total-label
        font-size 1rem
        color $text-primary
      .total-value
        font-size 1.3rem
        color $secondary-color
        font-weight 900
        margin-left 8px
      .total-items
        font-size 1rem
        color $text-primary
        margin-left 8px
    .cart-actions
      width 100%
      max-width 100%
      box-sizing border-box
      display flex
      flex-direction column
      gap 10px
      margin-top 8px
      .continue-btn, .checkout-btn
        width 100%
        min-width 0
        margin 0
        font-size 1.1rem
        min-height 48px
        border-radius 12px
        box-shadow 0 2px 8px 0 rgba(255,214,0,0.10)
        display flex
        align-items center
        justify-content center
        text-align center
        font-weight 700
        letter-spacing 0.5px
        text-transform uppercase
        padding 0
      .checkout-btn
        background linear-gradient(90deg, $secondary-color 0%, #ffce00 100%) !important
        color $text-primary !important
        font-weight 900
        border 2px solid #ffe066
      .continue-btn
        background #f3f4f6 !important
        color $text-primary !important
        font-weight 700

// Desktop refinamento
@media (min-width: 601px)
  .cart-drawer
    width 400px !important
    max-width 100vw
    background #fff
    box-shadow 0 0 32px 0 rgba(31,41,55,0.18)
    z-index 1200
    padding 0
    display flex
    flex-direction column
    justify-content flex-start
    align-items stretch
    border-radius 0 0 0 0
    overflow-y auto
  .cart-dialog
    background #fff
    box-shadow none
    border-radius 0 0 0 0
    padding 0
    min-height 100vh
    display flex
    flex-direction column
    height 100vh
    max-height 100vh
  .cart-dialog-title
    display flex
    align-items center
    font-size 1.15rem
    color $text-primary
    font-weight 900
    padding 24px 24px 16px 24px
    border-bottom 1px solid #eee
    background #fff
    box-shadow 0 2px 8px 0 rgba(31,41,55,0.06)
    position relative
    min-height 60px
  .close-btn
    position absolute
    top 18px
    right 18px
    background #fff
    border-radius 50%
    box-shadow 0 2px 8px rgba(31,41,55,0.10)
    transition background 0.2s
    &:hover
      background $secondary-color
      color #fff
  .cart-content
    flex 1 1 auto
    overflow-y auto
    padding 24px 16px 32px 16px
    background #fafbfc
  .cart-summary
    padding 24px 20px 20px 20px
    border-radius 16px 16px 0 0
    background #fff
    box-shadow 0 -2px 12px 0 rgba(31,41,55,0.07)
    position sticky
    bottom 0
    left 0
    right 0
    z-index 10
    display flex
    flex-direction column
    gap 12px
    .cart-total
      width 100%
      margin-bottom 8px
      display flex
      flex-direction row
      justify-content space-between
      align-items flex-end
      .total-label
        font-size 1.08rem
        color $text-primary
      .total-value
        font-size 1.5rem
        color $secondary-color
        font-weight 900
        margin-left 8px
      .total-items
        font-size 1rem
        color $text-primary
        margin-left 8px
    .cart-actions
      width 100%
      max-width 100%
      box-sizing border-box
      display flex
      flex-direction column
      gap 12px
      margin-top 8px
      .continue-btn, .checkout-btn
        width 100%
        min-width 0
        margin 0
        font-size 1.15rem
        min-height 56px
        border-radius 16px
        box-shadow 0 2px 8px 0 rgba(255,214,0,0.10)
        display flex
        align-items center
        justify-content center
        text-align center
        font-weight 700
        letter-spacing 0.5px
        text-transform uppercase
        padding 0
      .checkout-btn
        background linear-gradient(90deg, $secondary-color 0%, #ffce00 100%) !important
        color $text-primary !important
        font-weight 900
        border 2px solid #ffe066
      .continue-btn
        background #f3f4f6 !important
        color $text-primary !important
        font-weight 700
</style>