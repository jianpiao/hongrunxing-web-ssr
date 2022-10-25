<template>
  <footer>
    <div>
      <p class="global-icp">
        {{ ICP }}
      </p>
    </div>
    <slot></slot>
  </footer>
</template>

<script lang="ts" setup>
import { ICP } from "../config/default";
</script>

<style scoped lang="scss">
footer {
  width: 100vw;
  min-height: var(--footerHeight);
  background-color: rgb(151, 6, 12);
  position: relative;

  div {
    display: var(--isICP);
  }
}
</style>
