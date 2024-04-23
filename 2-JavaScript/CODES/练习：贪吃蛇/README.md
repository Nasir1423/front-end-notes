# 贪吃蛇思路分析
## 按键事件
1. 按键事件分为
    - `keydown` 表示按键按下
    - `keyup` 表示按键松开
2. 可绑定对象
    - 可以获取焦点的元素，如 `<input type='text'>`
    - `document` 元素
3. 绑定语法（以 `document` 为例）
    ```javascript
    document.addEventListener('keydown', (event) => {
        /*
            对于 keydown 事件，响应函数中我们可以通过事件对象获取按键信息（用户按的是那个案件）
                - event.keyCode 键的编码
                - event.key 键的字符串名（推荐使用）
        */
    })
    ```

## 贪吃蛇头移动的实现
```javascript
document.addEventListener('keydown', (event) => {
    let key = event.key; // 获取用户按下的按键

    // 根据按键进行移动，每次位移 10px
    switch (key) {
        case 'ArrowUp':
            snakeHead.style.top =
                parseFloat(getComputedStyle(snakeHead).top)
                - 10 + 'px';
            break;
        case 'ArrowDown':
            snakeHead.style.top =
                parseFloat(getComputedStyle(snakeHead).top)
                + 10 + 'px';
            break;
        case 'ArrowLeft':
            snakeHead.style.left =
                parseFloat(getComputedStyle(snakeHead).left)
                - 10 + 'px';
            break;
        case 'ArrowRight':
            snakeHead.style.left =
                parseFloat(getComputedStyle(snakeHead).left)
                + 10 + 'px';
            break;
    }
})
```
> **不足之处-1**：贪吃蛇**不能流畅地移动、不能一直移动**
> 
> **原因**：如果一直按着按键，按键的 `keydown` 事件会持续触发，但是第一次触发和第二次触发的间隔较长，导致不流畅的移动；此外，每次触发 `keydown` 事件后贪吃蛇才会移动，如果不触发则不移动，导致不能一直移动
> 
> **解决方案**：实时记录触发 `keydown` 事件的按键对应的移动方向；设置**定时器**，每间隔一段时间，利用当前的移动方向进行实际移动；即：移动方向的记录是实时的，但是实际移动是有间隔的
 
> **不足之处-2**：贪吃蛇**可能会停止移动**
> 
> **原因**：当用户按下除了上下左右之外的其他按键时，此时贪吃蛇获得一个非法方向而无法继续移动
> 
> **解决方案**：每次更新贪吃蛇移动方向时需要进行检查，只有用户按下上下左右四个按键时，才改变移动方向，否则不修改

```javascript
// 移动方向
let direction;
// 合法方向
const validDirections = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']

// 辅助函数：向全局变量 direction 指定的方向移动 10px
function updatePosition() {
    switch (direction) {
        case 'ArrowUp':
            snakeHead.style.top =
                parseFloat(getComputedStyle(snakeHead).top)
                - 10 + 'px';
            break;
        case 'ArrowDown':
            snakeHead.style.top =
                parseFloat(getComputedStyle(snakeHead).top)
                + 10 + 'px';
            break;
        case 'ArrowLeft':
            snakeHead.style.left =
                parseFloat(getComputedStyle(snakeHead).left)
                - 10 + 'px';
            break;
        case 'ArrowRight':
            snakeHead.style.left =
                parseFloat(getComputedStyle(snakeHead).left)
                + 10 + 'px';
            break;
    }
}

// 辅助函数：切换定时器状态，对应游戏的开始或结束
const toggleGameState = (function () {
    let timer;

    return () => {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        } else {
            timer = setInterval(updatePosition, 400);
        }
    }
}());

// 给文档节点的 keydown 事件绑定响应函数，实时更新贪吃蛇的移动方向
document.addEventListener('keydown', (event) => {
    if (validDirections.includes(event.key)) { // 检查按键的合法性
        direction = event.key; // 实时更新移动方向
    }
})

// 开启定时器（游戏开始）
toggleGameState();
```

