---
title: 差分
date: 2022-9-22
tags:
 - 基础算法
categories: 
 - 算法
---

## 一维差分

[原题链接](https://www.acwing.com/problem/content/description/799/)

::: tips 提示
给区间`[l, r]`中的每个数加上`c`：`B[l] += c, B[r + 1] -= c`
:::

```c
#include<iostream>
using namespace std;
const int N  = 1e5 + 5;

int a[N];
int b[N];
int main()
{
    int n , m;
    cin >> n >> m;
    for(int i = 1 ; i <= n ; i ++)
    {
        cin >> a[i];
        b[i] = a[i] - a[i - 1];                 //差分，顾名思义是一个由差得出的结果
                                                //用于记录第i个数与上一个数（i - 1）之间的差是多少
    }    
    while(m --)			//这里的b数组，同时充当了差分数组,也充当了前缀和数组。
    {					//先进行差分,之后那个循环，用于求前缀和，也就是说，要知道某个数，只要求它的前缀和即可。
        int l, r , c;
        cin >> l >> r >> c;
        b[l] += c;                              //此处，因为后面需要求前缀和，所以只要第一个加上了c则后面的所有都加上了c
        b[r + 1] -= c;                          //需要将l ~ r区间内的数加上c，则必须在r + 1 个数减去c以此抵消多出的c，让后面的数不变
    }
    for(int i = 1 ; i <= n ; i++)               //对查封数组进行求前缀和
    {
         b[i] = b[i] + b[i - 1];
         cout << b[i] <<" ";
    }    
    return 0;
}
```

## 二维差分

[原题链接](https://www.acwing.com/problem/content/description/800/)

::: tips 提示
S[x1, y1] += c, S[x2 + 1, y1] -= c, S[x1, y2 + 1] -= c, S[x2 + 1, y2 + 1] += c
:::

```c
#include<iostream>
using namespace std;

const int N = 1005;

int a[N][N],b[N][N];

void insert(int x1 , int y1 , int x2 , int y2 , int c)
{
        b[x1][y1] += c;                         //这里可以和前缀和模型对比一下，取的是右下角那一块
        b[x1][y2 + 1] -= c;
        b[x2 + 1][y1] -= c;
        b[x2 + 1][y2 + 1] += c;
}

int main()
{
    int n , m , q;
    cin >> n >> m >> q;
    for(int i = 1; i <= n ; i++)
        for(int j = 1 ; j <= m ; j ++)
            cin >> a[i][j];
    
    for(int i = 1 ; i <= n ; i ++)
        for(int j = 1; j <= m ; j ++)
            insert(i , j , i , j , a[i][j]);
            
    while(q --)
    {
        int x1 , y1 ,x2 , y2 , c;
        cin >> x1 >> y1 >> x2 >> y2 >> c;
        insert(x1 , y1 , x2 , y2 , c);
    }
    
    for(int i = 1 ; i <= n ; i ++)
        for(int j = 1 ; j <= m ; j ++)
            b[i][j] += b[i - 1][j] + b[i][j - 1] - b[i - 1][j - 1];
    
    

    for(int i = 1 ; i <= n ; i++)
    {
        for(int j = 1 ; j <= m ; j ++)
        {
            cout << b[i][j] << " ";
        }
        cout << endl;
    }
    return 0;
    
}
```