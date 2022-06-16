<template>
  <div class="product-container">
    <div class="box">
      <!-- 分类 -->
      <div class="left">
        <ul v-if="currentCategoryList && currentCategoryList.length > 0">
          <li v-for="(item, index) in currentCategoryList" :key="item.id" @click="handleSideItem(item, index)"
            :class="{ active: current === index }">
            {{ item.name }}
          </li>
        </ul>
        <Empty v-else title="暂无数据" bg="transparent" />
      </div>
      <!-- 产品数据 -->
      <div class="right flex">
        <div v-for="(item, index) in productList" :key="index" :index="index % 4"
          @mouseenter="onMouseenter(item, index)" @mouseleave="onMouseleave(item, index)" @click="handleItem(item)"
          class="item flex" :style="{
            marginLeft: index % 2 !== 0 ? `5px` : `0`,
            marginTop: index % 4 === 3 ? '-50px' : '0px'
          }">
          <img class="shade-img" :src="item.src">
          <transition name="fade">
            <div :class="{ 'fade-img': item.state }"
              :style="{ backgroundImage: `url(${item.images.length > 0 ? item.images[1].src : item.src})` }"
              v-if="item.state"></div>
          </transition>
          <span>{{ item.name }}</span>
        </div>
        <!-- 顶部tabs -->
        <div class="tabs">
          <ul v-if="currentCategoryList && currentCategoryList.length > 0">
            <li v-for="(item, index) in currentCategoryList" :key="item.id" @click="handleSideItem(item, index)"
              :class="{ active: current === index }">
              {{ item.name }}
            </li>
          </ul>
        </div>
        <Empty v-if="productList && productList.length === 0" title="暂无数据" bg="transparent" style="margin-top:40px" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { BASE_URL } from "../../config/default";
import { useRouter } from "vue-router";
import { IProduct } from "~~/api/typing";
import report from "~~/composable/use-report";

const current = ref(0);
const { currentRoute, push } = useRouter();
const currentCategoryList = ref([]);
const productList = ref<IProduct[]>([])

onMounted(() => {
  window.scrollTo(0, 0)
  report("product")
})

const handleSideItem = (item: unknown, index: number) => {
  current.value = index!;
  const { currentTab, type } = currentRoute?.value?.query;
  push(`/product?currentTab=${currentTab}&type=${type}&current=${index}`);
};

const onMouseenter = (item, index) => {
  const data = productList.value;
  data[index].state = true;
};

const onMouseleave = (item, index) => {
  const data = productList.value;
  data[index].state = false;
};

const handleItem = (item: { id: number, name: string }) => {
  push(`/product/${item.id}?name=${item.name}`);
};

const [{ data: list }, { data: categoryList }] = await Promise.all([
  useFetch(BASE_URL + `/product/getList?type=product`, {
    transform(data: { data: { list: IProduct[] } }) {
      if (data?.data?.list) {
        return data?.data?.list.map(e => {
          e.state = false
          return e
        })
      }
      return []
    },
    key: "productList"
  }),
  useFetch(BASE_URL + "/product/getCategoryList?type=product", {
    transform(input: any) {
      if (input?.data) {
        return input.data.map((e) => {
          if (!e.children) {
            e.children = [];
          }
          return e;
        });
      }
      return [];
    },
    key: "categoryList"
  }),
]);

watchEffect(() => {
  // 分类id  
  const type = currentRoute?.value?.query?.type || 0;
  // 当前分类索引
  current.value = Number(currentRoute?.value?.query?.current || 0);

  // 左边侧栏分类
  const categoryItem = categoryList?.value?.find((e) => e.id === Number(type));
  currentCategoryList.value = categoryItem?.children || [];

  // 产品列表
  let id = currentCategoryList.value[current.value]?.id
  productList.value = id && list.value.filter(e => e.category === Number(type) && e.texture === id) || []

  // 修改网页标题
  useHead({
    titleTemplate: `宏润兴${currentCategoryList.value[current.value]?.name || "产品中心"
      }`,
  });
});
</script>

