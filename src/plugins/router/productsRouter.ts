export default [
  {
    path: "/produtos",
    component: (): Promise<typeof import("*.vue")> => import(
      /* webpackChunkName: "products-route" */
      /* webpackPrefetch: 0 */
      "@/routes/routeProducts.vue"
    ),
    meta: {
      title: "Bangalô Sushi Lounge - Conheçã nossos produtos",
      description: "Experimente a Autêntica Culinária Japonesa no Bangalô Sushi Lounge"
    },
    children: [
      {
        path: ":type/vamoscomecar",
        name: "view-products",
        components: {
          viewProducts: (): Promise<typeof import("*.vue")> => import(
            /* webpackChunkName: "products-route-view" */
            /* webpackPrefetch: 1 */
            "@/views/products/viewProducts.vue"
          ),
        },
      },
    ],
  },

  {
    path: "*",
    redirect: "/",
  },
]