### 食物碰撞检测
1. 如何检测蛇与食物相遇：**移动后的蛇头坐标是否等于食物坐标**
2. 相遇之后应该进行什么操作
   - 删除被蛇吃掉的食物
   - 如果此时游戏视口中没有食物，则需要随机在合法的位置生成一定数量的食物
   - 蛇的身体长度加 `1`

> **待考虑问题**：如何让蛇的身体一起移动？
> 
> **解决方案-1**：在每次移动时，蛇的身体除了蛇头以外，都会向前移动一个单位，即第 `k` 节身体会移动到第 `k-1` 节身体的位置。为了实现这一操作，可以采取一种简单的方法：从蛇的尾部开始，依次更新每一节身体的位置，直到蛇的头部。而蛇的头部位置则根据用户输入的移动方向进行更新。这种方法的不足之处是：`DOM` 操作过多。
> 
> **解决方案-2**：通过比较蛇在两次移动前后的状态，我们可以观察到只有两节身体位置不重叠，即移动之前的蛇尾和移动之后的蛇头。因此，我们可以简单地在每次移动时将蛇尾更新为蛇头的位置，并确保其位于正确的位置。这种方法的优点在于：`DOM` 操作少，性能更好。

> **待考虑问题**：蛇的身体长度加 `1` 后，如何设置新增加身体的坐标？
>
> **解决方案**：采用与让蛇身体移动时相同的逻辑（**解决方案-2**），将新增加的身体作为蛇尾，而蛇下一步移动的位置则是食物的位置。因此，我们将蛇尾的位置设置为食物的位置，并将蛇尾更新为蛇头即可。

```javascript
// 辅助函数：在游戏视口中生成一个食物坐标
function generateFoodPositions(viewportMin = [0, 0], viewportMax = [290, 290], size = 10, number = 1) {
    const foods = []; // 食物坐标数组
    let minNormalizedX = viewportMin[0] / size; // 除以 size 之后的最小 x 坐标
    let minNormalizedY = viewportMin[1] / size; // 除以 size 之后的最小 y 坐标
    let maxNormalizedX = viewportMax[0] / size; // 除以 size 之后的最大 x 坐标
    let maxNormalizedY = viewportMax[1] / size; // 除以 size 之后的最大 y 坐标
    let randomNormalizedX, randomNormalizedY; // 除以 size 之后的食物坐标
    let randomX, randomY; // 食物坐标
    for (let i = 0; i < number; i++) {
        randomNormalizedX = Math.floor(Math.random() * (maxNormalizedX - minNormalizedX + 1)) + minNormalizedX;
        randomNormalizedY = Math.floor(Math.random() * (maxNormalizedY - minNormalizedY + 1)) + minNormalizedY;
        randomX = randomNormalizedX * size;
        randomY = randomNormalizedY * size;
        foods.push([randomX, randomY]);
    }
    return foods;
}

// 辅助函数：清除游戏视口的食物，并且重新生成食物
function clearAndGenerateFoodPositions() {
    let [foodNewX, foodNewY] = generateFoodPositions()[0];
    food.style.left = foodNewX + 'px';
    food.style.top = foodNewY + 'px';
}

// 辅助函数：向全局变量 direction 指定的方向移动 10px
function updatePosition() {
    // 蛇头
    let snakeHead = snake.firstElementChild;
    // 移动前后的坐标（数值）
    let currentX = parseFloat(getComputedStyle(snakeHead).left);
    let currentY = parseFloat(getComputedStyle(snakeHead).top);
    let movedX = currentX;
    let movedY = currentY;

    // 创建移动后的坐标（数值）
    switch (direction) {
        case 'ArrowUp':
            movedY = currentY - 10;
            break;
        case 'ArrowDown':
            movedY = currentY + 10;
            break;
        case 'ArrowLeft':
            movedX = currentX - 10;
            break;
        case 'ArrowRight':
            movedX = currentX + 10;
            break;
    }

    // 食物碰撞检测
    let foodX = parseFloat(getComputedStyle(food).left);
    let foodY = parseFloat(getComputedStyle(food).top);
    if (movedX === foodX && movedY === foodY) { // 碰撞检测
        // 删除被吃掉的食物，并且生成新的食物
        clearAndGenerateFoodPositions();
        // 蛇身体长度加 1
        let snakeSegment = document.createElement('div');
        snake.appendChild(snakeSegment);
    }

    // 蛇的移动
    // 1. 先获取蛇尾
    let snakeTail = snake.lastElementChild;
    // 2. 更新蛇尾的位置为贪吃蛇即将前进的位置
    snakeTail.style.left = movedX + 'px';
    snakeTail.style.top = movedY + 'px';
    // 3. 将蛇尾作为蛇头
    snake.insertAdjacentElement('afterbegin', snakeTail);
}
```

