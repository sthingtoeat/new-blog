---
title: 最长上升子序列
date: 2022-8-4
tags:
 - 动态规划
 - 线性DP
categories: 
 - 算法
---

## 普通版

[原题链接](https://www.acwing.com/problem/content/897/)

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

## 二分贪心

[原题链接](https://www.acwing.com/problem/content/898/)

```c
#include<iostream>
#include<algorithm>
using namespace std;

const int N = 1e6 + 5;

int a[N];
int q[N];

int main()
{
    int n ;
    cin >> n;
    
    for(int i = 0 ; i < n ; i ++)
        cin >> a[i];
    
    
    int len = 0;
    q[0] = -2e9;    
    for(int i = 0 ; i < n; i ++)
    {
        
        int l = 0 , r = len;
        while(l < r)
        {
            int mid = l + r + 1 >> 1;       //动了左指针，说明要找的区间在右边，则需要向上取整
            if(q[mid] < a[i])
                l = mid;
            else
                r = mid - 1;
        }
        
        len = max(len , r + 1);
        q[r + 1] = a[i];
    }
    
    cout << len;
    return 0;
}
```