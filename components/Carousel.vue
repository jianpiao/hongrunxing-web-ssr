<template>
  <div class="carousel" :style="{ height }" ref="carousel" @mouseenter="onMouseenter" @mouseleave="onMouseleave"
    @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd" @touchcancel="onTouchEnd">
    <ul class="carousel__body" :style="{ transform: `translate3d(-${translateX}px,0,0)` }">
      <li class="carousel__item" v-for="(item, index) in list" :key="index">
        <img :src="item" alt="加载失败" />
      </li>
    </ul>
    <div @click="toLeft" class="carousel__btn-left">
      <div class="carousel__btn-left-box">
        <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg
          class="icon" width="50px" height="50.00px" viewBox="0 0 1024 1024" version="1.1"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M729.6 931.2l-416-425.6 416-416c9.6-9.6 9.6-25.6 0-35.2-9.6-9.6-25.6-9.6-35.2 0l-432 435.2c-9.6 9.6-9.6 25.6 0 35.2l432 441.6c9.6 9.6 25.6 9.6 35.2 0C739.2 956.8 739.2 940.8 729.6 931.2z"
            fill="#ffffff" />
        </svg>
      </div>
    </div>
    <div @click="toRight" class="carousel__btn-right">
      <div class="carousel__btn-left-box">
        <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg
          class="icon" width="50px" height="50.00px" viewBox="0 0 1024 1024" version="1.1"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M761.6 489.6l-432-435.2c-9.6-9.6-25.6-9.6-35.2 0-9.6 9.6-9.6 25.6 0 35.2l416 416-416 425.6c-9.6 9.6-9.6 25.6 0 35.2s25.6 9.6 35.2 0l432-441.6C771.2 515.2 771.2 499.2 761.6 489.6z"
            fill="#ffffff" />
        </svg>
      </div>
    </div>
    <!-- 指示器 -->
    <div class="indicator">
      <span v-for="(item, index) in list" :key="index" :style="{ opacity: current === index ? '1' : '0.2' }"></span>
    </div>
  </div>
</template>

<script setup lang="ts" >
import { ref, onMounted, defineProps } from 'vue';
import { useTouch } from "@/composables/use-touch"

const list = ref([
  "/assets/images/1.jpg",
  "/assets/images/2.jpg",
  "/assets/images/3.jpg"
])

const carousel = ref<any>(null)
const current = ref(0)
const width = ref(0)
const translateX = ref(0)
let autoplayTimer = null
const interTime = 500
let lastTime = Date.now()
const touch = useTouch()

defineProps({
  height: {
    type: String,
    default: '500px'
  }
})

// 挂载完毕（在客户端运行）
onMounted(() => {
  width.value = carousel.value.clientWidth
  autoplay()
  window.addEventListener('resize', onResize)
})

// 销毁监听事件
onUnmounted(() => {
  window.removeEventListener('resize', onResize)
})

// 监听屏幕尺寸改变
const onResize = () => {
  width.value = carousel.value.clientWidth
}

// 节流
const throttle = (cb) => {
  let now = Date.now()
  if (now - lastTime >= interTime) {
    cb()
    lastTime = now
  }
}

// 左滑
const toLeft = () => {
  stopAutoplay()
  throttle(() => {
    toLeftFn()
  })
}

// 左滑动画
const toLeftFn = () => {
  if (current.value > 0) {
    current.value--
  } else {
    current.value = list.value.length - 1
  }
  translateX.value = current.value * width.value
}

// 右滑
const toRight = () => {
  stopAutoplay()
  throttle(() => {
    toRightFn()
  })
}

// 右滑动画
const toRightFn = () => {
  if (current.value < list.value.length - 1) {
    current.value++
  } else {
    current.value = 0
  }
  translateX.value = current.value * width.value
}

// 自动播放
const autoplay = () => {
  autoplayTimer = setTimeout(() => {
    toRightFn()
    autoplay()
  }, 2000);
}

// 鼠标划入
const onMouseenter = () => {
  console.log('鼠标划入')
  stopAutoplay()
}

// 鼠标离开
const onMouseleave = () => {
  console.log('鼠标离开')
  autoplay()
}

// 停止自动播放
const stopAutoplay = () => clearTimeout(autoplayTimer);

let touchStartTime: number

const onTouchStart = (event: TouchEvent) => {
  touch.start(event);
  touchStartTime = Date.now();

  stopAutoplay();
}

const onTouchMove = (event: TouchEvent) => {
  touch.move(event);
  stopAutoplay();
  translateX.value = current.value * width.value - touch.deltaX.value
};

const delta = computed(() =>
  touch.deltaX.value
);

const onTouchEnd = () => {
  const duration = Date.now() - touchStartTime;
  const speed = delta.value / duration;
  const shouldSwipe =
    Math.abs(speed) > 0.25 || Math.abs(delta.value) > width.value / 2;

  if (shouldSwipe) {
    touch.deltaX.value > 0 ? toLeftFn() : toRightFn()
  } else {
    translateX.value = current.value * width.value
  }
}
</script>

<style lang="scss" scoped>
.carousel {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;

  &__body {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    display: flex;
    position: relative;
    margin: 0;
    padding: 0;
    transition-property: transform;
    transition-duration: 0.5s;
    transition-timing-function: cubic-bezier(0.5, 0.5, 0.5, 1);
  }

  &__item {
    flex: 0 0 100vw;
    height: 100%;
    list-style: none;
    margin: 0;
    padding: 0;
    transition-property: transform;

    img {
      height: 100%;
      width: 100%;
    }
  }

  &:hover &__btn-left {
    opacity: 1;
  }

  &:hover &__btn-right {
    opacity: 1;
  }

  @mixin btn {
    position: absolute;
    top: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    z-index: 10;
    opacity: 0;
    color: #fff;
    transition: all 0.3s ease-in;

    &-box {
      width: 50px;
      height: 50px;
    }
  }

  &__btn-left {
    left: 8vw;
    @include btn;
  }

  &__btn-right {
    right: 8vw;
    @include btn;
  }

  @media only screen and (max-width: 992px) {

    &__btn-left,
    &__btn-right {
      opacity: 1;
    }
  }

  /* 大型设备（笔记本电脑/台式机，992 像素及以上） */
  @media only screen and (min-width: 992px) {

    &__btn-left,
    &__btn-right {
      opacity: 0;
    }
  }

  .indicator {
    position: absolute;
    bottom: 20px;
    width: 100%;
    text-align: center;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;

    span {
      background-color: #fff;
      cursor: pointer;
      margin: 0 4px;
      width: 8px;
      height: 8px;
      display: block;
      border-radius: 50%;
    }
  }
}
</style>