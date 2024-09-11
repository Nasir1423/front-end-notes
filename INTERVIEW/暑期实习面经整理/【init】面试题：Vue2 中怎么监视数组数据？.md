在 Vue 2 中，可以通过重写数组方法来实现对数组数据的监视。Vue 2 使用的是响应式系统来监视对象和数组的变化。对于数组，Vue 会劫持数组的一些常用方法来实现对数组的监视，比如 `push`、`pop`、`shift`、`unshift`、`splice`、`sort` 和 `reverse`。

以下是实现原理以及示例代码：

### 实现原理
Vue 2 使用 `Object.defineProperty` 方法来劫持对象属性的访问器描述符，实现对数据变化的响应式监听。对于数组，Vue 覆盖了数组的原型方法，从而在这些方法被调用时触发视图更新。

### 示例代码

1. **定义一个用于重写数组方法的函数**：

```javascript
const arrayProto = Array.prototype;
const arrayMethods = Object.create(arrayProto);

['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(method => {
  const original = arrayProto[method];
  Object.defineProperty(arrayMethods, method, {
    value: function mutator(...args) {
      const result = original.apply(this, args);
      const ob = this.__ob__;
      let inserted;
      switch (method) {
        case 'push':
        case 'unshift':
          inserted = args;
          break;
        case 'splice':
          inserted = args.slice(2);
          break;
      }
      if (inserted) ob.observeArray(inserted);
      ob.dep.notify();
      return result;
    },
    enumerable: false,
    writable: true,
    configurable: true
  });
});
```

2. **在 Vue 观察者中使用这些重写的方法**：

```javascript
function defineReactive(obj, key, val) {
  const dep = new Dep();
  let childOb = observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
        }
      }
      return val;
    },
    set: function reactiveSetter(newVal) {
      if (newVal === val) return;
      val = newVal;
      childOb = observe(newVal);
      dep.notify();
    }
  });
}

function observe(value) {
  if (typeof value !== 'object' || value === null) return;
  let ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else {
    ob = new Observer(value);
  }
  return ob;
}

class Observer {
  constructor(value) {
    this.value = value;
    this.dep = new Dep();
    Object.defineProperty(value, '__ob__', {
      value: this,
      enumerable: false,
      writable: true,
      configurable: true
    });
    if (Array.isArray(value)) {
      value.__proto__ = arrayMethods;
      this.observeArray(value);
    } else {
      this.walk(value);
    }
  }

  walk(obj) {
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i], obj[keys[i]]);
    }
  }

  observeArray(items) {
    for (let i = 0, l = items.length; i < l; i++) {
      observe(items[i]);
    }
  }
}

class Dep {
  constructor() {
    this.subs = [];
  }

  addSub(sub) {
    this.subs.push(sub);
  }

  removeSub(sub) {
    remove(this.subs, sub);
  }

  depend() {
    if (Dep.target) {
      Dep.target.addDep(this);
    }
  }

  notify() {
    const subs = this.subs.slice();
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update();
    }
  }
}
```

以上代码展示了 Vue 2 中对数组方法进行重写的核心逻辑。通过这些重写的方法，当数组发生变化时，可以触发相应的观察者，进而更新视图。