## 禁止掉头
1. 什么叫做掉头？移动方向由左变右，由上变下，由右变左，由下变上
2. 什么时候禁止掉头？如果贪吃蛇长度为 1，则允许掉头，否则禁止掉头
3. 如何实现禁止调头？比对当前方向和用户传进的合法方向，如果符合掉头判定，则不予更改方向

```javascript
// 合法方向的反方向（可以通过一个合法方向获取其反方向）
const counterDirection = {
    ArrowUp: 'ArrowDown',
    ArrowDown: 'ArrowUp',
    ArrowLeft: 'ArrowRight',
    ArrowRight: 'ArrowLeft',
};

// 给文档节点的 keydown 事件绑定响应函数，实时更新贪吃蛇的移动方向
document.addEventListener('keydown', (event) => {
    if (validDirections.includes(event.key)) { // 检查按键的合法性
        if (snake.getElementsByTagName('div').length < 2
            || counterDirection[event.key] !== direction) { // 检查方向的合法性：禁止掉头
            direction = event.key; // 实时更新移动方向
        }
    }
});
```

> 不足之处：假设当前贪吃蛇向右移动，而用户快速按下 ↓ ←，如果这个时间比定时器设定的时间间隔还短，则记录移动方向的全局变量 direction 会先变为 'ArrowDown'，再变为 'ArrowLeft'，从而实现了贪吃蛇的掉头行为。
> 原因分析：定时器使得贪吃蛇每隔一段时间移动一次，然而，方向却可以即时改变。在两次移动之间的间隙内，玩家可以改变方向多次。因此，尽管我们设定了不允许连续两次方向相反的逻辑，但在这一时间段内，贪吃蛇的方向可以在第一次和最后一次改变时发生相反。这符合代码逻辑，但违背了游戏逻辑。
> 解决方案：由于这个 bug 是由定时器引起的，我们选择从定时器这一部分入手修复。我们通过设置一个布尔变量 keyboardEnabled 来控制是否允许修改 direction 变量。当我们修改了 direction 后，我们将 keyboardEnabled 设为 false，这样用户就无法通过键盘再次修改 direction。当定时器中的代码执行完毕后，我们将 keyboardEnabled 设为 true，这时用户就可以再次修改 direction。通过这种方式，我们可以确保禁止了玩家的反向操作，因为只有在定时器中的代码执行完毕后，才能修改 direction，而且仅限修改一次！

