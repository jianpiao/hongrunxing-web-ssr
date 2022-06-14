<template>
  <div class="home" :style="{ transform: `translate3d(0,-${transitionY}px,0)` }" ref="homeRef">
    <Carousel :height="'calc(100vh - 110px)'" :images="carouselList"></Carousel>
    <Carousel2 :height="'100vh'"></Carousel2>
    <!-- 关于 -->
    <div class="about" :style="{ backgroundImage: `url(${aboutInfo.show_img})` }">
      <div class="about__info" v-if="aboutInfo">
        <h1 class="about__info-title">{{ aboutInfo.title }}</h1>
        <div class="about__info-con">
          <span v-html="aboutInfo.desc"></span>
        </div>
        <div class="about__info-more" @click="jumpAbout">了解更多</div>
      </div>
    </div>
    <!-- 页脚 -->
    <Footer style="height:106px"></Footer>
  </div>
</template>

<script setup lang="ts" >
import { ref, onMounted, onUnmounted } from "vue";
import { debounce } from "~~/composable/use-debounce"
import { BASE_URL } from "~~/config/default";
import { useRouter } from "vue-router"
import report from "~~/composable/use-report";
import { useTouch } from "~~/composable/use-touch";

const clientHeight = ref(0)
const touch = useTouch()
const homeRef = ref(null)
const router = useRouter()
const transitionY = ref(0)

let loadingTimer = null
let current = 0
let isLoadingAnimation = false


onMounted(() => {
  // 设置父级footer的高度为0，将其隐藏
  document.documentElement.style.setProperty('--footerHeight', '0px')
  // 默认回到顶部
  window.scrollTo(0, 0)
  // 埋点
  report("home")
  // 获取页面高度
  clientHeight.value = document.documentElement.clientHeight
  // 如果是PC端则设置滚轮监听事件，由于组件的挂载会比当前父组件晚一些，所以需要异步获取
  setTimeout(() => {
    if (homeRef.value.clientWidth > 992) {
      addMousewheel()
    }
  }, 500);
  window.onresize = () => {
    if (homeRef.value.clientWidth > 992) {
      current = 0
      addMousewheel()
    } else {
      transitionY.value = 0
      removeMousewheel()
    }
  }
})

// 添加滚轮事件
const addMousewheel = () => {
  document.addEventListener('mousewheel', onMousewheel, false)
  document.addEventListener('DOMMouseScroll', onMousewheel, false)
}

// 移除滚轮事件
const removeMousewheel = () => {
  document.removeEventListener('mousewheel', onMousewheel, false)
  document.removeEventListener('DOMMouseScroll', onMousewheel, false)
}

// 监听滚轮滚动
const onMousewheel = (event: any) => {
  event.stopPropagation();
  // 第一帧是0，直接忽略
  // DOMMouseScroll的detail属性为正数，wheelDeltaY的wheelDelta属性为负数，正好相反
  const deltaY = event.wheelDeltaY ? event.wheelDeltaY : -event.detail
  if (deltaY === 0) return
  // 向下是true，向上是false
  const is = deltaY > 0
  changeTransition(is)
}

// 切换
const changeTransition = (is) => {
  if (!isLoadingAnimation) {
    isLoadingAnimation = true
    if (is) {
      if (current > 0) {
        transitionY.value = current * clientHeight.value
        current--
      } else {
        transitionY.value = 0
      }
    } else {
      if (current < 2) {
        current++
        transitionY.value = current * clientHeight.value
      } else if (current >= 2) {
        transitionY.value = current * clientHeight.value + 106
      }
    }
    // 动画执行过程禁止操作
    loadingTimer = setTimeout(() => {
      isLoadingAnimation = false
    }, 1200);
  }
}

onUnmounted(() => {
  clearTimeout(loadingTimer)
  removeMousewheel()
  document.documentElement.style.setProperty('--footerHeight', '106px')
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
    transform(data: { data: { show_img: string, desc: string, title: string } }) {
      return data?.data;
    },
    key: "company_info"
  }),
]);

const jumpAbout = () => {
  router.push('/about?currentTab=2')
}
</script>

<style lang="scss" scoped>
.home {
  width: 100vw;
  height: calc(100vh - 110px);
  transition-property: transform;
  transition-duration: 1s;
  transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  box-sizing: border-box;

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
    height: auto;

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