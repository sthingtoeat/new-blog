---
title: Git小知识
date: 2024-5-31
tags:
- git
---

## 回档

```sh
git reset --hard head #当前版本，即你现在还没修改的时候的样子
git reset --hard HEAD^ #回退到上一个版本
git reset --hard HEAD^^ #回退到上上一个版本
git reset --hard HEAD~3 #回退到往上3个版本
git reset --hard HEAD~10 #回退到往上10个版本

```