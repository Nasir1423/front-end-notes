`async` 和 `await` 是 JavaScript 中用于处理异步操作的关键字，帮助我们以更直观的方式编写异步代码，避免了回调地狱和繁琐的 `.then` 链式调用。

### `async` 函数

`async` 函数是声明一个异步函数的方式。它的语法如下：

```javascript
async function myFunction() {
  // 函数体
}
```

或者使用箭头函数语法：

```javascript
const myFunction = async () => {
  // 函数体
}
```

#### `async` 函数返回什么？

一个 `async` 函数总是返回一个 `Promise` 对象。如果函数内部返回一个值，该值会被自动包装成一个已解决的 `Promise`。例如：

```javascript
async function myFunction() {
  return 'Hello';
}

myFunction().then(value => console.log(value)); // 输出: Hello
```

如果函数内部抛出一个错误，该错误会导致返回的 `Promise` 被拒绝：

```javascript
async function myFunction() {
  throw new Error('Something went wrong');
}

myFunction().catch(error => console.log(error)); // 输出: Error: Something went wrong
```

### `await` 关键字

`await` 关键字只能在 `async` 函数内部使用，用于等待一个 `Promise` 被解决或拒绝。它会暂停函数的执行，直到 `Promise` 解决，然后返回 `Promise` 的解决值。语法如下：

```javascript
const result = await someAsyncFunction();
```

#### `await` 的优点

1. **可读性和维护性提高**：`await` 使异步代码看起来像同步代码，更容易理解和维护。

2. **避免回调地狱**：通过 `await`，我们可以用更少的嵌套来处理多个异步操作，代码更加平坦和清晰。

3. **顺序执行**：`await` 使得我们能够顺序执行异步操作，简化了处理依赖关系的逻辑。例如，如果第二个异步操作依赖于第一个异步操作的结果，可以这样写：

   ```javascript
   async function sequentialOperations() {
     const result1 = await firstAsyncOperation();
     const result2 = await secondAsyncOperation(result1);
     return result2;
   }
   ```

### 示例

下面是一个使用 `async` 和 `await` 的实际例子：

```javascript
function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === 'validUrl') {
        resolve('Fetched data');
      } else {
        reject('Invalid URL');
      }
    }, 1000);
  });
}

async function getData() {
  try {
    const data = await fetchData('validUrl');
    console.log(data); // 输出: Fetched data
  } catch (error) {
    console.log(error);
  }
}

getData();
```

在这个示例中，`fetchData` 函数返回一个 `Promise`，`getData` 函数使用 `async` 声明，内部使用 `await` 等待 `fetchData` 的结果。如果 `fetchData` 成功，`data` 变量会包含返回的数据；如果失败，错误会被捕获并处理。

总结，`async` 和 `await` 提供了一种更简洁和更直观的方式来处理异步操作，使得代码更易读，更易于维护。

---

### async 和 await 的使用

`async` 和 `await` 是 JavaScript 中用于处理异步操作的现代语法糖，它们使得异步代码看起来更像同步代码，从而简化了异步编程。

#### async 关键字

`async` 关键字用于声明一个异步函数。当一个函数被标记为 `async` 时，它将返回一个 Promise 对象，即使函数体中没有明确地返回任何值。

```javascript
async function fetchUserData() {
  const response = await fetch('https://api.example.com/user');
  const data = await response.json();
  return data;
}
```

#### await 关键字

`await` 关键字只能在 `async` 函数内部使用，用于等待一个 Promise 结果。`await` 后面的表达式如果是一个 Promise，那么 `await` 会等待该 Promise 结算（即 resolved 或 rejected）。如果 `await` 后面的表达式不是一个 Promise，那么它会立即返回结果。

```javascript
async function main() {
  const result = await someAsyncFunction();
  console.log(result);
}
```

#### async 返回值

- 如果 `async` 函数中没有任何返回语句，或者返回了一个非 Promise 值，那么该函数返回的是一个解析状态的 Promise。
- 如果 `async` 函数中返回了一个 Promise，那么这个 Promise 将会被 `async` 函数返回的 Promise 所代理。
- 如果 `async` 函数中抛出了一个错误，那么返回的 Promise 将变为拒绝状态，并且错误作为拒绝原因被捕获。

```javascript
// 没有返回值的情况
async function noReturn() {}
console.log(noReturn()); // Promise { <resolved>: undefined }

// 返回非 Promise 值
async function returnNumber() {
  return 42;
}
console.log(returnNumber()); // Promise { <resolved>: 42 }

// 抛出错误
async function throwError() {
  throw new Error('Something went wrong!');
}
console.log(throwError()); // Promise { <rejected>: Error: Something went wrong! }
```

#### 使用 await 的优点

1. **可读性**: `await` 使异步代码看起来更像同步代码，提高了代码的可读性和理解性。
2. **错误处理**: 使用 `try...catch` 可以优雅地处理 Promise rejections，使得错误处理更加直观。
3. **链式调用**: 可以在一个 `async` 函数中顺序地使用多个 `await` 调用，这比传统的 Promise 链接更加简洁和易于维护。
4. **性能**: `await` 允许你编写延迟执行的代码，这样可以避免回调地狱（Callback Hell），提高代码性能和响应速度。