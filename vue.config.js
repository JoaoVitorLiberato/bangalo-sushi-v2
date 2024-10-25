module.exports = {
  configureWebpack: () => {
    const ENV = (env) => (!env && (process.env.NODE_ENV)) || ((process.env.NODE_ENV) === env)
    // eslint-disable-next-line
    const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin")
    // eslint-disable-next-line
    const os = require("os")

    return {
      devtool: false,
      node: {
        __filename: ENV("development")
      },
      plugins: [
        new ForkTsCheckerWebpackPlugin({
          memoryLimit: Math.floor(((os.totalmem() / 1024) / 1024) / 2)
        })
      ]
    }
  },

  pages: {
    index: {
      title: "Bangalô Sushi Lounge - Qualidade, Sabor e Tradição",
      description: "Venha conhecer o melhor sushi de Santa Luzia de Paruá. Onde você vai encontrar uma variedades de pratos da comida japonesa, com um sabor que ultrapassa os limites da barreiras continentais. Bangalô Sushi Lounge.",
      subject: "Comida Japonesa, Colinária Japonesa, Bangalo Sushi, Bangalô Sushi, O melhor sushi, Restaurante, Restaurante de comida Japonesa, lounge",
      color: "#000",
      url: "https://bangalosushi.app.br/",
      image: "/favicon.png",
      entry: "./src/main",
    }
  },

  pwa: {
    name: "BANGALÔ",
    themeColor: "#fff",
    msTileColor: "#fff",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppTitle: "app",
    appleMobileWebAppStatusBarStyle: "black",
    assetsVersion: process.env.npm_package_version,
    manifestOptions: {
      id: process.env.npm_package_version,
      short_name: "Bangalô Sushi Lounge - Qualidade, Sabor e Tradição",
      description: "Venha conhecer o melhor sushi de Santa Luzia de Paruá. Onde você vai encontrar uma variedades de pratos da comida japonesa, com um sabor que ultrapassa os limites da barreiras continentais. Bangalô Sushi Lounge.",
      background_color: "#fff",
      orientation: "portrait",
      start_url: "/",
      protocol_handlers: [
        {
          protocol: "web+app",
          url: "/%s"
        }
      ]
    }
  }
}
