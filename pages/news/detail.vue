<template>
  <div class="news-detail">
    <div class="box">
      <div class="right">
        <div class="title">{{ mock.title }}</div>
        <div class="time flex">
          <span>时间：{{ mock.time }}</span>
          <span>{{ mock.type }}</span>
        </div>
        <div class="con" v-html="mock.desc"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Tree {
  label: string;
  children?: Tree[];
}

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
});

const mock = {
  id: 1,
  type: "最新推荐",
  time: "2021-12-17 12:34:01",
  url: "http://aimg8.dlszywz.com/ev_user_doc_content/800_1500/1245926/1047/2093349_1.jpg?x-oss-process=image/resize,m_lfit,w_150,h_150,limit_0",
  title: "十三五”新农村建设科技发展战略研究咨询座谈会在北京召开",
  desc: `<p>
	<br class="Apple-interchange-newline" />
<span style="color:#666666;font-family:Arial, 微软雅黑, 宋体;font-size:16px;background-color:#FFFFFF;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 企业文化，或称组织文化（Corporate Culture或Organizational Culture），是一个组织由其价值观、信念、仪式、符号、处事方式等组成的其特有的文化形象。职工文化，也称企业职员文化，是与企业文化相对应的文化形态，职工文化以职工为本，是一种素质文化，企业文化以企业为本，是一种管理文化。</span><br />
<span style="color:#666666;font-family:Arial, 微软雅黑, 宋体;font-size:16px;background-color:#FFFFFF;">?</span><br />
<span style="color:#666666;font-family:Arial, 微软雅黑, 宋体;font-size:16px;background-color:#FFFFFF;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 企业文化是在一定的条件下，企业生产经营和管理活动中所创造的具有该企业特色的精神财富和物质形态。它包括文化观念、价值观念、企业精神、道德规范、行为准则、历史传统、企业制度、文化环境、企业产品等。其中价值观是企业文化的核心。</span><br />
<br />
<span style="color:#666666;font-family:Arial, 微软雅黑, 宋体;font-size:16px;background-color:#FFFFFF;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 企业文化是企业的灵魂，是推动企业发展的不竭动力。它包含着非常丰富的内容，其核心是企业的精神和价值观。这里的价值观不是泛指企业管理中的各种文化现象，而是企业或企业中的员工在从事经营活动中所秉持的价值观念。</span><br />
<br />
<span style="color:#666666;font-family:Arial, 微软雅黑, 宋体;font-size:16px;background-color:#FFFFFF;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 企业环境是指企业的性质、企业的经营方向、外部环境、企业的社会形象、与外界的联系等方面。它往往决定企业的行为。价值观是指企业内成员对某个事件或某种行为好与坏、善与恶、正确与错误、是否值得仿效的一致认识。价值观是企业文化的核心，统一的价值观使企业内成员在判断自己行为时具有统一的标准，并以此来决定自己的行为。</span><br />
<br />
<span style="color:#666666;font-family:Arial, 微软雅黑, 宋体;font-size:16px;background-color:#FFFFFF;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 英雄人物是指企业文化的核心人物或企业文化的人格化，其作用在于作为一种活的样板，给企业中其他员工提供可供学习的榜样，对企业文化的形成和强化起着极为重要的作用。文化仪式是指企业内的各种表彰、奖励活动、聚会以及文娱活动等，它可以把企业中发生的某些事情戏剧化和形象化，来生动地宣传和体现本企业的价值观，使人们通过这些生动活泼的活动来领会企业文化的内涵，使企业文化“寓教于乐”之中。</span><br />
<br />
<span style="color:#666666;font-family:Arial, 微软雅黑, 宋体;font-size:16px;background-color:#FFFFFF;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 文化网络是指非正式的信息传递渠道，主要是传播文化信息。它是由某种非正式的组织和人群所组成，它所传递出的信息往往能反映出职工的愿望和心态。企业文化本质，是通过企业制度的严格执行衍生而成，制度上的强制或激励最终促使群体产生某一行为自觉，这一群体的行为自觉便组成了企业文化。企业文化的本质在东堂策《企业文化一字解》中得到深刻印证，其中也详细道出企业文化产生机理。</span><br />
<br />
<span style="color:#666666;font-family:Arial, 微软雅黑, 宋体;font-size:16px;background-color:#FFFFFF;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 产生企业*者把“文化变化人”的功能应用于企业，以解决现代企业管理中的问题，就有了企业文化。企业管理理论和企业文化管理理论都追求效益。但前者为追求效益而把人当作客体，后者为追求效益把文化概念自觉应用于企业，把具有丰富创造性的人作为管理理论的*。这种指导思想反映到企业管理中去，就有了人们称之为企业文化的种种观念。认识从企业文化的现实出发，进行深入的调查研究，把握企业文化各种现象之间的本质联系。依据实践经验，从感性认识到理性认识，进行科学的概括、总结。</span><br />
<br />
<span style="color:#666666;font-family:Arial, 微软雅黑, 宋体;font-size:16px;background-color:#FFFFFF;">一．企业文化能激发员工的使命感。不管是什么企业都有它的责任和使命，企业使命感是全体员工工作的目标和方向，是企业不断发展或前进的动力之源。</span><br />
<br />
<span style="color:#666666;font-family:Arial, 微软雅黑, 宋体;font-size:16px;background-color:#FFFFFF;">二．企业文化能凝聚员工的归属感。企业文化的作用就是通过企业价值观的提炼和传播，让一群来自不同地方的人共同追求同一个梦想。</span><br />
<br />
<span style="color:#666666;font-family:Arial, 微软雅黑, 宋体;font-size:16px;background-color:#FFFFFF;">三．企业文化能加强员工的责任感。企业要通过大量的资料和文件宣传员工责任感的重要性，管理人员要给全体员工灌输责任意识，危机意识和团队意识，要让大家清楚地认识企业是全体员工共同的企业。</span><br />
<br />
<span style="color:#666666;font-family:Arial, 微软雅黑, 宋体;font-size:16px;background-color:#FFFFFF;">四．企业文化能赋予员工的荣誉感。每个人都要在自己的工作岗位，工作领域，多做贡献，多出成绩，多追求荣誉感。</span><br />
<br />
<span style="color:#666666;font-family:Arial, 微软雅黑, 宋体;font-size:16px;background-color:#FFFFFF;">五．企业文化能实现员工的成就感。一个企业的繁荣昌盛关系到每一个公司员工的生存，企业繁荣了，员工们就会引以为豪，会更积极努力的进取，荣耀越高，成就感就越大，越明显。</span>
</p>
<p>
	<br />
</p>`,
};

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

const handleNodeClick = (data: Tree) => {
  console.log(data);
};

useHead({
  titleTemplate: `宏润兴-${mock.title}`,
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
    display: flex;
    margin: 0 0 20px 0;

    .right {
      padding: 20px;
      // border: 1px solid #eee;
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
      }
    }
  }
}
</style>
