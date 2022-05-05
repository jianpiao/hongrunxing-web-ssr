import { defineNuxtConfig } from 'nuxt'


// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  ssr:true,
  meta: {
    title: '宏润兴地毯制造_润兴地毯-桂林市宏润兴地毯制造有限公司',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, user-scalable=0',
      },
      {
        name: 'keywords',
        content: '桂林市宏润兴地毯制造有限公司,宏润兴地毯制造,润兴地毯',
      },
      {
        name: 'description',
        content: `桂林市宏润兴地毯制造有限公司主要产品有手工羊毛地毯，手工腈纶地毯，尼龙印花地毯等。材质颜色、尺寸不限，量身定制。是一家集生产、设计、销售服务为一体的综合性生产工厂。公司成立至今，一直为客户需求为导向，不断提升自身实力及水平，不断提高服务水平及产品质量。
        咨询热线：13827754698 19167820380 13824219881`,
      },
      {
        name: 'author',
        content: '桂林市宏润兴地毯制造有限公司',
      },
    ],
  },

  css: ['@/assets/scss/index.scss'],

  // https://github.com/intlify/nuxt3
  // buildModules: ['@intlify/nuxt3'],

  // intlify: {
  //   default: 'cn',
  //   localeDir: 'locales',
  //   vueI18n: {
  //     locale: 'cn',
  //   },
  // },

  // alias:{
  //   "~":"/web/"
  // },

  vite: {
    css: {
      // https://github.com/nuxt-community/style-resources-module/issues/190
      // https://vite.nuxtjs.org/misc/common-issues/#styleresources
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/scss/global.scss";',
        },
      },
    },
  },

  router: {
    base:"/web/",    
    scrollBehavior(to, from, savedPosition) {
      console.log(savedPosition)
      return { x: 0, y: 0 }
    },
    extendRoutes(routes: any) {
      routes.push({
        path: '*',
        redirect: '/404',
      })
    },
  },

  app:{
    // baseURL:"/web/",
    // buildAssetsDir:"/web/",
  },

 

  // publicPath: https://github.com/nuxt/framework/issues/1467
  build: {},
})
