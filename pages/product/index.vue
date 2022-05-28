<template>
  <div class="product-container">
    <div class="box">
      <div class="left">
        <ul v-if="currentCategoryList.length > 0">
          <li v-for="(item, index) in currentCategoryList" :key="item.id" @click="handleSideItem(item, index)" :style="{
            color:
              currentSelected === index ? `#fff` : `rgba(255, 255, 255, 0.4)`,
          }">
            {{ item.name }}
          </li>
        </ul>
        <Empty v-if="currentCategoryList.length === 0" title="暂无数据"></Empty>
      </div>
      <div class="right flex flex-wrap">
        <div v-for="(item, index) in productList" :key="index" :index="index % 4"
          @mouseenter="onMouseenter(item, index)" @mouseleave="onMouseleave(item, index)" @click="handleItem(item)"
          class="item flex items-center justify-center" :style="{
            marginLeft: index % 2 !== 0 ? `5px` : `0`,
            marginBottom: `5px`,
            marginTop: index % 4 === 3 ? '-50px' : '0px'
          }">
          <img class="shade-img" :src="item.src">
          <transition name="fade">
            <img :src="item.src" v-if="item.state" :class="{ 'fade-img': item.state }" />
          </transition>
          <span>{{ item.name }}</span>
        </div>
        <Empty v-if="productList.length === 0" title="暂无数据"></Empty>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { BASE_URL } from "../../config/default";
import { useRouter } from "vue-router";
import { IProduct } from "~~/api/typing";

const currentSelected = ref(0);
const { currentRoute, push } = useRouter();
const currentCategoryList = ref([]);
const productList = ref<IProduct[]>([])


const handleSideItem = (item: unknown, index: number) => {
  currentSelected.value = index!;
};

const onMouseenter = (item, index) => {
  const data = productList.value;
  data[index].state = true;
};

const onMouseleave = (item, index) => {
  const data = productList.value;
  data[index].state = false;
};

const handleItem = (item: { id: number }) => {
  push(`/product/detail?id=${item.id}`);
};

const [{ data: list }, { data: categoryList }] = await Promise.all([
  useFetch(BASE_URL + `/product/getList?type=product`, {
    transform(input: any) {
      if (input?.data?.list) {
        return input?.data?.list.map(e => {
          e.state = false
          return e
        })
      }
      return []
    },
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
  }),
]);

watchEffect(() => {
  // console.log(currentRoute.value.query?.type, categoryList.value);
  const type = currentRoute.value.query?.type;
  if (type && Number(type)) {
    const categoryItem = categoryList.value.find((e) => e.id === Number(type));
    currentCategoryList.value = categoryItem.children;
  } else {
    let arr = [];
    categoryList?.value.map((e) => {
      if (!!e.children) {
        for (const child of e.children) {
          arr.push(child);
        }
      }
    });
    currentCategoryList.value = arr;
  }

  // 产品列表
  let id = currentCategoryList.value[currentSelected.value]?.id
  productList.value = id && list.value.filter(e => e.category === Number(type) && e.texture === id) || []

  // 修改网页标题
  useHead({
    titleTemplate: `宏润兴${currentCategoryList.value[currentSelected.value]?.name || "产品中心"
      }`,
  });
});
</script>

<style scoped lang="scss">
.product-container {
  width: 100vw;
  min-height: calc(100vh - 110px);
  overflow-x: hidden;

  @mixin item {
    position: relative;
    background-color: #6b6b6b;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: 0 50%;
    color: #fff;
    font-size: 18px;
    cursor: pointer;
    box-sizing: border-box;
    overflow: hidden;

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

    .item {
      @include item();

      &[index="0"] {
        height: calc(50vh - 5px);
        width: 40vw;
      }

      &[index="1"] {
        height: calc(50vh - 55px);
        width: calc(60vw - 5px);
      }

      &[index="2"] {
        height: calc(50vh - 50px);
        width: 40vw;
      }

      &[index="3"] {
        height: calc(50vh);
        width: calc(60vw - 5px);
      }
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
    height: 100%;
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
        }
      }
    }
  }

  .right {
    position: relative;
  }

  @media only screen and (max-width: 992px) {
    .left {
      display: none;
    }

    .right {
      @include small-right();
    }
  }

  /* 大型设备（笔记本电脑/台式机，992 像素及以上） */
  @media only screen and (min-width: 992px) {
    .left {
      display: block;
    }

    .right {
      @include big-right();
    }
  }
}
</style>
