# 面试题：CSS 怎样实现动画？

（有哪些）CSS 主要通过**过渡（transitions）和关键帧（keyframes）**实现动画。

---

（过渡是什么）过渡指的是元素**从一种状态（样式）转变为另一种状态（样式）**的动画效果。过渡经常配合 `:hover` 或 JS 事件使用（触发元素变为另一种状态）。

（过渡怎么实现）通过设置元素 `transition` 样式，从而**设置元素的过渡效果**。**当元素某些样式变化后，这种变化会根据预先定义的 `transition` 样式中规定的过渡效果进行变换**（核心！！！）。

（过渡的语法简单说明）

```css
.element{
    transition: property duration timing-function delay;
    /* 过渡属性：none(默认)、all(最常用)、特定属性名(多个属性名以 , 分割) */
    /* 持续时间：<number>s/ms(接收两种单位，默认值为 0)(如果给多个属性指定，则多个时间以 , 分割) */
    /* 过渡速度曲线: ....... */
    /* 过渡开始前的延迟时间：<number>s/ms(接收两种单位，默认值为 0) */
}
```

（过渡的注意事项）并不是所有属性都可以过渡，必须值为数字，或可以转换为数字的属性才支持过渡。

---

（关键帧动画是什么）关键帧动画指的是通过**设置多个关键帧**来实现的一种动画效果。与过渡效果不同，关键帧动画通常不需要什么触发条件。并且关键帧动画在细节的把握上更加细腻。

（关键帧动画怎么实现）要使用关键帧动画，首先需要使用 `@keyframes 动画名 {}` **定义一个动画**，由一系列关键帧组成。然后在某些元素身上使用 `animation` 样式来**应用动画**。

（定义关键帧动画语法简单说明）

- 只设置开始结束关键帧

  ```css
  @keyframes 动画名 {
      from { // 开始时刻的关键帧
          
      }
      to { // 结束时刻的关键帧
          
      }
  }
  ```

- 设置百分比关键帧（可以设置任意数量的关键帧）

  ```css
  @keyframes 动画名 {
      0% { // 开始时刻的关键帧
          
      }
      20% {
          
      }
      xx%{ // 可以设置任意时刻的关键帧
          
      }
      80%{
          
      }
      100% { // 结束时刻的关键帧
          
      }
  }
  ```

（使用关键帧动画语法简单说明）

```css
.element{
    animation: animation-name duration timing-function delay iteration-count direction fill-mode
    /* 动画名(见动画定义) 持续时间(同过渡) 动画速度曲线(同过渡) 动画开始前延迟时间(同过渡) 动画播放次数(<number>, infinite 表示无限次) 动画方向(normal 开始到结束, reverse 结束到开始, alternate 交替, alternat-reverse 反方向交替) 动画结束后的状态(forwards 动画结束时状态, backwards 动画开始时状态) */
    animation-play-status: running; // 动画播放状态，running 默认值，播放；paused 暂停
}
```

### REFERENCES

https://github.com/Nasir1423/front-end-notes/blob/main/1-HTML%2BCSS/HTML%2BCSS.md#%E8%BF%87%E6%B8%A1day11181p882

https://github.com/Nasir1423/front-end-notes/blob/main/1-HTML%2BCSS/HTML%2BCSS.md#%E5%8A%A8%E7%94%BB