<template>
  <transition name="fade">
    <div class="back-top" v-show="show" @click="backTop">
      <img width="24" height="24" src="/images/to_top.png" />
    </div>
  </transition>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

const show = ref(false);

const handleScroll = () => {
  let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
  show.value = scrollTop > 150;
};

// 回到顶部
const backTop = () => {
  document.querySelector("body").scrollIntoView({
    block: "start",
    inline: "nearest",
    behavior: "smooth",
  });
};

onMounted(() => {
  handleScroll();
  window.addEventListener("scroll", handleScroll, true);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll, true);
});
</script>

<style lang="scss" scoped>
.back-top {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  position: fixed;
  bottom: 40px;
  right: 40px;
  background-color: #fff;
  z-index: 2147483647; // 最大值
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.122);
  cursor: pointer;
  color: #333;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: rgba(255, 255, 255, 0.8);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
