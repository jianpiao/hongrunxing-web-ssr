<template>
  <div class="product-container">
    <div class="box">
      <div class="left">
        <ul>
          <li
            v-for="(item, index) in currentCategoryList"
            :key="item.id"
            @click="handleSideItem(item, index)"
            :style="{
              color:
                currentSelected === index ? `#fff` : `rgba(255, 255, 255, 0.4)`,
            }"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
      <div class="right flex flex-wrap">
        <div
          v-for="(item, index) in temp"
          :key="index"
          :index="index"
          class="item"
        >
          <div
            v-for="(row, rowIndex) in item.data"
            :key="row.id"
            :row="`${index}-${rowIndex}`"
            @mouseenter="onMouseenter(index, rowIndex, row)"
            @mouseleave="onMouseleave(index, rowIndex, row)"
            @click="handleItem(row)"
            class="row flex items-center justify-center"
            :style="{
              marginLeft: index % 2 !== 0 ? `5px` : `0`,
              marginBottom: `5px`,
              backgroundImage: `url(${
                row.state ? row.images[0] : row.images[1]
              })`,
            }"
          >
            <span>{{ row.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { BASE_URL } from "../../config/default";
import { useRouter } from "vue-router";

interface IList {
  data: {
    list: Array<{ name: string; src: string; id: number; images: string[] }>;
  };
}
const currentSelected = ref(0);
const { currentRoute, push } = useRouter();
const currentCategoryList = ref([]);

const temp = ref([
  {
    data: [
      {
        id: 1,
        name: "名字",
        state: false,
        images: [
          "http://www.hongrunxingcarpet.com/public/uploadFiles/upload_1650261865692.0.1827529631627891.0.jpg",
          "http://www.hongrunxingcarpet.com/public/uploadFiles/upload_1650331309274.0.11152329651838921.0.jpg",
        ],
        src: "http://www.hongrunxingcarpet.com/public/uploadFiles/upload_1650261865692.0.1827529631627891.0.jpg",
      },
      {
        id: 2,
        name: "名字",
        state: false,
        src: "http://www.hongrunxingcarpet.com/public/uploadFiles/upload_1650331309274.0.11152329651838921.0.jpg",
        images: [
          "http://www.hongrunxingcarpet.com/public/uploadFiles/upload_1650331309274.0.11152329651838921.0.jpg",
          "http://www.hongrunxingcarpet.com/public/uploadFiles/upload_1650261865692.0.1827529631627891.0.jpg",
        ],
      },
    ],
  },
  {
    data: [
      {
        id: 3,
        name: "名字",
        state: false,
        src: "http://www.hongrunxingcarpet.com/public/uploadFiles/upload_1650331309274.0.11152329651838921.0.jpg",
        images: [
          "http://www.hongrunxingcarpet.com/public/uploadFiles/upload_1650331309274.0.11152329651838921.0.jpg",
          "http://www.hongrunxingcarpet.com/public/uploadFiles/upload_1650261865692.0.1827529631627891.0.jpg",
        ],
      },
      {
        id: 4,
        name: "名字",
        state: false,
        src: "http://www.hongrunxingcarpet.com/public/uploadFiles/upload_1650261865692.0.1827529631627891.0.jpg",
        images: [
          "http://www.hongrunxingcarpet.com/public/uploadFiles/upload_1650261865692.0.1827529631627891.0.jpg",
          "http://www.hongrunxingcarpet.com/public/uploadFiles/upload_1650331309274.0.11152329651838921.0.jpg",
        ],
      },
    ],
  },
]);

const handleSideItem = (item: unknown, index: number) => {
  console.log(item);
  currentSelected.value = index!;
};

const onMouseenter = (index, rowIndex, row) => {
  const data = temp.value;
  data[index].data[rowIndex].state = !row.state;
};

const onMouseleave = (index, rowIndex, row) => {
  const data = temp.value;
  data[index].data[rowIndex].state = !row.state;
};

const handleItem = (item: { id: number }) => {
  push(`/product/detail?id=${item.id}`);
};

const [{ data: list }, { data: categoryList }] = await Promise.all([
  useFetch(BASE_URL + "/product/getList?type=product", {
    transform(input: any) {
      return input?.data?.list;
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
console.log(list.value, categoryList.value);

watchEffect(() => {
  console.log(currentRoute.value.query?.type, categoryList.value);
  const type = currentRoute.value.query?.type;
  if (!!type) {
    const categoryItem = categoryList.value.find((e) => e.id === Number(type));
    currentCategoryList.value = categoryItem.children;
  } else {
    let arr = [];
    categoryList.value.map((e) => {
      if (!!e.children) {
        for (const child of e.children) {
          arr.push(child);
        }
      }
    });
    currentCategoryList.value = arr;
  }
  console.log("当前的数据：", currentCategoryList.value);

  // 修改网页标题
  useHead({
    titleTemplate: `宏润兴${
      currentCategoryList.value[currentSelected.value].name || "产品中心"
    }`,
  });
});
</script>

<style scoped lang="scss">
.product-container {
  width: 100vw;
  min-height: calc(100vh - 110px);
  overflow-x: hidden;

  @mixin row {
    background-color: #6b6b6b;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    color: #fff;
    font-size: 18px;
    cursor: pointer;
    box-sizing: border-box;
  }

  @mixin small-right {
    width: 100%;

    .item {
      &[index="0"] {
        width: 40vw;
      }
      &[index="1"] {
        width: calc(60vw - 5px);
      }

      .row {
        @include row();
      }

      .row[row="0-0"] {
        height: calc(50vh - 55px + 50px);
        width: 40vw;
      }
      .row[row="0-1"] {
        height: calc(50vh - 55px - 50px);
        width: 40vw;
      }
      .row[row="1-0"] {
        height: calc(50vh - 55px);
        width: calc(60vw - 5px);
      }
      .row[row="1-1"] {
        height: calc(50vh - 55px);
        width: calc(60vw - 5px);
      }
    }
  }

  @mixin big-right {
    width: calc(100% - 250px);

    .item {
      box-sizing: border-box;
      &[index="0"] {
        width: calc(40vw - 125px);
      }
      &[index="1"] {
        width: calc(60vw - 5px - 125px);
      }

      .row {
        @include row();
      }

      .row[row="0-0"] {
        height: calc(50vh - 55px + 50px);
        width: calc(40vw - 125px);
      }
      .row[row="0-1"] {
        height: calc(50vh - 55px - 50px);
        width: calc(40vw - 125px);
      }
      .row[row="1-0"] {
        height: calc(50vh - 55px);
        width: calc(60vw - 5px - 125px);
      }
      .row[row="1-1"] {
        height: calc(50vh - 55px);
        width: calc(60vw - 5px - 125px);
      }
    }
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

  // /* 超小设备 (手机, 600px 以下屏幕设备) */
  // @media only screen and (max-width: 600px) {
  // }

  // /* 小设备 (平板电脑和大型手机，600 像素及以上) */
  // @media only screen and (min-width: 600px) {
  // }

  // /* 中型设备（平板电脑，768 像素及以上） */
  // @media only screen and (min-width: 768px) {
  // }

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

  // /* 超大型设备（大型笔记本电脑和台式机，1200 像素及以上） */
  // @media only screen and (min-width: 1200px) {
  // }
}
</style>
