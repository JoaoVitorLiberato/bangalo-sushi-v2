export default [
  {
    path: "/admin",
    component: (): Promise<typeof import("*.vue")> => import(
      /* webpackChunkName: "order-route" */
      /* webpackPrefetch: 0 */
      "@/routes/routeAdmin.vue"
    ),
    meta: {
      title: "Bangalô Sushi Lounge - Qualidade, Sabor e Tradição",
      description: "Experimente a Autêntica Culinária Japonesa no Bangalô Sushi Lounge"
    },
    children: [
      {
        path: "",
        name: "admin-login-view",
        components: {
          viewAuthLogin: (): Promise<typeof import("*.vue")> => import(
            /* webpackChunkName: "order-route-view" */
            /* webpackPrefetch: 1 */
            "@/views/admin/viewLogin.vue"
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
