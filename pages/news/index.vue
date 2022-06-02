<template>
  <div class="news">
    <SectionHeader :name="pageName"></SectionHeader>
    <div class="box">
      <Empty v-if="pending"></Empty>
      <div class="right" v-else>
        <div v-for="(item, index) in news" :key="index" class="item flex" @click="handleDetail(item)">
          <div class="img">
            <img style="width: 150px; height: 150px" :src="item.src" fit="fill" alt="图片加载失败" />
          </div>
          <div class="article">
            <p>{{ item.title }}</p>
            <p>{{ item.content }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "#app";
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

const { pending, data: news } = useLazyFetch(`${BASE_URL}/news/get`, {
  transform(data: { data: { list: INews[] } }) {
    if (data?.data?.list) {
      return data?.data?.list.map(e => {
        e.content = e.content.replace(/<.+?>/g, "");
        return e
      })
    }
    return []
  }
})

watch(news, () => {
  pending.value = false
})

const handleDetail = (item: INews) => {
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

  .flex {
    display: flex;
    align-items: center;
  }

  justify-content: center;

  @mixin thinBorder($directionMaps: bottom,
    $color: #ccc,
    $radius: (0,
      0,
      0,
      0),
    $position: after) {
    // 是否只有一个方向
    $isOnlyOneDir: string==type-of($directionMaps);

    @if ($isOnlyOneDir) {
      $directionMaps: ($directionMaps);
    }

    @each $directionMap in $directionMaps {
      border-#{$directionMap}: 1px solid $color;
    }

    // 判断圆角是list还是number
    @if (list==type-of($radius)) {
      border-radius: nth($radius, 1) nth($radius, 2) nth($radius, 3) nth($radius, 4);
    }

    @else {
      border-radius: $radius;
    }

    @media only screen and (-webkit-min-device-pixel-ratio: 2) {
      & {
        position: relative;

        // 删除1像素密度比下的边框
        @each $directionMap in $directionMaps {
          border-#{$directionMap}: none;
        }
      }

      &:#{$position} {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        width: 200%;
        height: 200%;
        transform: scale(0.5);
        box-sizing: border-box;
        padding: 1px;
        transform-origin: 0 0;
        pointer-events: none;
        border: 0 solid $color;

        @each $directionMap in $directionMaps {
          border-#{$directionMap}-width: 1px;
        }

        // 判断圆角是list还是number
        @if (list==type-of($radius)) {
          border-radius: nth($radius, 1) * 2 nth($radius, 2) * 2 nth($radius, 3) * 2 nth($radius, 4) * 2;
        }

        @else {
          border-radius: $radius * 2;
        }
      }
    }

    @media only screen and (-webkit-min-device-pixel-ratio: 3) {
      &:#{$position} {

        // 判断圆角是list还是number
        @if (list==type-of($radius)) {
          border-radius: nth($radius, 1) * 3 nth($radius, 2) * 3 nth($radius, 3) * 3 nth($radius, 4) * 3;
        }

        @else {
          border-radius: $radius * 3;
        }

        width: 300%;
        height: 300%;
        transform: scale(0.3333);
      }
    }
  }

  .box {
    width: 1200px;
    display: flex;
    margin: 0 0 20px 0;
    position: relative;

    .right {
      padding: 0 10px;
      // border: 1px solid #eee;
      @include thinBorder((top, left, right, bottom), #eee);
      overflow: hidden;

      .item {
        padding: 20px 0;
        // border-bottom: 1px solid #f6f6f6;
        @include thinBorder((bottom), #f6f6f6);
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

  @media only screen and (max-width: 992px) {
    .box {
      width: 100vw;

      .right {
        padding: 0 20px;
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
