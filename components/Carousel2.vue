<template>
  <div class="carousel" :style="{ height }" ref="carouselRef">
    <ul
      class="carousel__body"
      :style="{ transform: `translate3d(-${translateX}px,0,0)` }"
    >
      <li
        class="carousel__item"
        v-for="(item, index) in categoryList"
        :key="index"
        :style="{ backgroundImage: `url(${item.src})` }"
      >
        <!-- <img :src="item" alt="加载失败" /> -->
      </li>
    </ul>
    <div class="btn-list">
      <div class="left-line" :style="{ top: `${current * 40}px` }"></div>
      <p
        v-for="(item, index) in categoryList"
        @mouseenter="onMouseenterBtn(index)"
        @mouseleave="onMouseleaveBtn"
        :key="index"
        :class="{ active: current === index }"
        @click="jumpProduct"
      >
        {{ item.name }}
      </p>
    </div>
    <!-- 按钮 -->
    <div class="btn" @click="jumpProduct">点击探索</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { BASE_URL } from "../config/default";
import { useRouter } from "vue-router";

const list = ref([]);

const router = useRouter();
const carouselRef = ref<any>(null);
const current = ref(0);
const width = ref(0);
const translateX = ref(0);
const interTime = 500;
let lastTime = Date.now();
let refreshClientTimes = 0;

defineProps({
  height: {
    type: String,
    default: "500px",
  },
});

const { data: categoryList } = await useFetch(
  BASE_URL + "/product/getCategoryList?type=product",
  {
    transform(data: any) {
      return data?.data;
    },
    key: "categoryList",
  }
);

// 挂载完毕（在客户端运行）
onMounted(() => {
  width.value = carouselRef.value?.clientWidth;
  if (carouselRef.value?.clientWidth === 0 && refreshClientTimes < 10) {
    setTimeout(() => {
      refreshClientTimes++;
      width.value = carouselRef.value?.clientWidth;
    }, 100);
  }
  window.addEventListener("resize", onResize);
});

// 销毁监听事件
onUnmounted(() => {
  window.removeEventListener("resize", onResize);
});

// 监听屏幕尺寸改变
const onResize = () => {
  width.value = carouselRef.value?.clientWidth;
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

const onMouseenterBtn = (index: number) => {
  current.value = index;
  translateX.value = current.value * width.value;
};

const onMouseleaveBtn = () => {};

// 跳转到产品页
const jumpProduct = () => {
  router.push(
    `/product?currentTab=0&type=${categoryList.value[current.value].id}`
  );
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
    transition-duration: 2s;
    transition-timing-function: ease;
  }

  &__item {
    flex: 0 0 100vw;
    height: 100%;
    list-style: none;
    margin: 0;
    padding: 0;
    transition-property: transform;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;

    // img {
    //   height: 100%;
    //   width: 100%;
    // }
  }

  .btn-list {
    position: relative;
    box-sizing: border-box;
    position: absolute;
    left: 6vw;
    top: calc(10vh + 110px);
    z-index: 10;
    display: flex;
    flex-direction: column;
    border-left: 2px solid rgba(255, 255, 255, 0.5);

    p {
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      font-weight: 400;
      color: rgba(255, 255, 255, 0.5);
      cursor: pointer;
      display: inline-block;
      transition: all 0.5s ease;
      transform-origin: 0 10px;
      padding-left: 20px;
    }

    .active {
      font-size: 24px;
      font-weight: 600;
      color: #fff;
    }

    .left-line {
      position: absolute;
      left: -2px;
      top: 0;
      height: 36px;
      width: 2px;
      background-color: #fff;
      transition: top 0.5s ease;
    }
  }

  .btn {
    position: absolute;
    bottom: 69px;
    width: 146px;
    height: 40px;
    line-height: 38px;
    border-radius: 2px;
    text-align: center;
    color: #fff;
    border: 1px solid #fff;
    font-weight: 500;
    display: block;
    cursor: pointer;
    font-size: 16px;
    letter-spacing: 0.4px;
    font-family: "PingFamargin-left: -73px;ng SC", "Hiragino Sans GB",
      "Noto Sans CJK SC", "Source Han Sans SC", "Microsoft YaHei", "SimHei",
      Helvetica, Arial;
    left: calc(50% - 73px);
    z-index: 1;
    background-color: transparent;

    &:hover {
      background-color: rgba(0, 0, 0, 0.85);
    }
  }
}
</style>
