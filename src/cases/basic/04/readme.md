ScrollTrigger 是 GSAP 中最受欢迎的插件之一，专门用于实现“滚动触发动画”（如元素随滚动渐入、滚动到特定位置执行动画等），核心价值是让动画与用户滚动行为深度绑定，提升页面交互体验。以下从基础用法、核心配置、实战案例三个层面详细讲解：


### 一、ScrollTrigger 核心原理
通过监听页面滚动位置，当滚动到**触发区域**时，自动执行预设的动画（Tween 或 Timeline），并支持定义动画的开始/结束时机、触发条件、滚动方向等，本质是“滚动位置与动画状态的映射工具”。


### 二、基础用法
 

#### 1. 基础案例：滚动到元素时执行动画
当页面滚动到 `#box` 元素时，让它从透明变为不透明并上移：
```html
<div id="box" style="opacity: 0; transform: translateY(50px); width: 100px; height: 100px; background: red;"></div>

<script>
  gsap.to("#box", {
    // 动画目标：透明度1，上移50px
    opacity: 1,
    y: 0,
    duration: 1,
    //  scrollTrigger: ".box2", (简单用法)
    // ScrollTrigger 配置
    scrollTrigger: {
      trigger: "#box", // 触发元素（滚动到该元素时执行动画）
      start: "top 80%", // 动画开始时机：元素顶部到达视口80%位置（默认视口中心）
      end: "bottom 20%", // 动画结束时机：元素底部到达视口20%位置
      markers: true // 调试用：显示触发区域标记（实际开发可删除）
    }
  });
</script>
```
- **效果**：滚动页面，当 `#box` 顶部进入视口 80% 位置时，动画开始；底部离开视口 20% 位置时，动画结束。
- **markers 说明**：会在页面显示绿色（开始）、红色（结束）标记线，方便调试触发位置。


### 2、核心配置项（必掌握参数）
ScrollTrigger 的核心能力通过 `scrollTrigger` 对象的配置项实现，常用参数如下：

| 参数            | 作用                                                                     | 示例值                                                                                       |
| --------------- | ------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| `trigger`       | 定义“触发元素”（动画与哪个元素的滚动位置绑定）                           | `trigger: "#section1"`                                                                       |
| `start`         | 动画开始条件：`[元素位置, 视口位置]`，默认 `top center`                  | `start: "top 80%"`（元素顶部到视口80%）                                                      |
| `end`           | 动画结束条件：同上，默认 `bottom center`                                 | `end: "bottom 20%"`                                                                          |
| `scrub`         | 滚动时“实时驱动动画”（类似进度条随滚动同步变化），`true` 或时间（秒）    | `scrub: true`（完全同步）；`scrub: 0.5`（延迟0.5秒跟随）                                     |
| `pin`           | 滚动时“固定触发元素”在视口内（如固定导航、分屏滚动）                     | `pin: true`（固定trigger元素）；`pin: "#nav"`（固定指定元素）                                |
| `toggleActions` | 定义滚动方向变化时的动画行为：`[进入时, 离开时, 反向进入时, 反向离开时]` | `toggleActions: "play none none none"`（默认值）  <br>取值   "play pause reverse reset none" |
| `onEnter`       | 进入触发区域时的回调函数                                                 | `onEnter: () => console.log("进入触发区")`                                                   |


### 四、进阶场景案例
#### 1. 滚动实时驱动动画（scrub 用法）
实现“滚动时元素随滚动距离旋转”，滚动越远旋转角度越大：
```javascript
gsap.to("#circle", {
  rotation: 720, // 总旋转720度
  scrollTrigger: {
    trigger: "#container", // 以容器为触发区域
    start: "top top", // 容器顶部与视口顶部对齐时开始
    end: "bottom bottom", // 容器底部与视口底部对齐时结束
    scrub: true, // 滚动实时控制动画进度
    markers: true
  }
});
```

#### 2. 固定元素到滚动结束（pin 用法）
实现“滚动到某区域时，标题固定在顶部，直到区域结束才跟随滚动”：
```javascript
gsap.from("#section-title", {
  opacity: 0,
  duration: 0.5,
  scrollTrigger: {
    trigger: "#section",
    start: "top 10%",
    end: "bottom 10%",
    pin: "#section-title", // 固定标题
    pinSpacing: false, // 避免固定时页面跳动（默认会自动补位）
    toggleActions: "play none none reverse"
  }
});
```

#### 3. 结合 Timeline 实现序列动画
滚动到区域时，依次执行多个元素的渐入动画：
```javascript
// 创建时间轴
let tl = gsap.timeline({
  scrollTrigger: {
    trigger: "#card-container",
    start: "top 70%",
    toggleActions: "play none none reset"
  }
});

// 按顺序添加动画（间隔0.2秒）
tl.from("#card1", { opacity: 0, y: 30, duration: 0.5 })
  .from("#card2", { opacity: 0, y: 30, duration: 0.5 }, "+=0.2")
  .from("#card3", { opacity: 0, y: 30, duration: 0.5 }, "+=0.2");
```


### 五、调试与常见问题
1. **调试技巧**：始终开启 `markers: true` 查看触发区域，确认 `start`/`end` 位置是否符合预期。
2. **滚动抖动**：若使用 `pin` 出现页面跳动，添加 `pinSpacing: false` 并检查元素是否有margin/padding冲突。
3. **动画重复触发**：通过 `toggleActions` 控制方向，例如 `toggleActions: "play pause resume reset"` 避免反向滚动重复播放。
4. **响应式适配**：结合 `gsap.matchMedia()` 为不同屏幕尺寸设置不同的 `start`/`end` 参数。


如果需要更具体的场景实现（如“滚动视差效果”“滚动到顶部导航栏变化”），可以告诉我，我会提供完整代码示例！