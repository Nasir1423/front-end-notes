/** 问题描述
 * 给定一个长度为 n 的非负整数数组 nums。
 * 假设你最初位于数组的第一个位置（即索引 0），每个元素（nums[i]）代表你在该位置（即索引 i）可以跳跃的最大长度。
 * 举例来说，如果你在索引为 i 处，你可以跳转到任意 i + j 处，同时满足 0 <= j <= nums[i], i + j < n。
 * 你的目标是使用最少的跳跃次数到达数组的最后一个位置（即索引 n - 1）。请返回这个最小的跳跃次数。
 * 注意：1 <= nums.length <= 104, 0 <= nums[i] <= 1000, 题目保证可以到达 nums[n-1]
 * @param nums
 * @example
 * Input nums = [2,3,1,1,4]; Output 2
 * Input nums = [2,3,0,1,4]; Output 2
 */

/**
 * - 贪心策略：这里的贪心在于如何基于当前所在位置 i 选择一个跳跃目标点 next，同时确保这个目标点是局部最优的
 * - next 的局部最优度量：基于 next 可以跳跃的最大位置越大，即 max{i + next + nums[next]} 最大，简化为 max{next + nums[next]}
 * - 这里 1 <= next <= nums[i]
 */
function jump(nums: number[]): number {
  const n = nums.length;

  if (n === 0 || n === 1) return 0; // 表示不用跳跃（不用跳）
  if (nums[0] >= n - 1) return 1; // 表示可以从起始位置直接跳到终点（一步到）
  let skipCount = 0; // 总共跳跃的次数

  // i 表示当前所在位置，j 表示相对于当前所在位置要前进的步数
  // i < nums.length - 1 表示当跳跃到终点后就终止，即 i === nums.length - 1
  // skipCount++ 表示每次跳跃都进行计数，记录跳跃了几步
  for (let i = 0; i < n - 1; skipCount++) {
    const curMaxSteps = nums[i]; // 当前位置可前进的最大步数
    /* 跳跃策略
      1. 如果从当前位置 i 可以直接跳跃到终点 n - 1，则直接跳跃到终点
      2. 否则，进行如下流程，
        从 i + 1, ..., i + curMaxSteps 中选择一个位置 next 作为本次跳跃的终点，
        这里采用贪心策略，即跳跃后的位置 next + 其下一步可跳跃到的位置最远 next + nums[next]，
        即按照 max{next + nums[next]} 来选择下一步要跳跃到的位置
    */
    // 直接跳跃到终点，同时 skipCount++
    if (i + curMaxSteps >= n - 1) {
      i = nums.length - 1; // 表示从当前位置直接跳跃到终点
      continue;
    }
    let next = i + 1; // 表示从当前所在位置 i 要跳跃到的位置

    // 从所有可跳跃到的位置 optNext 中，找到一个 nums[optNext] + optNext 取值最大的，从而符合贪心算法的策略
    for (let j = 1; j <= curMaxSteps && i + j < nums.length; j++) {
      const optNext = i + j; // 表示从当前位置 i 可跳跃到的位置
      if (optNext + nums[optNext] >= next + nums[next]) next = optNext;
    }

    i = next;
  }
  return skipCount;
}

/**
 * - 贪心策略 - 标准版，优化了代码逻辑（简化了对历史信息的利用）、变量命名，增强其可读性
 * - 方法 1 的特点：每次跳跃时直接计算 “最划算” 的跳跃点，即该跳跃点再最大跳跃可以达到最远的位置
 * - 方法 2 的特点：通过 farthest 记录基于每个点的所有可达位置的最远可达位置；通过 currentEnd 记录基于每个点的最远可达位置
 * - 注意，这里说的 “每个点的所有可达位置的最远可达位置” !== “每个点的最远可达位置”
 * - 如 [2, 3, 6, 1] index=0 的所有可达位置为 index=1, 2; 最远可达位置为 index=2；所有可达位置的最远可达位置为 index=2+6=8（虽然没有）
 * - 跳跃边界 farthest 表示到达该位置必须进行跳跃，但是其是参考 farthest 进行跳跃的；
 * - 最远位置 farthest 表示在到达跳跃边界（包含）之前的所有点的最远可达位置，因此可以说包含历史信息
 */
function jump_opt(nums: number[]): number {
  const n = nums.length;

  // 初始化变量
  let jumps = 0; // 表示跳跃次数
  let currentEnd = 0; // 表示跳跃边界（即到该位置必须跳跃）
  let farthest = 0; // 表示最远位置（即每次跳跃的最远可达位置，其包含了前后两次跳跃之间的历史信息）

  // 遍历每一个点，计算 farthest，同时在达到 currentEnd 时进行位置跳跃
  // 跳跃到最后一个位置是终止条件 ==> i === n - 1 ==> i < n - 1
  for (let i = 0; i < n - 1; i++) {
    farthest = Math.max(farthest, i + nums[i]); // 计算两次跳跃之间的所有点的最远可达位置
    // 当到达跳跃边界后，基于 farthest 进行跳跃，即更新跳跃边界
    if (i === currentEnd) {
      currentEnd = farthest; // *更新跳跃边界，即根据贪心算法选择的两次跳跃之间的最优点的最远可达位置，也是跳跃后的最远可达位置
      jumps++; // 增加跳跃次数
      if (currentEnd >= n - 1) break; // 当跳跃后，其跳跃边界超过数组的最后一个元素，则终止（剪枝操作，减少多余的循环）
    }
  }

  return jumps;
}

export function performanceTest() {
  console.time("跳跃游戏Ⅱ - 贪心算法");
  console.log(jump([10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 1, 0]));
  console.timeEnd("跳跃游戏Ⅱ - 贪心算法"); // 2.834
  console.time("跳跃游戏Ⅱ - 贪心算法（标准版）");
  console.log(jump_opt([10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 1, 0]));
  console.timeEnd("跳跃游戏Ⅱ - 贪心算法（标准版）"); // 0.191
}

performanceTest();
