<template>
  <div class="about">
    <SectionHeader :name="pageName" theme="light"></SectionHeader>
    <Empty v-if="pending"></Empty>
    <div class="content" v-else>
      <div v-html="content"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import report from "~~/composable/use-report";
import { BASE_URL } from "~~/config/default";

interface IAbout {
  id: number;
  name: string;
  desc:string;
  culture:string;
}

const content = ref("");
const pageName = ref("企业简介");
const { currentRoute } = useRouter();

const { pending, data: company } =await useFetch(`${BASE_URL}/company_info/get`, {
  transform(data: { data: IAbout }):IAbout {
    if (data?.data) {
      return data?.data
    }
    return {
      id:0,
      name:"",
      desc:"",
      culture:""
    }
  },
  key:"about"
})

watchEffect(() => {
  const name = currentRoute.value.query?.name;
  pageName.value = name?.toString() || "企业简介";
    content.value =
      pageName.value === "企业文化" ? company.value.culture : company.value.desc;
});

onMounted(() => {
  window.scrollTo(0, 0)
  report("about")
})

useHead({
  titleTemplate: `宏润兴-${pageName.value}`,
});
</script>

<style lang="scss" scoped>
.about {
  width: 100vw;
  min-height: calc(100vh - 110px);

  .content {
    padding: 20px 0;
    width: 992px;
    margin: 0 auto;
    line-height: 28px;
    font-size: 14px;
    color: #fff;
  }

  @media only screen and (max-width: 992px) {
    .content {
      width: 100%;
      padding: 20px 40px;
    }
  }
}
</style>