<style scoped lang="scss">
.product-container {
  width: 100vw;
  min-height: calc(100vh - 110px);
  overflow-x: hidden;

  .flex {
    display: flex;
  }

  @mixin item {
    position: relative;
    background-color: #6b6b6b;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: 0 50%;
    color: rgba(255, 255, 255, 1);
    font-size: 18px;
    cursor: pointer;
    box-sizing: border-box;
    overflow: hidden;
    align-items: center;
    justify-content: center;
    margin-bottom: 5px;

    .shade-img {
      width: 100%;
    }

    span {
      position: absolute;
      z-index: 1;
    }
  }

  @mixin small-right {
    width: 100%;
    padding-top: 40px;

    .item {
      @include item();
      width: 100%;
      margin: 0 0 4px 0 !important;
    }
  }

  @mixin big-right {
    width: calc(100% - 250px);

    .item {
      @include item();

      &[index="0"] {
        height: calc(50vh - 5px);
        width: calc(40vw - 125px);
      }

      &[index="1"] {
        height: calc(50vh - 55px);
        width: calc(60vw - 135px);
      }

      &[index="2"] {
        height: calc(50vh - 50px);
        width: calc(40vw - 125px);
      }

      &[index="3"] {
        height: 50vh;
        width: calc(60vw - 130px);
      }
    }
  }

  .fade-img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    filter: blur(0);
    z-index: 10;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    opacity: 1;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.3s ease-in-out;
  }

  .fade-enter-from,
  .fade-leave-to {
    filter: blur(100px) opacity(100%) invert(100%) brightness(0.80);
    opacity: 0;
  }

  .box {
    width: 100vw;
    display: flex;
    min-height: calc(100vh - 110px);
    box-sizing: border-box;
    background-color: #000;
    overflow: hidden;

    .left {
      width: 250px;
      min-height: calc(100vh - 110px);
      padding: 95px 0 0 55px;
      background-color: #0f0f0f;
      position: relative;

      ul {
        overflow: hidden;

        li {
          font: normal 400 13px/45px "PingFang SC", "Hiragino Sans GB",
            "Noto Sans CJK SC", "Source Han Sans SC", "Microsoft YaHei",
            "SimHei", Helvetica, Arial, serif;
          padding: 0 20px;
          width: 100%;
          display: inline-block;
          cursor: pointer;
          font-size: 16px;
          position: relative;
          color: rgba(255, 255, 255, 0.4);

          &:hover {
            color: #fff;
          }
        }

        .active {
          color: #fff;
        }
      }
    }

    .right {
      position: relative;
      flex-wrap: wrap;
    }

    .tabs {
      display: none;
      position: relative;
      width: 100vw;
      text-align: center;


      ul {
        position: fixed;
        top: 110px;
        left: 0;
        width: 100%;
        overflow-x: auto;
        overflow-y: hidden;
        height: 40px;
        background-color: #1a1a1a;
        z-index: 10;
        color: rgba(255, 255, 255, 0.4);
        font-size: 14px;
        cursor: pointer;
        box-sizing: border-box;
        white-space: nowrap;

        &:active {
          background-color: #1a1a1a;
        }

        .active {
          color: #fff;
        }

        li {
          display: inline-block;
          margin: 0 15px;
          height: 40px;
          line-height: 40px;
          text-align: center;
        }
      }
    }
  }



  @media only screen and (max-width: 992px) {
    .left {
      display: none;
    }

    .right {
      @include small-right();

      .tabs {
        display: block;
      }
    }
  }

  /* 大型设备（笔记本电脑/台式机，992 像素及以上） */
  @media only screen and (min-width: 992px) {
    .left {
      display: block;
    }

    .right {
      @include big-right();

      .tabs {
        display: none;
      }
    }
  }
}
</style>
