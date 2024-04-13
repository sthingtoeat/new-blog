---
title: 石子合并
date: 2022-8-12
tags:
 - 动态规划
 - 区间DP
categories: 
 - 算法
---

[原题链接](https://www.acwing.com/problem/content/284/)

```c
#include<iostream>
#include<algorithm>
using namespace std;

const int N = 305;

int s[N];
int f[N][N];

int main()
{
    int n ;
    cin >> n;
    
    for(int i = 1 ; i <= n ; i ++)
        cin >> s[i];
        
    for(int i = 1 ; i <= n ; i ++)
        s[i] += s[i - 1];
        
    for(int len = 2 ; len <= n; len ++)                         //len= 1的时候表示区间里面就一堆，代价为0不需要处理
        for(int i = 1 ;  i + len - 1 <= n ; i ++)
        {
            int l = i  , r = i + len - 1;
            f[l][r] = 0x3f3f3f3f;                               //取最小值,两边需要进行初始化成无穷大，不然取最小的时候可能是0
            for(int k = l ; k < r ; k ++)                       //对区间内的划分进行枚举分成区间【l , k】和【k + 1 , r】;
            {
                f[l][r] = min(f[l][r] , f[l][k] + f[k + 1][r] + s[r] - s[l - 1]);   
            }
        }
        
    cout << f[1][n];
    return 0;
}
```