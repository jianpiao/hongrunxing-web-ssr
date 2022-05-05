<script setup lang="ts">
import { useRouter } from "#app";
import { ref, onMounted } from "vue";

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

const handleLogo = () => {
  router.push("/");
};

const handleMenu = (item: IMenu) => {
  router.push(`${item.to}`);
};

</script>

<template>
  <header>
    <div class="content">
      <div class="logo" @click="handleLogo">
        <img style="width: 213px; height: 53px" src="https://s4.ax1x.com/2022/03/04/bUPKWn.png" />
      </div>
      <ul>
        <li v-for="(item, index) in menu" :key="index" @click="handleMenu(item)">
          {{ item.name }}
          <div></div>
        </li>
      </ul>
      <div class="search"></div>
    </div>
  </header>
</template>
<style scoped lang="scss">
header {
  width: 100vw;
  height: 110px;
  background-color: rgb(151, 6, 12);
}

.flex {
  display: flex;
  align-items: center;
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
      display: flex;
      align-items: flex-end;
      height: 70px;
      margin: 0 10px;
      color: #fff;
      font-size: 16px;
      cursor: pointer;
      padding: 0 20px 23px 0;

      div {
        width: 1px;
        height: 16px;
        background-color: #fff;
        margin-left: 20px;
      }
    }
  }

  /* 搜索 */
  .search {
    width: 120px;
  }
}
</style>
