<template>
  <div class="home">
    <Carousel :height="carouselHeight"></Carousel>
    <Carousel2 :height="'100vh'"></Carousel2>
    <!-- 关于 -->
    <div class="about" :style="{ backgroundImage: `url(${bgImg})` }">
      <div class="about__info">
        <h1 class="about__info-title">关于宏润兴</h1>
        <div class="about__info-con">
          桂林市宏润兴地毯制造有限公司是一家有28年生产定制地毯的专业型生产企业。公司集生产、设计、销售服务为一体的综合性生产工厂。公司产品繁多。主要产品有手工羊毛地毯，手工腈纶地毯，尼龙印花地毯等。材质颜色、尺寸不限，量身定制。
          公司本着“专业品质，精艺求精”为宗旨，以：“以人为本，诚实守望信”为经营理念。以为服务客户，客户满意为目标。
          产品以品质好，服务好得到众多的商家合作伙伴一直以来的大力支持，形成 了一个良好的销售环境。
          公司成立至今，一直为客户需求为导向，不断提升自身实力及水平，不断提高服务水平及产品质量。我们充分发挥团队精神，追求永续经营。公司将为客户提供更满意的产品及服务面努力。
        </div>
        <div class="about__info-more">了解更多</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" >
import { debounce } from "@/composables/use-debounce"

const carouselHeight = ref('calc(100vh - 110px)')
const clientHeight = ref(0)
let scrollTop = 0
const drag = 10
let isOnScroll = false
const bgImg = ref("https://dt.ceshiyuming.com.cn/static/upload/image/20211220/1639992665309668.jpg")

onMounted(() => {
  console.log('document.body.clientHeight', document.body.clientHeight)
  clientHeight.value = document.documentElement.clientHeight
  handleScroll()
})


const handleScroll = () => {
  window.addEventListener('scroll', debounce(onScroll, 50))
}

const onScroll = () => {
  console.log(window.scrollY)
  // if (isOnScroll) return
  // isOnScroll = true

  // // 下滑
  // const scrollY = window.scrollY
  // if (scrollY > scrollTop && scrollY < clientHeight.value + 106) {
  //   window.scrollTo({
  //     top: clientHeight.value,
  //     behavior: 'smooth'
  //   })
  // }
  // // 上划
  // if (scrollY < scrollTop && scrollY < clientHeight.value + 106) {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: 'smooth'
  //   })
  // }
  // scrollTop = scrollY
  // setTimeout(() => {
  //   isOnScroll = false

  // }, 200);
}

</script>

<style lang="scss" scoped>
.home {
  width: 100vw;
  padding-top: 110px;

  .about {
    height: 100vh;
    background-size: cover;
    background-position: 0% 0%;

    &__info {
      width: 50vw;
      height: 100%;
      margin: 0 0 0 50vw;
      padding: 0 180px 0 0;
      display: flex;
      flex-direction: column;
      justify-content: center;

      &-title {
        color: #FFFFFF;
        font-size: 38px;
        line-height: 80px;
      }

      &-con {
        position: relative;
        color: #FFFFFF;
        max-height: calc(100vh - 190px);
        font-size: 18px;
        line-height: 36px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 15;
      }

      &-more {
        background-color: #000;
        color: #fff;
        width: 146px;
        height: 40px;
        font-size: 16px;
        font-weight: 500;
        padding: 0;
        line-height: 39px;
        letter-spacing: 0.4px;
        text-align: center;
        border-radius: 2px;
        border: solid 1px #666;
        margin-top: 24px;
      }
    }
  }
}
</style>