---
title: 分组背包
date: 2022-8-1
tags:
 - 动态规划
 - 背包
categories: 
 - 算法
---

分组的意思在于，每一组挑一个东西

[原题链接](https://www.acwing.com/problem/content/9/)

```c++
#include<iostream>
#include<algorithm>
using namespace std;

const int N = 105;

int v[N][N],w[N][N],s[N];
int f[N];
int main()
{
    int n , m;
    cin >> n >> m;
    
    for(int i = 1 ; i <= n ; i ++)
    {
        cin >> s[i];
        for(int j = 0 ; j < s[i] ; j ++)
            cin >> v[i][j] >> w[i][j];
    }
    
    for(int i = 1 ; i <= n ; i ++)
        for(int j = m ; j >= 0 ; j --)
            for(int k = 0 ; k < s[i] ; k ++)
                if(v[i][k] <= j)
                    f[j] = max(f[j] , f[j - v[i][k]] + w[i][k]);
                
    cout << f[m];
    
    return 0;
}

```