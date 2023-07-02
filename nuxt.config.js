export default {
  head: {
    title: 'SunQBlog-UserSide-Nuxt',
    htmlAttrs: {
      lang: 'zh-cn' // 默认为中文
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
    bodyAttrs: {
      class: 'my-body'
    }
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/static/css/base.less',
    '@/assets/iconfont/iconfont.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: '~/plugins/vuex.js',
      ssr: true
    },
    "@/plugins/util.js"
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  generate: {
    // dir:'dist',
    subFolders: false,
    fallback: 'index.html'
  },
  serverMiddleware: [
    '~/middleware/proxy'
  ],
}
