<template>
  <div class="article-detail">
    <div class="title">
      <h2>
        {{ detail.title }}
      </h2>
    </div>
    <div class="content" v-html="markdown.render(detail.content)">
    </div>
  </div>
</template>

<script setup lang="ts">
import { article } from '@/api';
import { $http } from '@/composables/http'
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';
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
const res = await $http(`${article}/${route.params.id}`, {}) || {};
const detail = (res as any).data.result;
detail.content = `
![](http://localhost:3000/_nuxt/assets/img/leave-china.webp)

白话词穷，作首诗吧。

<verse zh heading>出南洋记</verse>

<verse py>hù dōng bā jiǔ yuè, kè zi yì qín chuān.</verse>

<verse zh>沪东八九月，客子忆秦川。</verse>

<verse py>fāng cái liú qiān gǔ, shèng jì biàn luán shān.</verse>

<verse zh>芳才留千古，胜迹遍峦山。</verse>

<verse py>sì hǎi bēn téng huì huá xià, jiǔ zhōu tóng hǎo gòng hé huān.</verse>

<verse zh>四海奔腾汇华夏，九州同好共合欢。</verse>

<verse py>guān wài cháng biān zhèng fēi xuě, sài běi fēng róng xìng wú yān.</verse>

<verse zh>关外长边正飞雪，塞北烽戎幸无烟。</verse>

<verse py>dì wáng jiàng xiàng bù lián kǔ, bēi chóu bié lí jìn rén jiān.</verse>

<verse zh>帝王将相不怜苦，悲愁别离尽人间。</verse>

<verse py>cùn xīn cè yǐn cún rén yì, nài hé wú yào wú líng dān.</verse>

<verse zh>寸心恻隐存仁义，奈何无药无灵丹。</verse>

<verse py>shí lǐ yī zǒu mǎ, wǔ lǐ yī yáng biān.</verse>

<verse zh>十里一走马，五里一扬鞭。</verse>

<verse py>fú xiù nán yáng qù, dà dào rú qīng tiān.</verse>

<verse zh>拂袖南洋去，大道如青天。</verse>

<verse py>qiū shí yè luò guī gù lǐ, zài yǐn wàn jiā quán shuǐ hān.</verse>

<verse zh>秋时叶落归故里，再饮万家泉水酣。</verse>

中文诗体之美，在于其无可替代的高熵信息量，在于无需编码的形意想象，中文带给我巨大的安全感，我希望能尝试带着它周游人类的每一寸土地，用它的想象描绘世间的一切喜乐无常。

**驭文为舟，承思以航，写意余生，不负梦一场。**

（完）
`
</script>

<style lang="less" scoped>
.content {
  width: 100%;

  :deep(img) {
    width: 100%;
  }
  :deep(p) {
    // text-indent: 20px;
  }
}

.article-detail {
  padding: 10px 20px;
  background-color: @header-bg;
  .title {
    text-align: center;
  }
}
</style>
