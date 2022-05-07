<template>
  <div class="product-detail">
    <SectionHeader :name="pageName"></SectionHeader>
    <div class="header flex">
      <div class="header__left">
        <img
          width="520"
          height="520"
          src="https://dt.ceshiyuming.com.cn/static/upload/image/20220120/1642664434980609.jpg"
        />
      </div>
      <div class="header__right">
        <p class="header__right-name">产品名称：FP2</p>
        <p class="header__right-desc">
          产品描述：FP2系列以有节奏的排线构成了该系列的基础，提供了复杂性和功能性的完美结合，在纹理尺度上发生变化，以实现平滑过渡、风格和设计的同步，为我们工作和学习的空间服务。
        </p>
      </div>
    </div>
    <!-- 详情 -->
    <div class="interval-line"></div>
    <div class="content">
      <div v-html="content"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const pageName = ref("PRF2");
const content = `<div>
<img src="https://dt.ceshiyuming.com.cn/static/upload/image/20220406/1649226292892989.jpg" />
<p>
  <br/>
</p>
<img src="https://dt.ceshiyuming.com.cn/static/upload/image/20220120/1642664173162967.jpg" />
<p><br/></p>
<img src="https://dt.ceshiyuming.com.cn/static/upload/image/20220120/1642664173159375.jpg" />
<p><br/></p>
<img src="https://dt.ceshiyuming.com.cn/static/upload/image/20220120/1642664175209056.jpg" />
<p><br/></p>
</div>`;
</script>

<style scoped lang="scss">
.product-detail {
  width: 100vw;
  .header {
    width: 1200px;
    margin: 0 auto;
    &__left {
      width: 520px;
      height: 520px;
    }
    &__right {
      flex: 1;
      padding: 5px 20px;
      p {
        font-family: "Source Han Sans CN" !important;
        font-size: 16px;
        line-height: 28px;
        letter-spacing: 1px;
        color: #555;
      }
    }
  }

  .content {
    width: 1200px;
    margin: 50px auto 20px;
  }
}
</style>
