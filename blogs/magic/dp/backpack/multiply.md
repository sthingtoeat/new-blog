---
title: 多重背包
date: 2022-7-29
tags:
 - 动态规划
 - 背包
categories: 
 - 算法
---

多重背包，在于你有多个背包

## 物品数量指定

[原题连接](https://www.acwing.com/problem/content/4/)

```c++
#include<iostream>
using namespace std;

const int N = 105;

int v[N] , w[N] , s[N];
int f[N][N];

int main()
{
    int n , m;
    cin >> n >> m;
    
    for(int i = 1 ; i <= n ; i ++)
        cin >> v[i] >> w[i] >> s[i];
    
    for(int i = 1 ; i <= n ; i ++)
        for(int j = 0 ; j <= m ; j ++)
            for(int k = 0 ; v[i] * k <= j && k <= s[i] ; k ++)
            {
                // f[i][j] = f[i - 1][j];        
                // if(j >= v[i] * k)
                //     f[i][j] = max(f[i][j] , f[i][j - v[i] * k] + w[i] * k);
                
                f[i][j] = max(f[i][j] , f[i - 1][j - v[i] * k] + w[i] * k);     //当k等于0的时候。f[i][j] 就等于f[i - 1][j];
            }
    
    cout << f[n][m];
    
    return 0;
}
```

## 快速幂优化版

[原题链接](https://www.acwing.com/activity/content/problem/content/1000/)

有的时候，三重循环的时间复杂度过大了，可能会超时，那么这时候我们就需要进行优化了。

```c++
#include<iostream>
#include<algorithm>
using namespace std;

const int N = 25000;

int v[N] ,w[N] ,s[N];
int f[N];

int main()
{
    int n,m;
    cin >> n >> m;
    
    int cnt = 0;
    for(int i = 1 ; i <= n ; i ++)
    {
        int a , b , s;
        cin >> a >> b >> s;
        
        int k = 1 ;
        while(k <= s)
        {
            cnt ++;
            v[cnt] = a * k;
            w[cnt] = b * k;
            
            s -= k;
            k *= 2;
        }
        if(s > 0)
        {
            cnt ++;
            v[cnt] = a * s;
            w[cnt] = b * s;
            
        }
    }
    
    n = cnt;
    for(int i = 1 ; i <= n ; i ++)
        for(int j = m ; j >= v[i] ; j --)
        {
            f[j] = max(f[j] , f[j - v[i]] + w[i]);
        }
        
    cout << f[m];
    return 0;
}
```