export default [
  {
    path: "/detalhes",
    component: (): Promise<typeof import("*.vue")> => import(
      /* webpackChunkName: "form-route" */
      /* webpackPrefetch: 0 */
      "@/routes/routeForm.vue"
    ),
    meta: {
      title: "Bangalô Sushi Lounge - Qualidade, Sabor e Tradição",
      description: "Experimente a Autêntica Culinária Japonesa no Bangalô Sushi Lounge"
    },
    children: [
      {
        path: "pedido",
        name: "view-form",
        components: {
          viewForm: (): Promise<typeof import("*.vue")> => import(
            /* webpackChunkName: "form-route-view" */
            /* webpackPrefetch: 1 */
            "@/views/form/viewForm.vue"
          )
        },
      },
    ],
  },

  {
    path: "*",
    redirect: "/",
  },
]
