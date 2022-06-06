<template>
  <div class="about">
    <Empty v-if="pending"></Empty>
    <SectionHeader :name="pageName" theme="light"></SectionHeader>
    <div class="content">
      <div v-html="content"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { BASE_URL } from "~~/config/default";

interface IAbout {
  id: number;
  name: string;
  desc:string;
}

const companyCulture = ref(
  `<img src="https://dt.ceshiyuming.com.cn/static/upload/image/20220217/1645064668209346.png" />`
);
const companyInfo = ref(`<p>
          桂林市宏润兴地毯制造有限公司是一家有28年生产定制地毯的专业型生产企业。公司集生产、设计、销售服务为一体的综合性生产工厂。公司产品繁多。主要产品有手工羊毛地毯，手工腈纶地毯，尼龙印花地毯等。材质颜色、尺寸不限，量身定制。
          公司本着“专业品质，精艺求精”为宗旨，以：“以人为本，诚实守望信”为经营理念。以为服务客户，客户满意为目标。
          <br />
          产品以品质好，服务好得到众多的商家合作伙伴一直以来的大力支持，形成
          了一个良好的销售环境。
          公司成立至今，一直为客户需求为导向，不断提升自身实力及水平，不断提高服务水平及产品质量。我们充分发挥团队精神，追求永续经营。公司将为客户提供更满意的产品及服务面努力。
        </p>`);
const content = ref("");
const pageName = ref("企业简介");
const { currentRoute } = useRouter();

const { pending, data: company } =await useFetch(`${BASE_URL}/company_info/get`, {
  transform(data: { data: IAbout }):IAbout {
    if (data?.data) {
      console.log(data)
      return data?.data
    }
    return {
      id:0,
      name:"",
      desc:""
    }
  },
  key:"about"
})

watchEffect(() => {
  const name = currentRoute.value.query?.name;
  content.value = companyInfo.value;
  if (!!name) {
    pageName.value = name.toString();
    content.value =
      pageName.value === "企业文化" ? companyCulture.value : company.value.desc;
  }
});

useHead({
  titleTemplate: `宏润兴${pageName.value}`,
});
</script>

<style lang="scss" scoped>
.about {
  width: 100vw;
  min-height: calc(100vh - 110px);
  background-color: #333;

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
