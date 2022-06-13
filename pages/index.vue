<template>
  <div class="home">
    <Carousel :height="carouselHeight" :images="carouselList"></Carousel>
    <div class="scroll_page"
      :style="{ top: `calc(100vh - ${currentTop}px)`, opacity: (currentTop * 3) / clientHeight }">
      <Carousel2 :height="'100vh'"></Carousel2>
    </div>
    <!-- 关于 -->
    <div class="about" :style="{ backgroundImage: `url(${bgImg})` }">
      <div class="about__info" v-if="aboutInfo">
        <h1 class="about__info-title">{{ aboutInfo.title }}</h1>
        <div class="about__info-con">
          <span v-html="aboutInfo.desc"></span>
          阿卡加斯的弗兰克阿斯卡纶都放假啊看拉时代峻峰看拉世纪东方了卡世纪东方看啦就是的风口浪尖啊是懒得看放假阿喀琉斯的房间可拉伸的就废了卡世纪东方看啦就是的反馈拉世纪东方
          阿卡加斯的弗兰克阿斯卡纶都放假啊看拉时代峻峰看拉世纪东方了卡世纪东方看啦就是的风口浪尖啊是懒得看放假阿喀琉斯的房间可拉伸的就废了卡世纪东方看啦就是的反馈拉世纪东方
          阿卡加斯的弗兰克阿斯卡纶都放假啊看拉时代峻峰看拉世纪东方了卡世纪东方看啦就是的风口浪尖啊是懒得看放假阿喀琉斯的房间可拉伸的就废了卡世纪东方看啦就是的反馈拉世纪东方
          阿卡加斯的弗兰克阿斯卡纶都放假啊看拉时代峻峰看拉世纪东方了卡世纪东方看啦就是的风口浪尖啊是懒得看放假阿喀琉斯的房间可拉伸的就废了卡世纪东方看啦就是的反馈拉世纪东方
          阿卡加斯的弗兰克阿斯卡纶都放假啊看拉时代峻峰看拉世纪东方了卡世纪东方看啦就是的风口浪尖啊是懒得看放假阿喀琉斯的房间可拉伸的就废了卡世纪东方看啦就是的反馈拉世纪东方
          阿卡加斯的弗兰克阿斯卡纶都放假啊看拉时代峻峰看拉世纪东方了卡世纪东方看啦就是的风口浪尖啊是懒得看放假阿喀琉斯的房间可拉伸的就废了卡世纪东方看啦就是的反馈拉世纪东方
          阿卡加斯的弗兰克阿斯卡纶都放假啊看拉时代峻峰看拉世纪东方了卡世纪东方看啦就是的风口浪尖啊是懒得看放假阿喀琉斯的房间可拉伸的就废了卡世纪东方看啦就是的反馈拉世纪东方
        </div>
        <div class="about__info-more" @click="jumpAbout">了解更多</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" >
import { ref, onMounted, onUnmounted } from "vue";
import { debounce } from "~~/composable/use-debounce"
import { BASE_URL } from "~~/config/default";
import { useRouter } from "vue-router"
import report from "~~/composable/use-report";

interface IAbout {
  address?: string,
  desc: string
  id?: number
  email?: string
  name?: string
  pone?: string
  qq?: string
  title: string
  show_img: string
}

const carouselHeight = ref('calc(100vh - 110px)')
const clientHeight = ref(0)
let scrollTop = 0
const drag = 10
let isOnScroll = false
const bgImg = ref("https://dt.ceshiyuming.com.cn/static/upload/image/20211220/1639992665309668.jpg")
const router = useRouter()
let current = 0
const currentTop = ref(0)

onMounted(() => {
  window.scrollTo(0, 0)
  report("home")
  clientHeight.value = document.documentElement.clientHeight
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})

const [{ data: carouselList }, { data: aboutInfo }] = await Promise.all([
  useFetch(BASE_URL + `/carousel/get`, {
    transform(data: any) {
      if (data?.data?.list) {
        return data.data.list.map(e => e.path)
      }
      return []
    },
    key: "carouselList"
  }),
  useFetch(BASE_URL + "/company_info/get?type=web", {
    transform(input: any) {
      return input?.data;
    },
    key: "company_info"
  }),
]);


const handleScroll = () => {
  window.addEventListener('scroll', onScroll)
}

const onScroll = () => {
  currentTop.value = window.scrollY
  console.log(window.scrollY, current)
  // if (isOnScroll) return
  // isOnScroll = true

  // // 下滑
  // const scrollY = window.scrollY
  // if (scrollY > scrollTop) {
  //   window.scrollTo({
  //     top: clientHeight.value * (++current),
  //     behavior: 'smooth'
  //   })
  // }
  // // 上划
  // if (scrollY < scrollTop) {
  //   window.scrollTo({
  //     top: clientHeight.value * (--current),
  //     behavior: 'smooth'
  //   })
  // }
  // scrollTop = scrollY
  // setTimeout(() => {
  //   isOnScroll = false

  // }, 1000);
}

const jumpAbout = () => {
  router.push('/about?currentTab=2')
}

</script>

<style lang="scss" scoped>
.home {
  width: 100vw;

  .scroll_page {
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: 100vh;
    left: 0;
    z-index: 100;
    background-color: transparent;
  }

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
        cursor: pointer;
      }
    }
  }

  @media only screen and (max-width: 992px) {
    .about {
      &__info {
        width: 100vw;
        padding: 0 20px;
        margin: 0;

        &-title {
          text-align: center;
        }

        &-con {
          -webkit-line-clamp: 12;
        }

        &-more {
          margin: 24px auto 0 auto;
        }
      }
    }
  }
}
</style>