```javascript
// 键盘是否启用
let keyboardEnabled = true;

// 给文档节点的 keydown 事件绑定响应函数，实时更新贪吃蛇的移动方向
document.addEventListener('keydown', (event) => {
    if (keyboardEnabled && validDirections.includes(event.key)) { // 检查按键的合法性
        if (snake.getElementsByTagName('div').length < 2
            || counterDirection[event.key] !== direction) { // 检查方向的合法性：禁止掉头
            direction = event.key; // 实时更新移动方向
            keyboardEnabled = false;
        }
    }
});

// 辅助函数：向全局变量 direction 指定的方向移动 10px
function updatePosition() {
    // 蛇头
    let snakeHead = snake.firstElementChild;
    // 移动前后的坐标（数值）
    let currentX = parseFloat(getComputedStyle(snakeHead).left);
    let currentY = parseFloat(getComputedStyle(snakeHead).top);
    let movedX = currentX;
    let movedY = currentY;

    // 创建移动后的坐标（数值）
    switch (direction) {
        case 'ArrowUp':
            movedY = currentY - 10;
            break;
        case 'ArrowDown':
            movedY = currentY + 10;
            break;
        case 'ArrowLeft':
            movedX = currentX - 10;
            break;
        case 'ArrowRight':
            movedX = currentX + 10;
            break;
    }

    // 食物碰撞检测
    let foodX = parseFloat(getComputedStyle(food).left);
    let foodY = parseFloat(getComputedStyle(food).top);
    if (movedX === foodX && movedY === foodY) { // 碰撞检测
        // 删除被吃掉的食物，并且生成新的食物
        clearAndGenerateFoodPositions();
        // 蛇身体长度加 1
        let snakeSegment = document.createElement('div');
        snake.appendChild(snakeSegment);
    }

    // 蛇的移动
    // 1. 先获取蛇尾
    let snakeTail = snake.lastElementChild;
    // 2. 更新蛇尾的位置为贪吃蛇即将前进的位置
    snakeTail.style.left = movedX + 'px';
    snakeTail.style.top = movedY + 'px';
    // 3. 将蛇尾作为蛇头
    snake.insertAdjacentElement('afterbegin', snakeTail);

    keyboardEnabled = true;
}
```

## 终止界定

1. 游戏终止条件是什么？
   - 撞墙
   - 咬到自己
2. 撞墙的界定方式：每次移动时，判断下一个位置是不是墙面，是则终止游戏
3. 咬到自己的界定方式：每次移动时，将下一个位置与贪吃蛇身体的所有部分对比，看有没有相同的，如果有，则终止游戏

> **不足之处**：在判断贪吃蛇是否咬到自己时，忽略了一种情况，即如果下一个位置与贪吃蛇蛇尾相同，那么是不会咬到的
> **改进方式**：每次移动时，**将下一个位置与贪吃蛇除了蛇尾的其他身体部分对比**，看有没有相同的，如果有，则终止游戏

```javascript
// 辅助函数：判断贪吃蛇有没有撞墙，即碰到游戏视口
function isHitWall(nextPosition, viewportMin = [0, 0], viewportMax = [290, 290]) {
    let [x, y] = nextPosition;
    if (x < viewportMin[0] || x > viewportMax[0]
        || y < viewportMin[1] || y > viewportMax[1]) {
        return true;
    }
    return false;
}

// 辅助函数：判断贪吃蛇有没有咬到自己
function isBiteItself(nextPosition) {
    let [x, y] = nextPosition;
    const snakeSegments = snake.getElementsByTagName('div');
    // 遍历除了蛇尾以外的其他身体部分
    for (let i = 0; i < snakeSegments.length - 1; i++) {
        segmentX = snakeSegments[i].style.left;
        segmentY = snakeSegments[i].style.top;

        if (segmentX === x && segmentY === y) {
            return true;
        }
    }
    return false;
}

// 辅助函数：向全局变量 direction 指定的方向移动 10px
function updatePosition() {
    // 蛇头
    let snakeHead = snake.firstElementChild;
    // 移动前后的坐标（数值）
    let currentX = parseFloat(getComputedStyle(snakeHead).left);
    let currentY = parseFloat(getComputedStyle(snakeHead).top);
    let movedX = currentX;
    let movedY = currentY;

    // 创建移动后的坐标（数值）
    switch (direction) {
        case 'ArrowUp':
            movedY = currentY - 10;
            break;
        case 'ArrowDown':
            movedY = currentY + 10;
            break;
        case 'ArrowLeft':
            movedX = currentX - 10;
            break;
        case 'ArrowRight':
            movedX = currentX + 10;
            break;
    }

    // 游戏停止判断
    // 撞墙判断
    let isHit = isHitWall([movedX, movedY]);
    if (isHit) {
        toggleGameState();
        alert('You hit the wall, game over!');
        return;
    }
    // 是否咬到自己判断
    let isBite = isBiteItself([movedX, movedY]);
    if (isBite) {
        toggleGameState();
        alert('You bite yourself, game over!');
        return;
    }


    // 食物碰撞检测
    let foodX = parseFloat(getComputedStyle(food).left);
    let foodY = parseFloat(getComputedStyle(food).top);
    if (movedX === foodX && movedY === foodY) { // 碰撞检测
        // 删除被吃掉的食物，并且生成新的食物
        clearAndGenerateFoodPositions();
        // 蛇身体长度加 1
        let snakeSegment = document.createElement('div');
        snake.appendChild(snakeSegment);
    }

    // 蛇的移动
    // 1. 先获取蛇尾
    let snakeTail = snake.lastElementChild;
    // 2. 更新蛇尾的位置为贪吃蛇即将前进的位置
    snakeTail.style.left = movedX + 'px';
    snakeTail.style.top = movedY + 'px';
    // 3. 将蛇尾作为蛇头
    snake.insertAdjacentElement('afterbegin', snakeTail);

    keyboardEnabled = true;
}
```

