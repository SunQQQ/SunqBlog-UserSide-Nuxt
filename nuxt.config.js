export default {
  ssr: true,
  head: {
    title: '孙权的博客-独立开源、全栈开发、多端自适应、vue+element+NodeJS、功能完善、风格清新！',
    htmlAttrs: {
      lang: 'zh-cn' // 默认为中文
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1,, user-scalable=yes' },
      { name: 'description', 
        content: "sunq'blog-孙权的个人网站，独立开发维护，包含用户端/管理后台/后端接口，网站风格清新功能完善。具备内容管理、访问数据分析、服务端渲染、表情包、天气预报、屏幕自适应等功能。且所有代码免费开源，可作为模版改造使用！" 
      },
      { name: 'Keywords', content: '个人网站,个人博客,开源博客,页面自适应,vue+nodeJS,风格清新,功能完善,内容管理系统,服务端渲染,博客模版,SEO优化' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/readme_img/favicon.ico' },
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
    transpile: [/echarts/, /zrender/,/vue-particles/],
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
