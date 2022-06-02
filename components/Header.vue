<template>
  <header>
    <div class="content">
      <div class="logo" @click="handleLogo">
        <img style="width: 213px; height: 53px" src="https://s4.ax1x.com/2022/03/04/bUPKWn.png" />
      </div>
      <ul class="menus">
        <li v-for="(item, index) in menu" :key="index" @click="handleMenu(item)" @mouseenter="onMouseenter(index)"
          @mouseleave="showTabs = false">
          <div class="name">{{ item.name }}</div>
          <div class="border" v-show="current === index"></div>
        </li>
      </ul>
      <div class="search">
        <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg
          class="icon" width="64px" height="64.00px" viewBox="0 0 1024 1024" version="1.1"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M170.666667 213.333333h682.666666v85.333334H170.666667V213.333333z m0 512h682.666666v85.333334H170.666667v-85.333334z m0-256h682.666666v85.333334H170.666667v-85.333334z"
            fill="#ffffff" />
        </svg>
      </div>
    </div>
    <div class="tabs" v-show="showTabs" @mouseenter="showTabs = true" @mouseleave="showTabs = false">
      <ul class="flex">
        <li v-for="(item, index) in tabs" :key="index" @click="handleTba(item, index)">
          {{ item.name }}
        </li>
      </ul>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRouter } from "#app";
import { ref, onMounted } from "vue";
import { BASE_URL } from "../config/default";

interface IMenu {
  to: string;
  name: string;
}

const router = useRouter();
const menu: Array<IMenu> = [
  {
    to: "/product",
    name: "产品",
  },
  {
    to: "/news",
    name: "信息中心",
  },
  {
    to: "/about",
    name: "关于宏润兴",
  },
  {
    to: "/jobs",
    name: "招贤纳士",
  },
];
const current = ref(0);
const tabs = ref([]);
const showTabs = ref(false);
const productList = ref([]);
const infoList = ref([{ name: "行业信息" }]);
const companyList = ref([{ name: "企业文化" }, { name: "企业简介" }]);
const jobList = ref([{ name: "招聘" }]);

const handleLogo = () => {
  current.value = null;
  router.push("/");
};

const handleMenu = (item: IMenu) => {
  router.push(`${item.to}?currentTab=${current.value}`);
};

const onMouseenter = (index: number) => {
  current.value = index;
  switch (index) {
    case 0:
      tabs.value = productList.value;
      break;
    case 1:
      tabs.value = infoList.value;
      break;
    case 2:
      tabs.value = companyList.value;
      break;
    case 3:
      tabs.value = jobList.value;
      break;
  }
  showTabs.value = true;
};

const { data } = await useFetch(
  BASE_URL + "/product/getCategoryList?type=product",
  {
    transform(input: any) {
      return input?.data;
    },
    key: "getCategoryList"
  },
);
productList.value = data.value;
tabs.value = data.value;

const handleTba = (item: any, index: number) => {
  switch (current.value) {
    case 0:
      router.push(`/product?currentTab=${current.value}&type=${item.id}`);
      break;
    case 1:
      router.push(`/news?currentTab=${current.value}`);
      break;
    case 2:
      router.push(`/about?currentTab=${current.value}&name=${item.name}`);
      break;
    case 3:
      router.push(`/jobs?currentTab=${current.value}&name=${item.name}`);
      break;
  }
};

const getCate = async () => {
  const { data } = await useFetch(
    BASE_URL + "/product/getCategoryList?type=product",
    {
      transform(input: any) {
        return input?.data;
      },
      key: "getCategoryList1"
    },
  )
  productList.value = data.value;
}

// 挂载是在客户端执行的，所以这里是不会在服务器端执行
onMounted(() => {
  const curTab = router.currentRoute.value.query?.currentTab;
  if (!!curTab) {
    current.value = Number(curTab);
  }
  if (!productList.value || productList.value.length === 0) {
    getCate();
    if (current.value === 0) {
      tabs.value = productList.value;
    }
  }
});
</script>

<style scoped lang="scss">
header {
  width: 100vw;
  height: 110px;
  background-color: rgb(151, 6, 12);
  position: fixed;
  z-index: 100;

  .flex {
    display: flex;
    align-items: center;
  }

  &:hover .border {
    display: block
  }

  .border {
    position: absolute;
    bottom: 0;
    left: calc(50% - 25px);
    height: 3px;
    width: 50px;
    background-color: #fff;
    display: none;
  }

  .content {
    max-width: 1200px;
    height: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin: 0 auto;

    .logo {
      width: 213px;
      height: 53px;
      cursor: pointer;
      margin-bottom: 12px;
    }

    ul {
      @extend .flex;

      li {
        position: relative;
        display: flex;
        align-items: flex-end;
        height: 70px;
        color: #fff;
        font-size: 16px;
        cursor: pointer;
        padding: 0 0 23px 0;

        .name {
          border-right: 1px solid #fff;
          padding: 0 30px;
        }


      }
    }

    /* 搜索 */
    .search {
      width: 120px;
      height: 100%;
      display: flex;
      align-items: flex-end;
      justify-content: flex-start;
      padding-bottom: 32px;

      svg {
        width: 22px;
        height: 22px;
        color: #fff;
      }
    }

    @media only screen and (max-width: 992px) {
      .menus {
        display: none;
      }

      .search {
        width: 60px;

        svg {
          display: block;
        }
      }
    }

    /* 大型设备（笔记本电脑/台式机，992 像素及以上） */
    @media only screen and (min-width: 992px) {
      .menus {
        display: flex;
        align-items: center;
      }

      .search {
        svg {
          display: none;
        }
      }
    }
  }

  .tabs {
    position: absolute;
    bottom: -80px;
    left: 0;
    height: 80px;
    width: 100vw;
    background-color: rgba(151, 6, 12, 0.6);
    z-index: 1000;

    ul {
      height: 100%;
      max-width: 1280px;
      margin: 0 auto;
      justify-content: space-evenly;
      list-style: none;

      li {
        font-size: 14px;
        color: #fff;
        cursor: pointer;

        &:hover {
          color: rgb(36, 169, 236);
        }
      }
    }
  }
}
</style>
