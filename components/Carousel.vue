<template>
  <div
    class="carousel"
    ref="carouselRef"
    @mouseenter="onMouseenter"
    @mouseleave="onMouseleave"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
    @touchcancel="onTouchEnd"
    :style="{ height: props.height }"
  >
    <ul class="carousel__body" :style="{ left: `-${left}px` }">
      <li
        class="carousel__item"
        v-for="(item, index) in list"
        :key="index"
        :style="{ backgroundImage: `url(${item})` }"
      ></li>
    </ul>
    <div @click="toLeft" class="carousel__btn-left">
      <div class="carousel__btn-left-box">
        <img src="../assets/svg/left.svg" />
      </div>
    </div>
    <div @click="toRight" class="carousel__btn-right">
      <div class="carousel__btn-right-box">
        <img src="../assets/svg/right.svg" />
      </div>
    </div>
    <!-- 指示器 -->
    <div class="indicator">
      <span
        v-for="(item, index) in list"
        :key="index"
        :style="{ opacity: current === index ? '1' : '0.2' }"
        @click="handleIndicatorItem(index)"
        @mouseenter="onMouseIndicator(index)"
      ></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useTouch } from "../composable/use-touch";

// const list = ref([
//   "https://s1.ax1x.com/2022/05/28/XuqJYQ.jpg",
//   "https://s1.ax1x.com/2022/05/28/XuqNSs.jpg",
//   "https://s1.ax1x.com/2022/05/28/XuqdO0.jpg",
// ]);
const list = ref([]);
const carouselRef = ref<Element>(null);
const current = ref(0);
const carouselWidth = ref(0);
const left = ref(0);
let autoplayTimer = null;
let lastTime = Date.now();
const touch = useTouch();

const props = defineProps({
  images: {
    require: true,
    type: Array,
  },
  autoplay: {
    type: Boolean,
    default: true,
  },
  height: {
    type: String,
    default: "calc(100vh - 110px)",
  },
});

watchEffect(() => {
  if (Array.isArray(props.images)) {
    list.value = props.images;
  }
});

// 挂载完毕（在客户端运行）
onMounted(() => {
  carouselWidth.value = carouselRef?.value?.clientWidth || 0;
  window.addEventListener("resize", onResize);
  autoplay();
});

// 销毁监听事件
onUnmounted(() => {
  stopAutoplay();
  window.removeEventListener("resize", onResize);
});

// 监听屏幕尺寸改变
const onResize = () => {
  carouselWidth.value = carouselRef.value?.clientWidth || 0;
};

// 节流
const throttle = (cb, delay = 500) => {
  let now = Date.now();
  if (now - lastTime >= delay) {
    cb();
    lastTime = now;
  }
};

// 左滑
const toLeft = () => {
  stopAutoplay();
  throttle(() => {
    toLeftFn();
  });
};

// 左滑动画
const toLeftFn = () => {
  if (current.value > 0) {
    current.value--;
  } else {
    current.value = list.value.length - 1;
  }
  left.value = current.value * carouselWidth.value;
};

// 右滑
const toRight = () => {
  stopAutoplay();
  throttle(() => {
    toRightFn();
  });
};

// 右滑动画
const toRightFn = () => {
  if (current.value < list.value.length - 1) {
    current.value++;
  } else {
    current.value = 0;
  }
  left.value = current.value * carouselWidth.value;
};

// 自动播放
const autoplay = () => {
  if (!props.autoplay) return;
  // 1. 先停掉之前的定时器
  stopAutoplay();
  // 2. 开启新的定时器
  autoplayTimer = setTimeout(() => {
    // 3. 右滑
    toRightFn();
    // 4. 重新执行自动播放
    autoplay();
  }, 2000);
};

// 鼠标划入
const onMouseenter = () => {
  stopAutoplay();
};

// 鼠标离开
const onMouseleave = () => {
  autoplay();
};

// 停止自动播放
const stopAutoplay = () => autoplayTimer && clearTimeout(autoplayTimer);

let touchStartTime: number;

const onTouchStart = (event: TouchEvent) => {
  touch.start(event);
  touchStartTime = Date.now();
  stopAutoplay();
};

const onTouchMove = (event: TouchEvent) => {
  touch.move(event);
  stopAutoplay();
  left.value = current.value * carouselWidth.value - touch.deltaX.value;
};

const delta = computed(() => touch.deltaX.value);

const onTouchEnd = () => {
  const duration = Date.now() - touchStartTime;
  const speed = delta.value / duration;
  const shouldSwipe =
    Math.abs(speed) > 0.25 || Math.abs(delta.value) > carouselWidth.value / 2;

  if (shouldSwipe) {
    touch.deltaX.value > 0 ? toLeftFn() : toRightFn();
  } else {
    left.value = current.value * carouselWidth.value;
  }
  stopAutoplay();
};

const handleIndicatorItem = (index: number) => {
  current.value = index;
  left.value = current.value * carouselWidth.value;
};

const onMouseIndicator = (index: number) => {
  current.value = index;
  left.value = current.value * carouselWidth.value;
};
</script>

<style lang="scss" scoped>
.carousel {
  width: 100%;
  height: calc(100vh - 110px);
  position: relative;
  overflow: hidden;

  .list {
    width: 100%;
    height: 100%;
    display: flex;
    transition: all 0.5s cubic-bezier(0.5, 0.5, 0.5, 1);
  }

  &__body {
    position: absolute;
    top: 0;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    display: flex;
    position: relative;
    margin: 0;
    padding: 0;
    transition: all 0.5s cubic-bezier(0.5, 0.5, 0.5, 1);
  }

  &__item {
    flex: 0 0 100%;
    height: 100%;
    list-style: none;
    margin: 0;
    padding: 0;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;

    img {
      height: 100%;
      width: 100%;
    }
  }

  &:hover &__btn-left,
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
