---
title: kmp
date: 2022-4-28
tags:
 - 数据结构
categories: 
 - 算法
---

```c
#include<iostream>
using namespace std;
const int N  = 1e5 + 5 , M = 1e6 + 5;
char p[N] , s[M];
int ne[N] = {-1};
int n , m;
int main()
{
    cin >> n >> p + 1;
    cin >> m >> s + 1;                      //p和s数组均从下标1开始存储字符，可能是为了处理j出界
    
    
    for(int i = 2 , j = 0 ; i <= n ; i ++)   //next[1]肯定是0不需要求next
    {
        while(j != 0 && p[i] != p[j + 1]) j = ne[j];    //j!= 0 ,表示p和s两个字符串头对头不能在向前退了
        if(p[i] == p[j + 1]) j ++;                      //即  abcdefghi
        ne[i] = j;                                      //    abcde,    说不清楚，之后再理解吧
    }
    
    for(int i = 1 , j = 0 ; i <= m ; i ++)
    {
        while(j != 0 && s[i] != p[j + 1] ) j = ne[j];
        if(s[i] == p[j + 1])j ++;
        if(n == j)
        {
            cout << i - n << " ";
            j = ne[j];
        }
    }
    
    return 0;
}
```