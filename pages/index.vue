<template>
  <div class="home">
    <Carousel :height="carouselHeight"></Carousel>
  </div>
</template>

<script setup lang="ts" >
import Carousel from "../components/Carousel.vue";

const carouselHeight = ref('calc(100vh - 110px)')

onMounted(() => {
  console.log('document.body.clientHeight', document.documentElement.clientHeight)
  carouselHeight.value = `${document.documentElement.clientHeight - 110}px`
})

</script>

<style lang="scss" scoped>
.home {
  width: 100vw;
}
</style>