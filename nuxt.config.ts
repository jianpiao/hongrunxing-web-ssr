import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  target: "server",
  ssr: true,
  meta: {
    title: "宏润兴地毯制造_润兴地毯-桂林市宏润兴地毯制造有限公司",
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    meta: [
      { charset: "utf-8" },
      { name: "sogou_site_verification", content: "ChLqnfCbKT" },
      {
        name: "baidu-site-verification",
        content: "code-Z7Jj4v4mVK",
      },
      {
        name: "360-site-verification",
        content: "58dfd1a40513ba0bbe4d661342317e20",
      },
      {
        name: "shenma-site-verification",
        content: "06f536d66ea7b05aaaad62469cf166b6_1656382474",
      },
      {
        name: "msvalidate.01",
        content: "8B90D5E0AFADBACA8FD68B4C2BE0D3AB",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, user-scalable=0",
      },
      {
        name: "keywords",
        content: "桂林市宏润兴地毯制造有限公司,宏润兴地毯制造,润兴地毯",
      },
      {
        name: "description",
        content: `桂林市宏润兴地毯制造有限公司主要产品有手工羊毛地毯，手工腈纶地毯，尼龙印花地毯等。材质颜色、尺寸不限，量身定制。是一家集生产、设计、销售服务为一体的综合性生产工厂。公司成立至今，一直为客户需求为导向，不断提升自身实力及水平，不断提高服务水平及产品质量。
        咨询热线：13827754698 19167820380 13824219881`,
      },
      {
        name: "author",
        content: "桂林市宏润兴地毯制造有限公司",
      },
    ],
  },
  css: ["@/assets/css/index.css", "@/assets/css/init.css"],
  router: {
    base: "/ssr/",
    scrollBehavior(to: any, from: any, savedPosition: any) {
      if (savedPosition) return savedPosition;
      return { x: 0, y: 0 };
    },
    extendRoutes(routes: any) {
      routes.push({
        path: "*",
        redirect: "/404",
      });
    },
  },
  buildModules: ["@nuxtjs/tailwindcss"],
  plugins: [{ src: "~/plugins/sentry.ts", mode: "client" }],
  server: {
    port: 3000,
    host: "0.0.0.0",
  },
  build: {},
});
