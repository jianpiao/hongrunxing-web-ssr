<template>
  <div class="job">
    <SectionHeader :name="pageName" theme="light"></SectionHeader>
     <Empty v-if="pending"></Empty>
    <div class="content" v-else>
      <span v-html="job.content"></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import report from "~~/composable/use-report";
import { BASE_URL } from "~~/config/default";

interface IJob {
  id: number;
  content: string;
}

const pageName = ref("招贤纳士");

const { pending, data: job } = await useFetch(`${BASE_URL}/job/get`, {
  transform(data: { data: IJob }): IJob {
    if (data?.data) {
      return data?.data
    }
    return {
      id: 0,
      content: ""
    }
  },
  key: "job"
})

onMounted(() => {
  window.scrollTo(0, 0)
  report("job")
})

useHead({
  titleTemplate: "宏润兴" + pageName.value,
});
</script>

<style lang="scss" scoped>
.job {
  width: 100vw;
  min-height: calc(100vh - 110px);

  .content {
    padding: 0 0 20px 0;
    width: 1200px;
    margin: 0 auto;
    line-height: 28px;
    font-size: 14px;
    color: #fff;

    // ::v-deep(img) {
    //   width: 100%;
    // }
  }

  @media only screen and (max-width: 1240px) {
    .content {
      width: calc(100vw - 40px);
      margin: 0 20px;
    }
  }
}
</style>
