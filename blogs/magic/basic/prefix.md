---
title: 前缀和
date: 2022-1-26
tags:
 - 基础算法
categories: 
 - 算法
---

## 一维前缀和

::: tips 提示
`S[i] = a[1] + a[2] + ... a[i]`
`a[l] + ... + a[r] = S[r] - S[l - 1]`
:::

[原题链接](https://www.acwing.com/problem/content/797/)

```c
#include<iostream>
using namespace std;
const int N = 1e5 +5 ;
int s[N],a[N];
int main()
{
    int n , m ;
    cin >> n >> m;
    for(int i = 1 ; i <= n ; i++)
        cin >> a[i];
    for(int i = 1 ; i <= n ; i ++)
        s[i] = s[i - 1] + a[i]; 
    while(m --)
    {
        int a , b;
        cin >> a >> b;
        cout << s[b]-s[a - 1] <<endl;
    }
    return 0 ;
}
```

## 二维前缀和(子矩阵之和)

::: tips 提示
`S[i, j] = 第i行j列格子左上部分所有元素的和`,以(x1, y1)为左上角，(x2, y2)为右下角的子矩阵的和为：`S[x2, y2] - S[x1 - 1, y2] - S[x2, y1 - 1] + S[x1 - 1, y1 - 1]`
:::

[原题链接](https://www.acwing.com/problem/content/798/)

```c
#include<iostream>
using namespace std;
const int N = 1005;
int n , m , q;
int a[N][N],s[N][N];
int main()
{
    cin >> n >> m >> q;
    for(int i = 1 ; i <= n ; i ++)
        for(int j = 1 ; j <= m ; j ++)
            cin >> a[i][j];
    for(int i = 1 ; i <= n ; i ++)
        for(int j  =1 ; j <= m ; j ++)
            s[i][j] = s[i - 1][j] + s[i][j - 1] -s[i - 1][j - 1] + a[i][j];
            
    while(q --)
    {
        int x1,y1,x2,y2;
        cin >> x1 >> y1 >> x2 >> y2;
        cout << s[x2][y2] - s[x1 - 1][y2] - s[x2][y1 - 1] + s[x1 - 1][y1 - 1]<<endl;
    }
    return 0;
}
```

## 二维前缀和优化版

```c
#include<iostream>
using namespace std;

const int N = 505;
int n , m , k;
int s[N][N];

int main()
{
    cin >> n >> m >> k;
    for(int i = 1 ; i <= n ; i ++)
        for(int j = 1 ; j <= m ; j ++)
        {
            cin >> s[i][j];
            s[i][j] += s[i - 1][j];         //s[i][j]表示的是竖的和
        }    
            
    long long res = 0;        
    for(int i = 1 ; i <= n ; i ++)
        for(int j = i ; j <= n ; j ++)      //这里的i , j 表示的上下边界
        {   
            int l = 1 , r;                      //这里是双指针 ,枚举的是左右边界
            int sum = 0;
            for(r = 1 ; r <= m ; r ++)
            {
                sum += s[j][r] - s[i - 1][r]; //每列那里，上下边界之差，就是中间区域的和
                while(sum > k)                  //如果说区域里面的和比k大，那么依次缩小左边界（左边界右移）
                {
                    sum -=s[j][l] - s[i - 1][l];
                    l ++;
                }
                res += r - l + 1;               //既然这个区域都小于k，那么这个区域的区域是不是也一定小于k
            }
            
        }
    cout << res ;    
    
    return 0;
}
```
