export default [
  {
    path: "/admin",
    component: (): Promise<typeof import("*.vue")> => import(
      /* webpackChunkName: "admin-route" */
      /* webpackPrefetch: 0 */
      "@/routes/routeAdmin.vue"
    ),
    meta: {
      title: "Bangalô Sushi Lounge - Qualidade, Sabor e Tradição",
      description: "Experimente a Autêntica Culinária Japonesa no Bangalô Sushi Lounge"
    },
    children: [
      {
        path: "detalhes/:permision/:session",
        name: "admin-details-view",
        components: {
          viewAuthLogin: (): Promise<typeof import("*.vue")> => import(
            /* webpackChunkName: "admin-details-route-view" */
            /* webpackPrefetch: 1 */
            "@/views/admin/viewDetails.vue"
          )
        },
      },
      {
        path: "",
        name: "admin-login-view",
        components: {
          viewAuthLogin: (): Promise<typeof import("*.vue")> => import(
            /* webpackChunkName: "admin-login-route-view" */
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
