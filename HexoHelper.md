## Hexo博客部署帮助文档

---

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

