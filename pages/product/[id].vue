<template>
  <div class="product-detail" ref="productDetailRef">
    <Empty v-if="pending"></Empty>
    <div v-else>
      <SectionHeader :name="pageName"></SectionHeader>
      <div class="header flex">
        <div class="header__left">
          <Carousel :height="`520px`" :autoplay="true" :images="detail.images">
          </Carousel>
        </div>
        <div class="header__right">
          <p class="header__right-name">产品名称：{{ detail.name }}</p>
          <p class="header__right-desc">产品描述：{{ detail.desc }}</p>
        </div>
      </div>
      <!-- 详情 -->
      <!-- <div class="interval-line"></div> -->
      <SectionHeader name="详情内容"></SectionHeader>
      <div class="content">
        <div v-html="(detail && detail.content) || ''"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "#app";
import report from "~~/composable/use-report";
import { BASE_URL } from "~~/config/default";

interface IProduct {
  id: number;
  desc: string;
  name: string;
  content: string;
  src: string;
  images: Array<string>;
}

const routes = useRoute();
const pageName = ref(routes.query.name as string);
const productDetailRef = ref(null);

const { pending, data: detail } = await useFetch(
  `${BASE_URL}/product/${routes.params.id}`,
  {
    transform(data: { data: IProduct }): IProduct {
      if (data?.data) {
        // console.log('res', data.data)
        let res: any = data.data;
        res.images =
          res.images && res.images.length > 0
            ? res.images.map((e) => e.src)
            : [res.src];
        res.content = res.content
          .replace(/<img/g, `<img style="width: 1400px"`)
          .replace(/<p><\/p>/g, "<br/>");
        return res;
      }
      return {
        id: 0,
        content: "",
        desc: "",
        name: "",
        src: "",
        images: [],
      };
    },
    key: `id=${routes.params.id}`,
  }
);

onMounted(() => {
  window.scrollTo(0, 0);
  report("productDetail");
});
</script>

<style scoped lang="scss">
.product-detail {
  width: 100vw;
  background-color: #fff;

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
        word-break: break-all;
      }

      // p:nth-child(1) {
      //   font-weight: bold;
      // }
    }
  }

  .interval-line {
    height: 1px;
    background-color: #eee;
    margin-top: 40px;
  }

  .content {
    width: 1400px;
    margin: 0 auto 20px;

    img {
      width: 1400px;
    }
  }

  @media only screen and (max-width: 1440px) {
    .content {
      width: calc(100vw - 40px);
      margin: 0 20px;
    }
  }

  @media only screen and (max-width: 1160px) {
    .header {
      flex-direction: column;

      &__left {
        width: calc(100vw - 40px);
        max-width: 1140px;
        height: calc(100vw - 40px);
        margin: 0 20px;
      }

      &__right {
        padding: 5px 20px;

        p {
          width: calc(100vw - 40px);
        }
      }
    }
  }
}
</style>
