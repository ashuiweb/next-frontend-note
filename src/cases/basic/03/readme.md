##  timeline
想要一下如果没有时间线那么为了编排动画,需要不停地去手动控制延时。
```js
gsap.from(".box1", {
    opacity: 0,
    duration: 2,
    x: 300,
});
gsap.from(".box2", {
    opacity: 0,
    duration: 2,
    delay: 2,
    x: 300,
});
```
而使用时间线的话直管往时间线添加动画即可，无需手动维护延时。
```js
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.from(".box1", {
        opacity: 0,
        duration: 2,
        x: 300,
    });
    tl.from(".box2", {
        opacity: 0,
        duration: 2,
        x: 300,
    });
    tl.from(".box3", {
        opacity: 0,
        duration: 2,
        x: 300,
    });
```
### 定位模式
- 1. 全局时间 
    ```js
    tl.from(".after3", { x: 100 }, 3); // 在前一个动画结束后等待到全局3秒
    ```
- 2. 相对模式
  - 2.1 在上个动画结束后
    ```js
     tl.from(".after3", { x: 100 }, '+=3'); // 在上个动画结束后延迟3秒
    ```
  - 2.2 在上个动画结束前
    ```js
     tl.from(".after3", { x: 100 }, '-=3'); // 在上个动画结束前3秒重叠
    ```
- 3. 标签定位（最直观）
   ```js
   tl.add("start")
    .from(".box1", { x: 100 })
    .add("mid")
    .from(".box2", { y: 50 }, "start+=3"); // 从start标签后3秒开始
   ```

你对Timeline的关注很关键，它是GSAP实现复杂动画编排的核心工具，能解决多动画序列的时间同步与灵活控制问题。以下从核心概念、关键用法、高级技巧三个维度，结合搜索到的信息整理详细内容。

### 1. Timeline核心定位与价值
Timeline是GSAP中管理多个Tween（补间动画）的“容器”，本质是“动画时间调度器”，核心价值在于解决传统`delay`控制动画的缺陷，具体优势如下：
- **避免时间错位**：传统用`delay`时，若前一个动画时长修改，后续所有动画需手动调整延迟，而Timeline会自动同步时间，前序动画时长变化后，后续动画自动适配。
- **简化复杂编排**：支持动画按顺序、重叠、指定时间点触发，无需手动计算每个动画的绝对开始时间。
- **统一控制**：可对整个动画序列执行`play()`（播放）、`pause()`（暂停）、`reverse()`（倒放）、`timeScale()`（变速）等操作，无需单独控制每个Tween。


### 2. Timeline基础用法（必掌握）
#### （1）创建Timeline
通过`gsap.timeline()`创建实例，支持传入配置项（如默认动画参数、初始状态），基础代码如下：
```javascript
// 1. 基础创建（无配置）
let tl = gsap.timeline();

// 2. 带配置创建（如设置所有子Tween的默认时长和缓动）
let tl = gsap.timeline({
  defaults: { duration: 1.5, ease: "power2.in" }, // 子Tween默认参数
  paused: true // 初始暂停，需手动调用play()
});
```

#### （2）添加Tween到Timeline
创建后通过链式调用`to()`/`from()`/`fromTo()`添加Tween，默认按添加顺序依次播放：
```javascript
// 示例：3个元素按顺序右移，绿色1秒、蓝色2秒、橙色1秒
let tl = gsap.timeline();
tl.to("#green", { x: 600, duration: 1 }) // 第0-1秒：绿色移动
  .to("#blue", { x: 600, duration: 2 })  // 第1-3秒：蓝色移动（绿色结束后开始）
  .to("#orange", { x: 600, duration: 1 });// 第3-4秒：橙色移动（蓝色结束后开始）
```


### 3. Timeline高级技巧（灵活控制时间）
#### （1）position参数：精准定位动画时间
这是Timeline的核心功能，通过第三个参数（position）控制Tween的开始位置，支持多种格式：

| position参数格式 | 作用示例                                                                           | 代码案例                                                                                                                                               |
| ---------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 绝对时间（数字） | 让Tween在时间轴的指定秒数开始                                                      | `tl.to("#green", {x:600}, 1)` // 第1秒开始绿色移动                                                                                                     |
| 相对前序（符号） | `<`：与前一个Tween同时开始；`+=n`：前一个结束后延迟n秒；`-=n`：前一个结束前n秒开始 | `tl.to("#green", {x:600}, 2)`<br>`.to("#purple", {x:600}, "<")` // 紫色与绿色同时开始<br>`.to("#orange", {x:600}, "+=0.5")` // 绿色结束后0.5秒开始橙色 |
| 标签（字符串）   | 先给时间轴加标签，再通过标签定位Tween                                              | `tl.add("startPurple", 1.5)` // 第1.5秒加标签"startPurple"<br>`.to("#purple", {x:600}, "startPurple")` // 标签位置开始紫色移动                         |

#### （2）嵌套Timeline：模块化复杂动画
将多个相关Tween封装成子Timeline，再添加到主Timeline，适合拆分大型动画（如页面分模块动画）：
```javascript
// 1. 创建子Timeline（模块1：标题+副标题动画）
let titleTl = gsap.timeline();
titleTl.from("#title", { opacity: 0, y: 20, duration: 0.8 })
       .from("#subtitle", { opacity: 0, y: 20, duration: 0.6 }, "-=0.3"); // 与标题重叠0.3秒

// 2. 创建主Timeline，添加子Timeline
let mainTl = gsap.timeline();
mainTl.add(titleTl) // 先播放标题模块动画
      .to("#content", { opacity: 1, duration: 1 }, "+=0.5"); // 标题结束后0.5秒播放内容动画
```

#### （3）时间控制API：灵活操作序列
创建Timeline后，可通过API实时控制整个序列，常用方法如下：
- `tl.play()`：播放动画（从当前位置继续）
- `tl.pause()`：暂停动画
- `tl.reverse()`：倒放动画
- `tl.seek(2)`：跳转到时间轴的第2秒位置
- `tl.timeScale(0.5)`：放慢速度（0.5倍速）；`tl.timeScale(2)`：加快速度（2倍速）
- `tl.progress(0.7)`：跳转到动画总时长的70%位置


### 4. 与传统delay的对比（为什么用Timeline）
用一个案例直观对比，同样实现“绿色→蓝色→橙色”依次移动，两种方式的差异如下：
| 对比维度 | 传统delay方式                                             | Timeline方式                                   |
| -------- | --------------------------------------------------------- | ---------------------------------------------- |
| 代码逻辑 | 需手动计算每个动画的delay（如蓝色delay=1，橙色delay=3）   | 无需计算，按添加顺序自动衔接                   |
| 灵活性   | 若绿色时长从1秒改为2秒，需手动将蓝色delay改为2、橙色改为4 | 只需修改绿色动画的duration，蓝色、橙色自动适配 |
| 控制效率 | 需单独控制每个Tween的播放/暂停                            | 调用`tl.play()`即可控制所有动画                |


---

 