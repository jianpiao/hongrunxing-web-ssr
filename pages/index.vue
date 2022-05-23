<template>
  <div class="home">
    <Carousel :height="carouselHeight"></Carousel>
    <Carousel2 :height="carouselHeight2"></Carousel2>
  </div>
</template>

<script setup lang="ts" >
import Carousel from "../components/Carousel.vue";
import { debounce } from "@/composables/use-debounce"

const carouselHeight = ref('calc(100vh - 110px)')
const carouselHeight2 = ref('100vh')
const clientHeight = ref(0)
let scrollTop = 0
const drag = 10
let isOnScroll = false

onMounted(() => {
  console.log('document.body.clientHeight', document.documentElement.clientHeight)
  carouselHeight.value = `${document.documentElement.clientHeight - 110}px`
  clientHeight.value = document.documentElement.clientHeight
  handleScroll()
})

const handleScroll = () => {
  window.addEventListener('scroll', debounce(onScroll, 50))
}

const onScroll = () => {
  console.log(window.scrollY)
  if (isOnScroll) return
  isOnScroll = true

  // 下滑
  const scrollY = window.scrollY
  if (scrollY > scrollTop && scrollY < clientHeight.value + 106) {
    window.scrollTo({
      top: clientHeight.value,
      behavior: 'smooth'
    })
  }
  // 上划
  if (scrollY < scrollTop && scrollY < clientHeight.value + 106) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  setTimeout(() => {
    isOnScroll = false
    scrollTop = scrollY
  }, 200);
}

</script>

<style lang="scss" scoped>
.home {
  width: 100vw;
}
</style>