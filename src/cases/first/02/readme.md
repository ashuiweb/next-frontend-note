# 动画示例

这是一个简单的动画示例，展示了如何使用 GSAP 创建流畅的动画效果。

## 代码说明

```javascript
import { gsap } from "gsap";

// 创建一个简单的动画
gsap.to(".box", {
  x: 100,
  duration: 1,
  ease: "power2.out"
});
```

## HTML 结构

```html
<div class="container">
  <div class="box">动画元素</div>
</div>
```

## CSS 样式

```css
.container {
  width: 300px;
  height: 200px;
  border: 1px solid #ccc;
  position: relative;
}

.box {
  width: 50px;
  height: 50px;
  background-color: #3498db;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
}
```

## 关键点

1. 使用 `gsap.to()` 方法创建补间动画
2. 设置目标元素的 CSS 属性
3. 配置动画持续时间和缓动效果