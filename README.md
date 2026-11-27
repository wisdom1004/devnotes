# DevNotes

Java SE 知识卡片站。纯静态实现，零依赖，可直接托管在 GitHub Pages。

## 功能

- 四类卡片：填空、选择、判断、代码分析
- 三种练习方式：顺序、随机、模拟测验
- 答完立即显示正确答案与详细解析
- 自动收集错题到「待巩固」，支持收藏
- 学习数据统计，进度保存在浏览器本地

## 本地运行

```bash
python -m http.server 8899
# 打开 http://localhost:8899
```

## 部署到 GitHub Pages

1. 在 GitHub 新建一个公开仓库，例如 `devnotes`（不要勾选 README）。
2. 在本目录执行：

```bash
git remote add origin https://github.com/<你的用户名>/devnotes.git
git branch -M main
git push -u origin main
```

3. 仓库 → Settings → Pages → Source 选择 `main` 分支 / root 目录 → Save。
4. 等待部署完成，访问 `https://<你的用户名>.github.io/devnotes/`。

> 仓库中已包含 `.nojekyll` 文件，避免 Jekyll 处理导致静态资源丢失。
