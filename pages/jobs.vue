<template>
  <div class="job">
    <SectionHeader :name="pageName"></SectionHeader>
    <div class="content">
      <div v-html="content"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const content = ref(
  `<img src="https://dt.ceshiyuming.com.cn/static/upload/image/20220406/1649225699504447.jpg" />`
);

const pageName = ref("招贤纳士");

useHead({
  titleTemplate: pageName.value,
});
</script>

<style lang="scss" scoped>
.job {
  width: 100vw;
  min-height: calc(100vh - 110px);

  .content {
    padding: 0 0 20px 0;
    width: 1000px;
    margin: 0 auto;
    line-height: 28px;
    font-size: 14px;
    color: #fff;
  }
}
</style>
