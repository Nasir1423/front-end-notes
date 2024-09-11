// 贪吃蛇
const snake = document.getElementById('snake');
// 食物
const food = document.getElementById('food');
// 移动方向
let direction;
// 合法方向
const validDirections = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
// 合法方向的反方向（可以通过一个合法方向获取其反方向）
const counterDirection = {
    ArrowUp: 'ArrowDown',
    ArrowDown: 'ArrowUp',
    ArrowLeft: 'ArrowRight',
    ArrowRight: 'ArrowLeft',
};
// 键盘是否启用
let keyboardEnabled = true;
// 定时器时间间隔
let timeInterval = 420;
// 分数和等级 span
let scoreSpan = document.getElementById('score');
let levelSpan = document.getElementById('performance');
let score = 0;
let level = 0;

// 辅助函数：在游戏视口中生成一个食物坐标
/**
 * @description as
 * @param {Array} min min[0], min[1] 分别表示视口 x 方向，y 方向的最小值
 * @param {Array} max max[0], max[1] 分别表示视口 x 方向，y 方向的最大值
 * @param {Number} size 表示每个食物的大小，单位为 px
 * @param {Number} number 表示生成食物的数量
 * @returns {Array} 多维数组，表示生成的食物的坐标，foods[i][0]，foods[i][1] 表示第 i 个食物的 x 坐标，y 坐标
 */
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

// 随机生成食物
clearAndGenerateFoodPositions();

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

// 开启定时器（游戏开始）
toggleGameState();