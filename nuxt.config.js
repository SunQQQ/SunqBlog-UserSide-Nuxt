export default {
  ssr: true,
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

  // 对echarts5的ES模块转译为commonjs模块，zrender为echarts底层依赖插件需填写
  build: {
    transpile: [/echarts/, /zrender/],
    buildDir: 'dist'
  },

  generate: {
    // dir:'dist',
    subFolders: false,
    fallback: 'index.html',
    ssr: true
  },
  serverMiddleware: [
    '~/middleware/proxy'
  ],
}
