<template>
  <div
    class="carousel"
    :style="{ height }"
    ref="carousel"
    @mouseenter="onMouseenter"
    @mouseleave="onMouseleave"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
    @touchcancel="onTouchEnd"
  >
    <ul
      class="carousel__body"
      :style="{ transform: `translate3d(-${translateX}px,0,0)` }"
    >
      <li class="carousel__item" v-for="(item, index) in list" :key="index">
        <img :src="item" alt="加载失败" />
      </li>
    </ul>
    <div class="btn-list">
      <p
        v-for="(item, index) in list.length"
        @mouseenter="onMouseenterBtn(index)"
        @mouseleave="onMouseleaveBtn"
        :key="index"
        :style="{
          fontSize: current === index ? '20px' : '18px',
          fontWeight: current === index ? '600' : '400',
          height:current===index?'36px':'30px',
          lineHeight:current===index?'36px':'30px'
        }"
      >
        分类按钮{{ index }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps } from "vue";
import { useTouch } from "@/composables/use-touch";

const list = ref([
  "/assets/images/1.jpg",
  "/assets/images/2.jpg",
  "/assets/images/3.jpg",
]);

const carousel = ref<any>(null);
const current = ref(0);
const width = ref(0);
const translateX = ref(0);
let autoplayTimer = null;
const interTime = 500;
let lastTime = Date.now();
const touch = useTouch();

defineProps({
  height: {
    type: String,
    default: "500px",
  },
});

// 挂载完毕（在客户端运行）
onMounted(() => {
  width.value = carousel.value.clientWidth;
  autoplay();
  window.addEventListener("resize", onResize);
});

// 销毁监听事件
onUnmounted(() => {
  window.removeEventListener("resize", onResize);
});

// 监听屏幕尺寸改变
const onResize = () => {
  width.value = carousel.value.clientWidth;
};

// 防抖
const debounce = (cb) => {
  let now = Date.now();
  if (now - lastTime >= interTime) {
    cb();
    lastTime = now;
  }
};

// 左滑
const toLeft = () => {
  debounce(() => {
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
  translateX.value = current.value * width.value;
};

// 右滑
const toRight = () => {
  debounce(() => {
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
  translateX.value = current.value * width.value;
};

// 自动播放
const autoplay = () => {
  autoplayTimer = setTimeout(() => {
    toRightFn();
    stopAutoplay()
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

const onMouseenterBtn = (index:number) => {
    stopAutoplay();
    current.value = index
    translateX.value = current.value * width.value;
}

const onMouseleaveBtn = ()=>{
  autoplay();
}

// 停止自动播放
const stopAutoplay = () => clearTimeout(autoplayTimer);

let touchStartTime: number;

const onTouchStart = (event: TouchEvent) => {
  touch.start(event);
  touchStartTime = Date.now();

  stopAutoplay();
};

const onTouchMove = (event: TouchEvent) => {
  touch.move(event);
  stopAutoplay();
  translateX.value = current.value * width.value - touch.deltaX.value;
};

const delta = computed(() => touch.deltaX.value);

const onTouchEnd = () => {
  const duration = Date.now() - touchStartTime;
  const speed = delta.value / duration;
  const shouldSwipe =
    Math.abs(speed) > 0.25 || Math.abs(delta.value) > width.value / 2;

  if (shouldSwipe) {
    touch.deltaX.value > 0 ? toLeftFn() : toRightFn();
  } else {
    translateX.value = current.value * width.value;
  }
};
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
    transition-duration: 0.8s;
    transition-timing-function:cubic-bezier(0.445, 0.05, 0.55, 0.95);
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

  .btn-list {
    position: absolute;
    left: 6vw;
    top: 10vh;
    z-index: 10;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    border-left: 1px solid #fff;
    padding-left: 20px;

    p {
      height: 30px;
      line-height: 30px;
      color: #fff;
      font-size: 18px;
      cursor: pointer;
      display: inline-block;
    }
  }
}
</style>
