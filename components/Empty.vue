<template>
  <div class="empty" :style="{ backgroundColor: bg }">{{ props.title }}</div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: false,
    default: "加载中...",
  },
  bg: {
    type: String,
    required: false,
    default: "rgba(0,0,0,0.7)",
  },
});
</script>

<style lang="scss" scoped>
.empty {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  font-size: 16px;
  color: #fff;
  background-color: rgba($color: #000000, $alpha: 0.7);
  pointer-events: none;
}
</style>
