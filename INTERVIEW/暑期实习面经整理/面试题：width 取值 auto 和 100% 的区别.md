# width: auto Vs. width: 100%

## 关于 width 属性

- CSS 中的 `width` 属性用于设置**元素的宽度**。默认情况下，`width` 设置的是**内容区**（content area）的宽度。如果元素有样式 `box-sizing: border-box`，则 `width` 设置的是**边框区**（border area）的宽度。

- `width` 取值为百分比（percentage），表示当前元素的宽度为其**包含块**（containing block）的宽度的百分比。

  > 通常情况下（即对于非定位元素而言），元素的包含块为该元素**最近的块级祖先元素的内容区**。

- `width` 取值为 `auto`，表示浏览器根据实际情况会自动计算出一个宽度。

## width: auto 的行为

- 对于非替换的块级元素（如 `<div>`、`<p>` 等），`width: auto` 意味着元素会尽可能地填满其父元素的可用空间，但不会超过父元素的宽度，同时会考虑 `margin`、`padding` 和 `border` 的值。

  - **默认情况下：如果没有设定 `float`、`position: absolute` 或 `position: fixed` 等样式，`width: auto` 会使元素的宽度自动调整，以适应其父元素的宽度。换句话说，元素会扩展到填满其包含块的可用宽度（减去 `padding`、`border` 和 `margin` 后的宽度）。**
  - **浮动元素**：对于设置了 `float` 的元素，`width: auto` 会使元素的宽度收缩到内容所需的最小宽度。
  - **绝对定位元素**：对于设置了 `position: absolute` 的元素，`width: auto` 会使元素的宽度取决于其包含块的宽度和其他相关的 CSS 属性（如 `left` 和 `right` 等）。

- 对于替换元素（如 `<img>`、`<video>`、`<iframe>` 等），`width: auto` 的行为会有所不同。

  - **固有尺寸**：替换元素通常有一个固有的尺寸（intrinsic size）。当 `width: auto` 时，这些元素会优先根据它们的固有尺寸进行展示。
  - **包含块的宽度**：如果包含块（即父元素）的宽度有限制，替换元素会根据包含块的宽度进行调整。具体来说，替换元素会在其固有尺寸和包含块宽度之间找到一个平衡点。

总结起来，`width: auto` 的实际行为确实依赖于元素的类型（替换元素或非替换元素）以及元素的上下文（如是否浮动、是否绝对定位等）。这个说法正确并且在大多数情况下能够准确描述 `width: auto` 的行为。

## width: 100% 的行为

- `width: 100%` 意味着元素的宽度将被设置为其包含块的宽度。这会使元素的内容区与父元素的内容区等宽。

- **如果元素有 `padding`、`border` 或 `margin`，这些会额外占用空间，从而可能导致元素的总宽度超过父元素的宽度，造成溢出（overflow）。**

- 如果父元素的宽度发生变化，设置 `width: 100%` 的元素会随之调整，始终保持与父元素等宽。

## 小结

通常情况下（元素非定位元素，且为非替换元素），`100%` 的取值可能会导致元素溢出，而 `auto` 的取值不会导致元素溢出。

## REFERENCES

https://developer.mozilla.org/en-US/docs/Web/CSS/width

https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#calculating_percentage_values_from_the_containing_block

https://forsethingvild.medium.com/the-difference-between-width-auto-and-width-100-a58e2ac7832f