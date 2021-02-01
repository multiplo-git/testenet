module.exports = {
  /*
  ** Headers of the page
  */
  target: 'static',
  server: {
      port: 3005, // default: 3000
      host: '127.0.0.1' // default: localhost
  },
  dev: process.env.NODE_ENV !== 'production',
  env: {
    idsitepadraoenv: '1'
  },
  publicRuntimeConfig: {
    idsitepadraoenv: process.env.idsitepadraoenv   // alterar em netlify também o a variável de ambiente do site // 1
  },
  head: {
    title: 'Site padrao',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  modules: ['@nuxtjs/axios'           
           ],
  axios: {
    //https://axios.nuxtjs.org/setup
    //https://www.smashingmagazine.com/2020/05/getting-started-axios-nuxt/
    // proxy: true
    baseURL: 'https://conexaoaprender.com.br', 
    //baseURL: 'http://localhost:3001', 
    
    //baseURL: process.env.API_URL,
  },
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

