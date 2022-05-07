<template>
  <div class="section-header">
    <h3 class="section-header__subtitle">
      <span
        class="section-header__subtitleLine"
        :style="{ color: theme === 'dark' ? '#595959' : '#fff' }"
        >{{ props?.name || "" }}</span
      >
    </h3>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
  name: String,
  theme: {
    type: String,
    default: "dark",
  },
});
</script>

<style scoped lang="scss">
.section-header {
  width: 960px;
  margin: 0 auto;
  padding: 50px 0 40px 0;
  .section-header {
    &__subtitle {
      color: #ffffff;
      position: relative;
      overflow: hidden;
      max-width: 940px;
      text-align: center;
    }
    &__subtitleLine {
      font: normal 400 30px/50px " Source Han Sans CN";
      transform-origin: left;
      transform-origin: center;
      max-width: 940px;
      margin: auto;
      width: auto;
      color: #595959;
      display: inline-block;
      padding: 0 14px;
      position: relative;
      z-index: 2;
      &::before {
        content: "";
        width: 650px;
        height: 1px;
        background-color: #e1e1e1;
        position: absolute;
        left: -650px;
        z-index: 1;
        top: 25px;
      }
      &::after {
        content: "";
        width: 650px;
        height: 1px;
        background-color: #e1e1e1;
        position: absolute;
        right: -650px;
        z-index: 1;
        top: 25px;
      }
    }
  }
}
</style>
