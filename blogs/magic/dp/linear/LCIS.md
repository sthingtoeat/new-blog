---
title: 最长公共上升子序列
date: 2022-8-6
tags:
 - 动态规划
 - 线性DP
categories: 
 - 算法
---

[原题链接](https://www.acwing.com/problem/content/899/)

```c++
#include<iostream>
#include<algorithm>
using namespace std;

const int N = 1e3 + 5;
char a[N] , b[N];
int f[N][N];

int main()
{
    int n , m ;
    
    cin >> n >> m;
    cin >> a + 1>> b + 1;                       //字符串比较的时候，第一个得空着，因为涉及到前面一个状态，如果没空着
                                                //那么f[0][0]前面没有状态，会导致奇奇怪怪的问题(wa)
    for(int i = 1 ; i <= n ; i ++)              
        for(int j = 1 ; j <= m ; j ++)          //这里i j 为什么从1开始也是这个原因 如果i j = 0 那么 i - 1 = -1，就不行了
        {
            f[i][j] = max(f[i - 1][j] , f[i][j - 1]);
            if(a[i] == b[j])
                f[i][j] = max(f[i][j] , f[i - 1][j - 1] + 1);
        }
        
    cout << f[n][m];
    return 0;
}

```