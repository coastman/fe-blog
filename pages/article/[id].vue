<template>
  <div class="article-detail">
    <div class="title">
      <h2>{{ detail.title }}</h2>
    </div>
    <div class="content" v-html="markdown.render(detail.content)">
    </div>
  </div>

  <div class="comment">
    <div class="input-comment">
      <div class="user-info" v-if="showUserInfo">
        <input type="text" v-model="commentForm.commentator" placeholder="昵称 *">
        <input type="text" v-model="commentForm.email" placeholder="邮箱">
      </div>

      <div class="post-box">
        <div class="avatar">
          <img src="@/assets/img/default.jpeg" alt="">
        </div>

        <div
          ref="commentInput"
          contenteditable
          :class="{
            'content': true,
          }"
          placeholder="请输入你的见解"
          @focus="showUserInfo = true"
          @input="handleInput"
        >
        </div>
      </div>
      <div class="comment-tools" v-if="showUserInfo">
        <button class="submit" type="submit" @click="handleConfirm">发 布</button>
      </div>
    </div>

    <div class="comment-list">
      <div class="comment-item" v-for="(item, index) in commentList" :key="item.id">
        <div class="avatar">
          <img src="@/assets/img/default.jpeg" alt="">
        </div>
        <div class="comment-content">
          <div class="header">
            {{  item.commentator }}
          </div>
          <div class="content">
            {{ item.content }}
          </div>
          <!-- <div class="meta">
            <span><i class="iconfont icon-shijian"></i>5个月前</span>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { article, comment } from '@/api';
import { $http } from '@/composables/http'
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';
import { get, set } from '@/helper/storage';
const markdown = new MarkdownIt({
  html: true,
  xhtmlOut: true, 
  highlight(str: string, lang: string) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch (ex) {
        console.warn(ex);
      }
    }
    return '';
  }
});
const route = useRoute();
const detail = ref({});
const fetchArticleDetail = async () => {
  const res = await $http(`${article}/${route.params.id}`, {}) || {}; 
  detail.value = (res as any).data.result;
  detail.value.content = `
  ![](http://localhost:3000/_nuxt/assets/img/leave-china.webp)

  人始终摆脱不了动物本性，一个多巴胺内啡肽就能让我们乐此不疲，我现在就能说出我想要的快乐，但我时常无法再为此赋予意义。

  也许存在主义只是一种乐观的虚无主义，所有快乐的面具下都隐没着精神的疏离，仿似肉体之下的冷眼旁观与肉体之上热闹喧嚣刺了个对穿。

  <iframe
    frameborder="no"
    border="0"
    marginwidth="0"
    marginheight="0"
    style="height: 100px;min-height: auto; width: 100%;"
    src="//music.163.com/outchain/player?type=2&id=1868850856&auto=0&height=66"
  ></iframe>

  我还是憎恶媚俗、厌烦矫作、反感刻奇、腻歪感动，难以为世界中任何道貌岸然的崇高狂热和疯癫。

  我总是在深夜驱逐上帝，抽离人所臆造的终极根据，解构一切的价值框架，将宇宙生成的目的清空，把人类存在的意义归零。

  卸下存在主义乐观的面具，似乎任何力量都抡不起铁锤，也无力反抗终极的事实：**虚无**。

  你说不停追求人生终极目标的人终会迷失，总需要中途停下来看一看路上的风景，可风景又有什么意义？

  你说何不置之死地而后生，可死亡、后生又有什么意义？

  时而我因袭尼采的狂热，时而我效法西西弗斯的强硬，尽管我减少追逐成功的动力、花更多时间关切无意义的人与物，虚无主义的针剂却早已在体内流动，无可救药。

  **人人生而失败，众生皆苦。**

  （完）

  `
};

const commentList = ref([]);
const fetchComment = async () => {
  const res = await $http(`${comment}/byArticle/${route.params.id}`, {}) || {}; 
  commentList.value = (res as any).data.list;
};

const showUserInfo = ref(false);
const commentInput = ref(null);
const handleInput = () => {
  const text = commentInput?.value?.innerText;
  commentForm.content = text;
};

const user = ref({});
onBeforeMount(() => { 
  user.value = JSON.parse(get('user')) || {};
  commentForm.commentator = user.value.commentator;
  commentForm.commentatorId = user.value.commentatorId;
})

await Promise.all([
  fetchArticleDetail(),
  fetchComment()
]);

const commentForm = reactive({
  commentator: '',
  email: '',
  content: '',
  commentatorId: ''
});

const handleConfirm = async () => {
  const res = await $http(comment, {
    method: 'post',
    body: {
      ...commentForm,
      parentId: 0,
      articleId: route.params.id
    }
  });
  set('user', JSON.stringify({
    commentator: (res as any).data.result.commentator,
    commentatorId: (res as any).data.result.commentatorId,
  }));
  commentList.value.unshift(res.data.result);
}
</script>

<style lang="less" scoped>
.content {
  width: 100%;

  :deep(img) {
    width: 100%;
  }

  :deep(p) {
    text-indent: 2em;
    color: @article-text-color;
    line-height: 28px;
    font-size: 15px;

    img {
      display: block;
    }
  }
}

.article-detail {
  padding: 10px 20px;
  background-color: @header-bg;
  margin-bottom: 20px;

  .title {
    text-align: center;
  }
}

.comment {
  padding: 10px 20px;
  background-color: @header-bg;

  .user-info {
    margin-bottom: 12px;
    margin-left: 56px;

    input {
      background-color: #f2f3f5;
      border: none;
      outline: none;
      padding: 6px 8px;
    }

    input + input {
      margin-left: 12px;
    }
  }

  .post-box {
    display: flex;

    .avatar {
      width: 48px;
      height: auto;

      img {
        width: 100%;
      }
    }

    .content {
      padding: 8px 12px;
      margin-left: 12px;
      color: #252933;
      outline: none;
      box-sizing: border-box;
      resize: both;
      background-color: #f2f3f5;
      min-height: 90px;
      max-height: 200px;
      overflow-y: scroll;

      &:empty:before {
        content: attr(placeholder);
        color: @article-text-color;
      }

      &:focus {
        content: none;
      }
    }
  }

  .comment-tools {
    height: 30px;
    background-color: #dedede;
    margin-left: 56px;

    .submit {
      float: right;
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      padding: 0px 16px;
      background-color: #cfcfcf;
    }
  }

  .comment-list {
    margin-top: 12px;

    .comment-item {
      display: flex;

      .avatar {
        width: 48px;
        height: auto;

        img {
          width: 100%;
        }
      }

      .comment-content {
        margin-left: 12px;
        width: 100%;
        background-color: #f2f3f5;
        padding: 8px 12px;
        font-size: 14px;

        .header {
          font-weight: bolder;
          margin-bottom: 14px;
        }
        .content {
          // margin-bottom: 14px;
        }
        // .meta {
        //   font-size: 12px;
        // }
      }

      &:not(:first-child) {
        margin-top: 12px;
      }
    }
  }
}
</style>
