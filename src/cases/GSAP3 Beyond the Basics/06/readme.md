# GSAP 回调函数详解

在 GSAP 中，回调函数是在动画特定时刻执行的函数。本示例展示了如何使用 GSAP 的 onComplete 回调函数及其相关参数。

## 核心概念

### 1. 回调函数类型
GSAP 提供了几种不同类型的回调函数：
- `onStart`: 动画开始时触发
- `onUpdate`: 动画每一帧更新时触发
- `onComplete`: 动画完成时触发
- `onRepeat`: 动画重复时触发（如果设置了 repeat）
- `onReverseComplete`: 动画反向播放完成时触发

### 2. 回调函数中的 this 指向
默认情况下，在回调函数中使用箭头函数会丢失 GSAP 的上下文（this）。
```javascript
// 箭头函数中无法获取 GSAP 上下文
const onComplete = () => {
  // 这里的 this 不是 GSAP 的 tween 实例
}
```

要获取 GSAP 上下文，应使用普通函数并配合 `callbackScope` 参数：
```javascript
const onComplete = useMemoizedFn(function (this: gsap.core.Tween, ...args: any[]) {
    console.log("onComplete", this, args);
    console.log(this.time()); // 获取动画当前时间
    console.log(this.targets()[0]); // 获取动画目标元素
});
```

### 3. callbackScope 参数
通过 `callbackScope` 可以显式设置回调函数中 this 的指向：
```javascript
gsap.to("img", {
    x: 400,
    scale: 3,
    duration: 1,
    onComplete,
    callbackScope: container.current?.querySelector("img")!, // 修改 this 指向
    onCompleteParams: ["hello", "world"],
});
```

### 4. 回调参数传递
使用对应的 Params 属性可以向回调函数传递参数：
- `onStartParams`
- `onUpdateParams`
- `onCompleteParams`
- `onRepeatParams`
- `onReverseCompleteParams`

```javascript
gsap.to("img", {
    x: 400,
    // ...
    onComplete,
    onCompleteParams: ["hello", "world"], // 传递给 onComplete 的参数
});
```

 
## 关键要点

1. 使用 `useMemoizedFn` 包装回调函数以确保其引用稳定
2. 使用普通函数而非箭头函数以保留 GSAP 上下文
3. 利用 `callbackScope` 明确指定回调函数中 this 的指向
4. 使用 `xxxParams` 属性向回调函数传递自定义参数
 