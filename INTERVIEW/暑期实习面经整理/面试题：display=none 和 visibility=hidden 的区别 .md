# display: none 和 visibility: hidden 的共性与区别

- **共性**：`display: none` 和 `visibility: hidden` 都是用于设置元素可见性的样式

- **区别**

  - `display: none` 
    - **使元素及其占位完全消失**：**元素及其所有子元素**将从文档流和布局中完全消失，就像它们不存在一样。
    - **触发回流**：这种改变会触发页面上的布局重建，因为其他元素会填补被移除元素的空间。
  - `display: hidden` 修饰的元素不可见，但**还在文档流**中。元素的隐藏可以理解为加上了一层使元素不可见的遮罩，不会触发元素回流，页面布局不变。
    - **使元素不可见，但保留其占位**：元素仍然占据文档流中的空间，但不会被显示。
    - **不触发回流**：这意味着其他元素会围绕隐藏的元素布局，不会发生重建布局的情况。

- 代码效果演示（对 Parent 元素上样式）

  - 页面原始布局

    <img src="https://cdn.jsdelivr.net/gh/Nasir1423/blog-img@main/image-20240529171854784.png" alt="image-20240529171854784" style="width:30%;" />

  - `display: none` 之后的布局

    <img src="https://cdn.jsdelivr.net/gh/Nasir1423/blog-img@main/image-20240529171937557.png" alt="image-20240529171937557" style="width:30%;" />

  - `visibility: hidden` 之后的布局

    <img src="https://cdn.jsdelivr.net/gh/Nasir1423/blog-img@main/image-20240529172011001.png" alt="image-20240529172011001" style="width:30%;" />