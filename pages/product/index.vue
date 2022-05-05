<template>
  <div class="container">
    <div class="box">
      <div class="left">
        <ul>
          <li v-for="(item, index) in 5" :key="index" @click="handleSideItem(item, index)"
            :style="{ color: cur === index ? `#fff` : `rgba(255, 255, 255, 0.4)` }">阿斯蒂芬</li>
        </ul>
      </div>
      <div class="right">右边</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"

const cur = ref(0)

const handleSideItem = (item: unknown, index: number) => {
  console.log(item)
  cur.value = index!
}

// const { data } = await useFetch('/product/getCategoryList?type=product')
// console.log(data.value)
</script>

<style scoped lang="scss">
.container {
  width: 100vw;
  height: calc(100vh - 110px);

  .box {
    display: flex;
    height: 100%;

    .left {
      width: 250px;
      height: 100%;
      padding: 95px 0 0 55px;
      background-color: #0f0f0f;

      ul {
        li {
          font: normal 400 13px/45px "PingFang SC", "Hiragino Sans GB", "Noto Sans CJK SC", "Source Han Sans SC", "Microsoft YaHei", "SimHei", Helvetica, Arial, serif;
          padding: 0 20px;
          display: inline-block;
          cursor: pointer;
          font-size: 16px;
          position: relative
        }
      }
    }

    .right {}
  }
}
</style>