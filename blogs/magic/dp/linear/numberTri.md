---
title: 数字三角形
date: 2022-8-1
tags:
 - 动态规划
 - 线性DP
categories: 
 - 算法
---

数字三角形既可以从下往上也可以从上往下进行分析

[原题链接](https://www.acwing.com/problem/content/900/)

## 自下而上

```c
#include<iostream>						//自下而上，根据分析，不会越过边界
#include<algorithm>
using namespace std;
	
const int N = 1005;
int w[N][N];
int f[N][N];
int main()
{
    int n;
    cin >> n;
    for(int i = 1 ; i <= n ; i ++)
        for(int j = 1 ; j <= i ; j ++ )
            cin >> w[i][j];
            
    for(int i = n ; i >= 0 ; i --)
        for(int j = 1 ; j <= n ; j ++)
        {
            f[i][j] = max(f[i + 1][j] , f[i + 1][j + 1]) + w[i][j];
        }
    
    cout << f[1][1];
    return 0;
}
```

## 自上而下

```c
#include<iostream>					//自上而下，此时需要对边界进行处理，因为可能存在负数
#include<algorithm>
using namespace std;

const int N = 505;
int w[N][N] ;
int f[N][N] ;
int main()
{
    int n;
    cin >> n;
    for(int i = 1 ; i <= n ; i ++)
        for(int j = 1 ; j <= i ; j ++ )
            cin >> w[i][j];
            
     for(int i=1;i<=n;i++)
    {             
        for(int j=0;j<=i+1;j++)
        {                       //因为有负数，所以应该将两边也设为-INF
            f[i][j]=-0x3f3f3f3f;
        }
    }        
            
    for(int i = 1 ; i <= n ; i ++)          
        for(int j = 1 ; j <= i ; j ++)
        {
            f[i][j] = max(f[i - 1][j - 1] , f[i - 1][j]) + w[i][j];
        }
    
    int ans = -0x3f3f3f3f;
    for(int i = 1 ; i <= n ; i ++)  //取最大值
    {
        ans = max(f[n][i] , ans);
    }    
    
    cout << ans;
     
    return 0;
}
```