## Hexo博客部署帮助文档

---

### 本地运行服务

```shell
hexo server
```



### 更新博客设置和文章

- 清除之前生成的东西(也可以不加)。

```shell
hexo clean
```

- 生成静态文章，可以用 hexo g缩写

```shell
hexo generate
```

- 部署文章，可以用hexo d缩写

```shell
hexo deploy
```

---

### 新增文章

```shell
hexo new newpapaername
```



**设置分类及标签**

```markdown
---
title: title #文章標題
date: 2016-06-01 23:47:44 #文章生成時間
categories: "Hexo教程" #文章分類目錄 可以省略
tags: #文章標籤 可以省略
     - 标签1
     - 标签2
 description: #你對本頁的描述 可以省略
---
```

```markdown
---
title: typora-vue-theme主题介绍
date: 2018-09-07 09:25:00
author: 赵奇
img: /source/images/xxx.jpg
top: true
hide: false
cover: true
coverImg: /images/1.jpg
password: 8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92
toc: false
mathjax: false
summary: 这是你自定义的文章摘要内容，如果这个属性有值，文章卡片摘要就显示这段文字，否则程序会自动截取文章的部分内容作为摘要
categories: Markdown
tags:
  - Typora
  - Markdown
---
```

