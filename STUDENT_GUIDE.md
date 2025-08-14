# 创建你的个人网站 - 学生指南 📚

欢迎来到个人网站创建项目！在这个项目中，你将建立一个展示自己作品和经历的专业网站。不用担心，我们会一步一步完成它。

## 🚀 准备工作

在开始之前，请确保你有：

- [ ] [GitHub](https://github.com) 账号
- [ ] [Vercel](https://vercel.com) 账号（用 GitHub 账号登录即可）
- [ ] [VS Code](https://code.visualstudio.com) 编辑器

## 📦 获取网站模板

1. 打开终端（Terminal），输入以下命令：

   ```bash
   # 记得把 your-name 换成你的英文名
   git clone https://github.com/SCLS-AI-Camp/MP1.git your-name-portfolio
   cd your-name-portfolio
   ```

2. 安装必要的组件：

   ```bash
   npm install
   ```

3. 启动网站预览：

   ```bash
   npm run dev
   ```

4. 在浏览器中访问 [http://localhost:3000](http://localhost:3000)

## ✨ 个性化你的网站

### 1. 基本信息设置

打开 `src/config/infoConfig.ts`，修改：

```typescript
// 个人基本信息
export const name = '你的名字'
export const headline = '你的标题'  // 例如：'Student at SCLS'
export const introduction = '简短的自我介绍'
export const email = '你的邮箱'

// 社交媒体链接
export const socialLinks = [
  {
    name: 'Bilibili',
    icon: 'bilibili',
    href: '你的bilibili主页链接'
  }
]
```

### 2. 教育经历

打开 `src/config/education.ts`：

```typescript
export const educationList = [
  {
    school: '你的学校',
    major: '你的专业/年级',
    logo: 'college',
    start: '2023',
    end: '2026'
  }
]
```

### 3. 项目展示

打开 `src/config/projects.ts`：

```typescript
export const projects = [
  {
    name: '项目名称',
    description: '项目描述',
    link: { 
      href: '项目链接',
      label: '链接文字'
    },
    category: ['类别'],  // 例如：['Website', 'Game']
    techStack: ['使用的技术'],  // 例如：['Python', 'React']
    tags: ['标签']
  }
]
```

### 4. 活动记录

打开 `src/config/activity.ts`：

```typescript
export const activities = [
  {
    name: '活动名称',
    description: '活动描述',
    date: '2024-02-24',  // 使用 YYYY-MM-DD 格式
    location: '活动地点'
  }
]
```

## 🖼️ 添加图片

1. 个人照片：
   - 准备一张清晰的照片
   - 重命名为 `portrait.jpg`
   - 放到 `src/images` 文件夹中

2. 项目截图：
   - 放在 `public/images` 文件夹中
   - 在项目配置中引用：`image: '/images/your-screenshot.png'`

## 🌐 发布网站

1. 保存你的修改：

   ```bash
   git add .
   git commit -m "更新个人信息"
   git push
   ```

2. 在 Vercel 上发布：
   - 访问 [Vercel](https://vercel.com)
   - 点击 "Add New Project"
   - 选择你的项目
   - 点击 "Deploy"

## ✅ 最终检查

确保以下内容都已完成：

- [ ] 所有个人信息都已更新
- [ ] 添加了个人照片
- [ ] 所有链接都能正常访问
- [ ] 项目描述清晰完整
- [ ] 网站可以正常打开

## ❓ 常见问题解决

如果遇到问题：

1. **网站无法预览**
   - 检查终端是否有错误信息
   - 确保 `npm run dev` 正在运行
   - 刷新浏览器页面

2. **图片不显示**
   - 检查图片路径是否正确
   - 确认图片格式（推荐 jpg 或 png）
   - 验证图片是否已提交到 Git

3. **代码报错**
   - 检查是否少了逗号或引号
   - 确保所有括号都配对
   - 保存文件后重新运行

## 🚀 进阶挑战

想让你的网站更出色？试试：

1. 自定义颜色主题
2. 添加更多项目展示
3. 写一个有趣的自我介绍
4. 添加博客功能

## 🎉 结语

记住：这是展示你自己的机会！如果遇到任何问题，随时询问老师。

祝你成功！加油！💪
