<template>

  <div class="product-detail">
    <Empty v-if="pending"></Empty>
    <div v-else>
      <SectionHeader :name="pageName"></SectionHeader>
      <div class="header flex">
        <div class="header__left">
          <Carousel :height="'520px'" style="width:520px" :autoplay="false" :images="detail.images"></Carousel>
        </div>
        <div class="header__right">
          <p class="header__right-name">产品名称：{{ detail.name }}</p>
          <p class="header__right-desc">
            产品描述：{{ detail.desc }}
          </p>
        </div>
      </div>
      <!-- 详情 -->
      <!-- <div class="interval-line"></div> -->
      <SectionHeader name="详情内容"></SectionHeader>
      <div class="content">
        <div v-html="detail.content"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BASE_URL } from '~~/config/default';
import { useRoute } from "#app"

interface IProduct {
  id: number
  desc: string
  name: string
  content: string
  src: string
  images: Array<string>
}

const routes = useRoute();
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


const { pending, data: detail } = useLazyFetch(`${BASE_URL}/product/get_by_id?id=${routes.query.id}`, {
  transform(data: { data: IProduct }): IProduct {
    if (data?.data) {
      let res: any = data.data
      res.images = res.images.map(e => e.src)
      res.content = res.content.replaceAll("<img", `<img style="width:1200px"`)
      return res
    }
    return {
      id: 0,
      content: '',
      desc: "",
      name: '',
      src: "",
      images: []
    }
  }
})
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

  .interval-line {
    height: 1px;
    background-color: #eee;
    margin-top: 40px;
  }

  .content {
    width: 1200px;
    margin: 0 auto 20px;
  }
}
</style>
