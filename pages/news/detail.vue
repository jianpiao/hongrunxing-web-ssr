<template>
  <div class="news-detail">
    <Empty v-if="pending"></Empty>
    <div class="box" v-else>
      <div class="title">{{ detail.title }}</div>
      <div class="time flex">
        <span>时间：{{ detail.create_time }}</span>
        <span>{{ detail.category_name }}</span>
      </div>
      <div class="con" v-html="detail.content"></div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { watch } from "vue"
import { BASE_URL } from "~~/config/default";

interface INews {
  id: number;
  title: string;
  content: string;
  create_time?: string;
  author: string;
  category_name: string;
  src: string;
}

const routes = useRoute();
const pageName = ref("行业信息");

const { pending, data: detail } = useLazyFetch(`${BASE_URL}/news/get_by_id?id=${routes.query.id}`, {
  transform(data: { data: INews }): INews {
    if (data?.data) {
      return data?.data
    }
    return {
      id: 0,
      title: '',
      content: '',
      create_time: '',
      author: '',
      category_name: '',
      src: '',
    }
  }
})

watch(detail.value, () => {
  pending.value = false
  useHead({
    titleTemplate: `宏润兴-${detail?.value?.title || pageName.value}`,
  });
})


useHead({
  titleTemplate: `宏润兴-${pageName.value}`,
});
</script>

<style lang="scss" scoped>
.news-detail {
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;

  .flex {
    display: flex;
    align-items: center;
  }

  justify-content: center;

  .box {
    width: 1200px;
    margin: 0 0 20px 0;
    position: relative;

    .title {
      text-align: center;
      font-size: 18px;
      font-weight: bold;
      color: #222;
      line-height: 40px;
    }

    .time {
      height: 50px;
      line-height: 50px;
      justify-content: space-between;
      font-size: 13px;
      color: #999;
      border-bottom: 1px solid #f1f1f1;
    }

    .con {
      color: #666;
      font-size: 16px;
      line-height: 1.5rem;
      padding: 20px 0;
    }
  }
}
</style>