## 分数和等级

1. 分数：每吃到一个食物，则分数加 `1`
2. 等级
    - 每吃到 `10` 个食物，则等级加 `1`
    - 通过模运算实现等级的递增 `分数 % 10`
    - 等级与定时器时间间隔之间的关系为 `timeInterval = 420 - level * 20`
    - 因为时间间隔不能小于等于 `0`，因此 `level >= 20`
3. 初始情况：分数和等级都为 `0`

```javascript
// 定时器时间间隔
let timeInterval = 420;
// 分数和等级 span
let scoreSpan = document.getElementById('score');
let levelSpan = document.getElementById('performance');
let score = 0;
let level = 0;
// 辅助函数：向全局变量 direction 指定的方向移动 10px
function updatePosition() {
    // 蛇头
    let snakeHead = snake.firstElementChild;
    // 移动前后的坐标（数值）
    let currentX = parseFloat(getComputedStyle(snakeHead).left);
    let currentY = parseFloat(getComputedStyle(snakeHead).top);
    let movedX = currentX;
    let movedY = currentY;

    // 创建移动后的坐标（数值）
    switch (direction) {
        case 'ArrowUp':
            movedY = currentY - 10;
            break;
        case 'ArrowDown':
            movedY = currentY + 10;
            break;
        case 'ArrowLeft':
            movedX = currentX - 10;
            break;
        case 'ArrowRight':
            movedX = currentX + 10;
            break;
    }

    // 游戏停止判断
    // 撞墙判断
    let isHit = isHitWall([movedX, movedY]);
    if (isHit) {
        toggleGameState();
        alert('You hit the wall, game over!');
        return;
    }
    // 是否咬到自己判断
    let isBite = isBiteItself([movedX, movedY]);
    if (isBite) {
        toggleGameState();
        alert('You bite yourself, game over!');
        return;
    }

    // 食物碰撞检测
    let foodX = parseFloat(getComputedStyle(food).left);
    let foodY = parseFloat(getComputedStyle(food).top);
    if (movedX === foodX && movedY === foodY) { // 碰撞检测
        // 删除被吃掉的食物，并且生成新的食物
        clearAndGenerateFoodPositions();
        // 蛇身体长度加 1
        let snakeSegment = document.createElement('div');
        snake.appendChild(snakeSegment);
        // 分数计算
        score++;
        scoreSpan.textContent = score;
        // 等级计算
        if (score % 10 === 0 && level <= 20) {
            level++;
            levelSpan.textContent = level;
            timeInterval -= 20;
        }
    }

    // 蛇的移动
    // 1. 先获取蛇尾
    let snakeTail = snake.lastElementChild;
    // 2. 更新蛇尾的位置为贪吃蛇即将前进的位置
    snakeTail.style.left = movedX + 'px';
    snakeTail.style.top = movedY + 'px';
    // 3. 将蛇尾作为蛇头
    snake.insertAdjacentElement('afterbegin', snakeTail);

    keyboardEnabled = true;
}

// 辅助函数：切换定时器状态，对应游戏的开始或结束
const toggleGameState = (function () {
    let timer;

    return () => {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        } else {
            timer = setTimeout(function move() {
                updatePosition(direction);
                if (timer) {
                    timer = setTimeout(move, timeInterval);
                }
            }, timeInterval);
        }
    }
}());
```