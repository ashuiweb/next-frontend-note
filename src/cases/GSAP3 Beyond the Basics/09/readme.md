## stagger 属性
用来创建交错动画效果（staggered animations），让多个元素按顺序依次执行动画，而不是同时开始。

```js
 animation.from(chars, {
                y: -100,
                opacity: 0,
                stagger: {
                    each: 0.05,
                },
            });
```

## stagger 与 gsap.utils.wrap()搭配使用
```js
  // y: -100,
     y:gsap.utils.wrap([-100,100]),//期望数据不是死的而是一组数据交替出现
```