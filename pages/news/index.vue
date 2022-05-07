<template>
  <div class="news">
    <SectionHeader :name="pageName"></SectionHeader>
    <div class="box">
      <div class="right">
        <div
          v-for="(item, index) in list"
          :key="index"
          class="item flex"
          @click="handleDetail(item)"
        >
          <div class="img">
            <img
              style="width: 150px; height: 150px"
              :src="item.url"
              fit="fill"
            />
          </div>
          <div class="article">
            <p>{{ item.title }}</p>
            <p>{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "#app";

interface Tree {
  label: string;
  children?: Tree[];
}

interface INews {
  id: number;
  time?: string;
  title: string;
  desc: string;
  url: string;
}

const router = useRouter();
const pageName = ref("行业信息");

const data: Tree[] = [
  {
    label: "最新推荐",
    children: [
      {
        label: "冬奥会顺利举办",
      },
    ],
  },
  {
    label: "行业动态",
    children: [
      {
        label: "地毯市场前景",
      },
    ],
  },
  {
    label: "公司新闻",
    children: [
      {
        label: "空",
      },
    ],
  },
  {
    label: "行业新闻",
    children: [
      {
        label: "空",
      },
    ],
  },
  {
    label: "行业动态",
    children: [
      {
        label: "空",
      },
    ],
  },
];

const defaultProps = {
  children: "children",
  label: "label",
};

const list: INews[] = [
  {
    id: 1,
    url: "http://aimg8.dlszywz.com/ev_user_doc_content/800_1500/1245926/1047/2093349_1.jpg?x-oss-process=image/resize,m_lfit,w_150,h_150,limit_0",
    title: "广州首届创新驱动发展战略咨询会举行",
    desc: "在咨询会上为广州实现创新驱动建言献策。加快顶层设计,构建富有活力的科技体制创新机制,尽快出台中国广州市委市政府关于创新驱动发展的决定,切入未来在咨询会上为广州实现创新驱动建言献策。加快顶层设计,构建富有活力的科技体制创新机制,尽快出台中国广州市委市政府关于创新驱动发展的决定,切入未来",
  },
  {
    id: 2,
    url: "http://aimg8.dlszywz.com/ev_user_doc_content/800_1500/1245926/1047/2093348_1.jpg?x-oss-process=image/resize,m_lfit,w_150,h_150,limit_0",
    title: "十三五”新农村建设科技发展战略研究咨询座谈会在北京召开",
    desc: "科技发展战略研究工作,加强村镇建设领域“十三五”规划的顶层设计,科技部农村司、农村*于3月18日在京联合组织召开了“十三五”新农村建设科技发展战略研究咨询座谈科技发展战略研究工作,加强村镇建设领域“十三五”规划的顶层设计,科技部农村司、农村*于3月18日在京联合组织召开了“十三五”",
  },
  {
    id: 3,
    url: "http://aimg8.dlszywz.com/ev_user_doc_content/800_1500/1245926/1047/2093344_1.jpg?x-oss-process=image/resize,m_lfit,w_150,h_150,limit_0",
    title: "广告商竟然跑到服务窗口坐班收费",
    desc: "坐在行政服务*审批窗口“热情”服务的,居然是广告公司为开展经营业务派驻的业务员。昨日,利川市对造成这一怪现象的相关责任坐在行政服务*审批窗口“热情”服务的,居然是广告公司为开展经营业务派驻的业务员。昨日,利川市对造成这一怪现象的相关责任",
  },
  {
    id: 4,
    url: "http://aimg8.dlszywz.com/ev_user_doc_content/800_1500/1245926/1047/2093343_1.jpg?x-oss-process=image/resize,m_lfit,w_150,h_150,limit_0",
    title: "提升质量职教服务经济社会发展",
    desc: "4月13日上午,在信阳航空服务*的操场上,一架白色固定翼无人机在空中盘旋,十多名准备报考该校无人机专业的学生,在教练的指导下提前感受了操控飞机的乐趣。 该校4月13日上午,在信阳航空服务*的操场上,一架白色固定翼无人机在空中盘旋,十多名准备报考该校无人机专业的学生,在教练的指导下提前感受了操",
  },
  {
    id: 5,
    url: "http://aimg8.dlszywz.com/ev_user_doc_content/800_1500/1245926/1047/2093340_1.jpg?x-oss-process=image/resize,m_lfit,w_150,h_150,limit_0",
    title: "细解消费品行业战略咨询之品牌营销",
    desc: "北京咨询公司细解消费品行业战略咨询之品牌营销未来消费品行业中的企业若追求市场影响力和客户忠诚度,就势必要在品牌整合.北京咨询公司细解消费品行业战略咨询之品牌营销未来消费品行业中的企业若追求市场影响力和客户忠诚度,就势必要在品牌整合.",
  },
  {
    id: 6,
    url: "http://aimg8.dlszywz.com/ev_user_doc_content/800_1500/1020/2038469_1245926_1.jpg?x-oss-process=image/resize,m_lfit,w_150,h_150,limit_0",
    title:
      "法国OC&C战略咨询公司合伙人费萨尔说,卡尼尔撤出中国是正常的商业策略调整。",
    desc: "科技发展战略研究工作,加强村镇建设领域“十三五”规划的顶层设计,科技部农村司、农村*于3月18日在京联合组织召开了“十三五”新农村建设科技发展战略研究咨询座谈科技发展战略研究工作,加强村镇建设领域“十三五”规划的顶层设计,科技部农村司、农村*于3月18日在京联合组织召开了“十三五”...",
  },
];

const handleDetail = (item: INews) => {
  console.log(item);
  router.push(`/news/detail?id=${item.id}`);
};

useHead({
  titleTemplate: `宏润兴${pageName.value}`,
});
</script>

<style lang="scss" scoped>
.news {
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
    display: flex;
    margin: 0 0 20px 0;
    .right {
      padding: 0 10px;
      border: 1px solid #eee;
      overflow: hidden;
      .item {
        padding: 20px 0;
        border-bottom: 1px solid #f6f6f6;
        animation: intoFromRight 1s;
        cursor: pointer;

        &:last-child {
          border-bottom: none;
        }
        .img {
          width: 150px;
          height: 150px;
        }
        .article {
          flex: 1;
          height: 150px;
          margin-left: 20px;
          p {
            &:nth-child(1) {
              color: #333;
              margin-bottom: 15px;
              &:hover {
                text-decoration: underline;
              }
            }
            &:nth-child(2) {
              line-height: 28px;
              font-size: 14px;
              color: #777;
              display: -webkit-box;
              -webkit-line-clamp: 3;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }
          }
        }
      }
    }
  }

  @keyframes intoFromLeft {
    0% {
      transform: translateX(-200px);
      opacity: 0;
    }
    100% {
      transform: translateX(0px);
      opacity: 1;
    }
  }
  @keyframes intoFromRight {
    0% {
      transform: translateY(600px);
      opacity: 0;
    }
    100% {
      transform: translateY(0px);
      opacity: 1;
    }
  }
}
</style>
