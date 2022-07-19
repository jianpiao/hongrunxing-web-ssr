<template>
  <div class="news">
    <SectionHeader :name="pageName" theme="light"></SectionHeader>
    <div class="box">
      <Empty v-if="pendingNews"></Empty>
      <div class="right" v-else>
        <div
          v-for="(item, index) in news"
          :key="index"
          class="item flex"
          @click="handleDetail(item)"
        >
          <div class="img">
            <img :src="item.src" fit="fill" alt="图片加载失败" />
          </div>
          <div class="article">
            <p>{{ item.title }}</p>
            <p>{{ item.content }}</p>
          </div>
        </div>
      </div>
    </div>

    <SectionHeader name="联系我们" theme="light"></SectionHeader>
    <div class="company" v-if="!pendingAboutInfo && aboutInfo">
      <p>电话：{{ aboutInfo.phone }}</p>
      <p>邮箱：{{ aboutInfo.email }}</p>
      <p>地址：{{ aboutInfo.address }}</p>
      <div class="more" @click="jumpAbout">了解更多</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "#app";
import report from "~~/composable/use-report";
import { BASE_URL } from "~~/config/default";

interface INews {
  id: number;
  title: string;
  content: string;
  create_time?: string;
  author?: string;
  category_name?: string;
  src: string;
}

const router = useRouter();
const pageName = ref("行业信息");

const [
  { data: news, pending: pendingNews },
  { data: aboutInfo, pending: pendingAboutInfo },
] = await Promise.all([
  useLazyFetch(`${BASE_URL}/news/get?pageSize=999`, {
    transform(data: { data: { list: INews[] } }) {
      if (data?.data?.list) {
        return data?.data?.list.map((e) => {
          e.content = e.content.replace(/<.+?>/g, "");
          return e;
        });
      }
      return [];
    },
    key: "news",
  }),
  useFetch(BASE_URL + "/company_info/get?type=web", {
    transform(data: {
      data: { phone: string; email: string; address: string };
    }) {
      return data?.data;
    },
    key: "company_info",
  }),
]);

watch(news, () => {
  pendingNews.value = false;
  pendingAboutInfo.value = false;
});

onMounted(() => {
  window.scrollTo(0, 0);
  report("news");
});

const handleDetail = (item: INews) => {
  router.push(`/news/${item.id}`);
};

const jumpAbout = () => {
  router.push(`/about?currentTab=2`);
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

  .flex {
    display: flex;
    align-items: center;
  }

  justify-content: center;

  .box {
    width: 1200px;
    display: flex;
    margin: 0 0 20px 0;
    position: relative;

    .right {
      padding: 0 10px;
      overflow: hidden;

      .item {
        animation: intoFromRight 1s;
        cursor: pointer;
        background-color: #5c5c5c;
        margin-bottom: 15px;

        &:hover {
          background-color: #3c3c3c;
        }

        &:last-child {
          border-bottom: none;
        }

        .img {
          width: 300px;
          height: 300px;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .article {
          flex: 1;
          height: 300px;
          padding: 20px;

          p {
            &:nth-child(1) {
              color: #fff;
              margin-bottom: 15px;
              font-size: 20px;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
              width: 100%;
            }

            &:nth-child(2) {
              width: 100%;
              line-height: 28px;
              font-size: 16px;
              color: #e1e1e1;
              display: -webkit-box;
              -webkit-line-clamp: 8;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }
          }
        }
      }
    }
  }

  .company {
    font-family: "Source Han Sans CN" !important;
    text-align: center;
    color: #fff;
    font-size: 14px;
    font-weight: 300;
    line-height: 30px;
    padding: 40px 0;

    .more {
      margin: 60px auto;
      min-width: 160px;
      height: 40px;
      background-color: #111;
      border-radius: 2px;
      border: solid 1px #666;
      display: inline-block;
      line-height: 40px;
      padding-top: 0;
      padding-bottom: 0;
      color: #fff;
      transition: 0.4s;
      font-size: 12px;
      cursor: pointer;
    }
  }

  @media only screen and (max-width: 1200px) {
    .box {
      width: 100vw;

      .right {
        padding: 0 20px;

        .item {
          margin-bottom: 10px;

          .img {
            width: 25vw !important;
            height: 25vw !important;
          }

          .article {
            height: 25vw !important;
            padding: 10px;
            width: calc(100vw - 25vw - 40px);
          }
        }
      }
    }
  }

  @media only screen and (max-width: 1200px) and (min-width: 1000px) {
    .box {
      .right {
        .item {
          .article {
            p {
              &:nth-child(2) {
                -webkit-line-clamp: 7;
              }
            }
          }
        }
      }
    }
  }

  @media only screen and (max-width: 1000px) and (min-width: 900px) {
    .box {
      .right {
        .item {
          .article {
            p {
              &:nth-child(2) {
                -webkit-line-clamp: 6;
              }
            }
          }
        }
      }
    }
  }

  @media only screen and (max-width: 900px) and (min-width: 800px) {
    .box {
      .right {
        .item {
          .article {
            p {
              &:nth-child(2) {
                -webkit-line-clamp: 5;
              }
            }
          }
        }
      }
    }
  }

  @media only screen and (max-width: 800px) and (min-width: 700px) {
    .box {
      .right {
        .item {
          .article {
            p {
              &:nth-child(2) {
                -webkit-line-clamp: 4;
              }
            }
          }
        }
      }
    }
  }

  @media only screen and (max-width: 700px) {
    .box {
      .right {
        .item {
          .article {
            p {
              &:nth-child(1) {
                font-size: 16px;
                margin-bottom: 10px;
              }

              &:nth-child(2) {
                line-height: 20px;
                font-size: 14px;
              }
            }
          }
        }
      }
    }
  }

  @media only screen and (max-width: 700px) and (min-width: 600px) {
    .box {
      .right {
        .item {
          .article {
            p {
              &:nth-child(2) {
                -webkit-line-clamp: 5;
              }
            }
          }
        }
      }
    }
  }

  @media only screen and (max-width: 600px) and (min-width: 500px) {
    .box {
      .right {
        .item {
          .article {
            p {
              &:nth-child(2) {
                -webkit-line-clamp: 4;
              }
            }
          }
        }
      }
    }
  }

  @media only screen and (max-width: 500px) and (min-width: 400px) {
    .box {
      .right {
        .item {
          .article {
            p {
              &:nth-child(2) {
                -webkit-line-clamp: 3;
              }
            }
          }
        }
      }
    }
  }

  @media only screen and (max-width: 400px) {
    .box {
      .right {
        .item {
          .article {
            p {
              &:nth-child(2) {
                -webkit-line-clamp: 2;
              }
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
