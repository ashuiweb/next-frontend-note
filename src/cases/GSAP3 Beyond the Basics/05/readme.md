## gsap也可以为animation进行tween
```js
  // 运动到1.5s
 gsap.to(animaton, { time: 1.5, duration: 2 });

 // 运动到一半
  gsap.to(animaton, { progress: 0.5}); //duration是有默认值0.5s
 // 1.5s后8倍速
 gsap.to(animaton, { timeScale: 8, delay: 1.5 }); // timeScale:0 就停住了
```
## 本案例核心
```js
  const setAnimationProgress = useMemoizedFn((p: number) => {
        if (!animatonRef.current) return;
        gsap.to(animatonRef.current, { progress: p });
    });
```