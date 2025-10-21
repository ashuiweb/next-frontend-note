## 主要使用到了两个回调
```js
{
     onComplete: () => {
        setIsPaused(true);
     },
     onUpdate: () => {
        setTime(+animaton.time().toFixed(2));
        setProgess(animaton.progress());
     },
}
``` 
 

## paused 设置或获取动画的暂停状态
```js
 animaton.pause() //是将动画暂停

 animaton.paused() //如果没有传递参数,则返回当前的暂停状态，否则就是设置值
```

## progress 设置或获取动画的进度
```js
 animaton.progress() //返回动画的进度,范围是0-1
 animaton.progress(0.5).paused(true); //设置动画的进度并暂停
```

## 其他
- `animaton.time(3)` 设置到某秒
- `animaton.timeScale(2)` 设置动画的速度
- `animaton.duration(3)` 设置动画的持续时间
- `animaton.reverse(true)` 反向播放动画
 