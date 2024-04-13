---
title: 完全背包
date: 2022-10-12
tags:
 - 动态规划
 - 背包
categories: 
 - 算法
---

完全背包的意义在于，物品数量是无限的

[原题链接](https://www.acwing.com/problem/content/3/)

## 求最大价值

```c
#include<iostream>
#include<algorithm>
using namespace std;
const int N = 1e3 + 5;

int v[N] , w[N];
int f[N][N];


int main()
{
    int n , m ;
    cin >> n >> m;
    for(int i = 1 ; i <= n; i ++)
        cin >> v[i] >> w[i];
        
    for(int i = 1 ; i <= n ; i ++)
        for(int j = 1 ; j <= m ; j ++)
        {
            f[i][j] = f[i - 1][j];
            if(j >= v[i])
                f[i][j] = max(f[i - 1][j] , f[i][j - v[i]] + w[i]);
        }
        
    cout << f[n][m] <<endl;
    
    return 0;
}
```

## 求方案数量

```c
#include<iostream>
#include<algorithm>
using namespace std;
const int N = 1e3 + 5;
int f[N] , v[5] = {0 ,10 , 20 , 50 , 100};

int main()
{
    int n;
    cin >> n;
    f[0] = 1;
    for(int i = 1 ; i <= 4 ; i ++)
        for(int j = v[i] ; j <= n ; j ++)
        {
            f[j] +=f[j - v[i]];                     //优化前应该是f[i][j] += f[i][j - v[i]
        }                                           //在01背包问题里面，是f[i][j] += f[i - 1][j -v[i]，因为f[i - 1]的缘故
                                                    //在计算f[i][j]的时候，必须要先算出f[i - 1],因此需要j从大到小遍历
    cout << f[n];                                   //而这里是f[i]所以不用从大到小遍历。
    
    return 0;
}
```