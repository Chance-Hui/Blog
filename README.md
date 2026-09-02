# Chance Blog

Chance 的技术学习型个人博客，记录计算机相关知识、学习过程和问题解决方法。

## 技术栈

- Hugo Extended 0.165.0
- Hugo Theme Stack 4.0.3
- Markdown
- Git

Stack 主题源码已经完整保存在本仓库的 `themes/hugo-theme-stack` 中。

## 本地预览

进入项目目录：

```powershell
cd D:\Blog\my-blog
```

启动开发服务器：

```powershell
hugo server -D
```

浏览器访问：

```text
http://localhost:1313/
```

## 正式构建

```powershell
hugo --minify
```

生成结果位于：

```text
public/
```

`public` 是构建产物，不保存到源码分支。

## 主要目录

- `content/posts`：博客文章
- `content/page`：关于、搜索、归档等固定页面
- `assets`：需要 Hugo 处理的图片、样式和脚本
- `static`：原样复制的静态文件
- `layouts`：自定义模板及主题覆盖
- `archetypes`：新建内容时使用的模板
- `themes/hugo-theme-stack`：Stack 主题源码

## 备份计划

博客源码计划保存在：

- 本地电脑
- GitHub
- 移动硬盘

部署服务器主要保存构建后的静态网站。
