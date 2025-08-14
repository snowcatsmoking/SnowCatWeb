# SnowCat 个人网站

这是 SnowCat 的个人作品集网站，基于 [Corey Chiu](https://coreychiu.com) 创建的优秀作品集模板。

## 致谢原作者

本网站模板由 **Corey Chiu** 创建。非常感谢他的杰出贡献和开源精神！  
查看原作者的作品：[coreychiu.com](https://coreychiu.com)

## 关于我

我是 SnowCat，一名北邮在读学生，专业是电信工程及管理，但对计算机技术有着浓厚兴趣。这个网站用来展示我的项目、技术分享和个人思考。

## 功能特点

- 🎨 使用 TailwindCSS、MagicUI 和 Shadcn/UI 设计的精美界面
- 📱 完全响应式布局
- 🌙 明暗主题切换
- 📊 GitHub 贡献日历和可视化
- 💻 技术栈图标云展示
- 👥 访客计数器
- 📝 支持 MDX 和 Markdown 的博客系统
- 📰 RSS 订阅功能
- 📈 网站分析支持

## 技术栈

- **前端框架**: Next.js 14
- **样式**: TailwindCSS
- **UI 组件**: Shadcn/UI, MagicUI
- **图标**: Phosphor Icons
- **内容管理**: MDX
- **部署**: Vercel

## 本地开发

1. 克隆仓库：
```bash
git clone https://github.com/snowcatsmoking/SnowCatWeb.git
cd SnowCatWeb
```

2. 安装依赖：
```bash
pnpm install
```

3. 创建环境变量文件：
```bash
cp .env.example .env.local
```

4. 启动开发服务器：
```bash
pnpm dev
```

5. 在浏览器中访问 [http://localhost:3000](http://localhost:3000)

## 部署

推荐使用 [Vercel](https://vercel.com) 进行部署：

1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. 配置环境变量
4. 一键部署

## 配置文件

主要配置文件位于 `src/config/` 目录：

- `siteConfig.ts` - 网站基础配置
- `infoConfig.ts` - 个人信息配置
- `projects.ts` - 项目展示配置
- `education.ts` - 教育经历配置
- `career.ts` - 工作经历配置

博客内容位于 `src/content/blog/` 目录，支持 MDX 格式。

## 许可证

本项目基于 MIT 许可证开源 - 查看 [LICENSE](LICENSE) 文件了解详情。

---

**联系方式**: panmingh@outlook.com  
**GitHub**: [@snowcatsmoking](https://github.com/snowcatsmoking)