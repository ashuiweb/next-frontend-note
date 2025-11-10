`gsap.matchMedia()` 是 GSAP 中用于实现**响应式动画**的核心方法，允许根据不同屏幕尺寸（通过媒体查询）定义不同的动画逻辑，完美适配移动端、平板、桌面等多设备场景。其用法严格遵循官方文档（https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/）定义，具体如下：


### 一、核心作用
通过绑定 CSS 媒体查询规则，让动画在不同屏幕尺寸下执行不同的配置（如动画时长、触发位置、目标元素等），替代传统的“手动监听 resize 事件”方式，更高效且符合 CSS 响应式逻辑。


### 二、基础语法与结构
```javascript
// 定义响应式动画配置
const mm = gsap.matchMedia();

// 添加媒体查询规则及对应动画
mm.add("(min-width: 768px)", (context) => {
  // 该函数在媒体查询条件满足时执行（如屏幕宽度≥768px）
  // context 包含当前上下文工具（如用于清理动画的 revert()）
  
  // 定义该尺寸下的动画
  const tl = gsap.timeline();
  tl.to(".box", { x: 300, duration: 1 });
  
  // 必须返回清理函数（离开该尺寸时触发）
  return () => {
    tl.revert(); // 还原动画状态，避免影响其他尺寸
  };
});
```

- **关键逻辑**：当屏幕尺寸满足媒体查询条件时，执行第一个函数（创建动画）；当尺寸不满足时，执行返回的清理函数（还原状态）。


### 三、核心参数与上下文
#### 1. `mm.add()` 的参数
- 第一个参数：**媒体查询字符串**（同 CSS `@media` 语法），如 `"(max-width: 767px)"`、`"(min-width: 1200px)"`。
- 第二个参数：**回调函数**，接收 `context` 对象，包含：
  - `revert()`：批量还原当前上下文创建的所有动画（替代手动调用每个动画的 `revert()`）。
  - `add()`：在当前上下文内嵌套添加其他媒体查询（较少用）。


#### 2. 多条件配置
支持同时添加多个媒体查询规则，按优先级执行（更具体的规则优先）：
```javascript
const mm = gsap.matchMedia();

// 桌面端（≥1024px）
mm.add("(min-width: 1024px)", (context) => {
  gsap.to(".box", { x: 500, duration: 1.5 });
  return () => context.revert(); // 自动还原该上下文所有动画
});

// 平板端（768px-1023px）
mm.add("(min-width: 768px) and (max-width: 1023px)", (context) => {
  gsap.to(".box", { x: 300, duration: 1 });
  return () => context.revert();
});

// 移动端（≤767px）
mm.add("(max-width: 767px)", (context) => {
  gsap.to(".box", { x: 100, duration: 0.5 });
  return () => context.revert();
});
```
- **效果**：屏幕尺寸变化时，自动切换对应动画，且离开某尺寸时，自动还原该尺寸下的动画状态。


### 四、结合 ScrollTrigger 实现响应式滚动动画
最常用场景：不同屏幕尺寸下，滚动触发动画的 `start`/`end` 位置不同：
```javascript
const mm = gsap.matchMedia();

mm.add("(min-width: 768px)", (context) => {
  // 桌面端：滚动到元素顶部80%位置触发
  ScrollTrigger.create({
    trigger: ".section",
    start: "top 80%",
    end: "bottom 20%",
    animation: gsap.from(".section", { opacity: 0, y: 50 }),
    markers: true
  });
  return () => context.revert(); // 清理ScrollTrigger实例
});

mm.add("(max-width: 767px)", (context) => {
  // 移动端：滚动到元素顶部50%位置触发（更早触发）
  ScrollTrigger.create({
    trigger: ".section",
    start: "top 50%",
    end: "bottom 50%",
    animation: gsap.from(".section", { opacity: 0, y: 30 }),
    markers: true
  });
  return () => context.revert();
});
```


### 五、注意事项（文档强调点）
1. **必须返回清理函数**：每个媒体查询的回调函数必须返回一个函数（用于清理动画/ScrollTrigger实例），否则可能导致内存泄漏或状态混乱。
2. **上下文隔离**：不同媒体查询的动画相互独立，`context.revert()` 仅清理当前上下文创建的动画。
3. **初始执行时机**：页面加载时会自动检测当前屏幕尺寸，执行匹配的媒体查询回调，无需手动触发。
4. **媒体查询语法**：完全遵循 CSS 标准，支持 `and`、`or`（用逗号分隔）、`not` 等逻辑，如 `"(min-width: 768px), (orientation: landscape)"`。


### 六、与传统 resize 监听的对比
| 方式                | 优势                                                                                          | 劣势                                                          |
| ------------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| `gsap.matchMedia()` | 1. 与 CSS 媒体查询语法一致，易理解<br>2. 自动管理动画创建/清理<br>3. 性能更优（内部优化监听） | 仅用于 GSAP 动画的响应式控制                                  |
| 手动 resize 监听    | 可控制非 GSAP 逻辑                                                                            | 1. 需手动判断尺寸、创建/销毁动画<br>2. 易漏写清理逻辑导致冲突 |


如果需要更具体的场景示例（如“响应式文本动画”“不同尺寸下的时间轴序列调整”），可以告诉我，我会基于文档提供完整代码。