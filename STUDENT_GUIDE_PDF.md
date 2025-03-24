# 个人网站创建指南

**SCLS 计算机课程项目指导**  
*2024 年春季学期*

---

## 目录

1. [准备工作](#准备工作)
2. [获取项目模板](#获取项目模板)
3. [个性化设置](#个性化设置)
4. [发布网站](#发布网站)
5. [常见问题](#常见问题)

---

## 准备工作

### 必需工具
1. **GitHub 账号**
   - 访问 github.com 注册
   - 记住你的用户名和密码

2. **Vercel 账号**
   - 访问 vercel.com
   - 使用 GitHub 账号登录

3. **VS Code 编辑器**
   - 从 code.visualstudio.com 下载
   - 完成安装

---

## 获取项目模板

### 步骤 1：克隆项目
打开终端，输入以下命令：
```bash
git clone https://github.com/SCLS-AI-Camp/MP1.git your-name-portfolio
cd your-name-portfolio
```

### 步骤 2：安装依赖
```bash
npm install
```

### 步骤 3：启动预览
```bash
npm run dev
```

现在你可以在浏览器中访问 http://localhost:3000 查看网站。

---

## 个性化设置

### 1. 基本信息
文件：`src/config/infoConfig.ts`

```typescript
// 修改以下内容
export const name = '你的名字'
export const headline = '你的标题'
export const introduction = '自我介绍'
export const email = '你的邮箱'

// 社交媒体链接
export const socialLinks = [
  {
    name: 'Bilibili',
    icon: 'bilibili',
    href: '你的主页链接'
  }
]
```

### 2. 教育经历
文件：`src/config/education.ts`

```typescript
export const educationList = [
  {
    school: '你的学校',
    major: '年级/专业',
    logo: 'college',
    start: '2023',
    end: '2026'
  }
]
```

### 3. 项目展示
文件：`src/config/projects.ts`

```typescript
export const projects = [
  {
    name: '项目名称',
    description: '项目描述',
    link: '项目链接',
    tags: ['项目标签1', '项目标签2']
  }
]
```

### 4. 个人照片
1. 准备照片
   - 尺寸：800x800 像素
   - 格式：JPG
   - 命名：portrait.jpg

2. 替换文件
   - 位置：`src/images/portrait.jpg`

---

## 发布网站

### 1. 保存更改
```bash
git add .
git commit -m "更新个人信息"
git push
```

### 2. Vercel 部署
1. 访问 vercel.com
2. 点击 "Add New Project"
3. 选择你的项目
4. 点击 "Deploy"

---

## 常见问题

### 问题 1：网站无法预览
- 检查终端错误信息
- 确保 `npm run dev` 在运行
- 刷新浏览器

### 问题 2：图片不显示
- 检查图片路径
- 确认图片格式
- 验证图片是否已提交

### 问题 3：代码报错
- 检查标点符号
- 确保括号配对
- 保存后重新运行

---

## 检查清单

- [ ] 更新个人信息
- [ ] 添加照片
- [ ] 测试所有链接
- [ ] 检查项目描述
- [ ] 确认网站可访问

---

## 帮助资源

如果遇到问题：
1. 查看终端错误信息
2. 检查文件保存状态
3. 刷新网页
4. 询问老师

---

*注：本指南由 SCLS 计算机课程提供*
