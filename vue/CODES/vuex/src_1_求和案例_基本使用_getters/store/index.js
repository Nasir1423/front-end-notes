import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex); // 只有使用插件 Vuex 后才可以创建 store 对象，否则会报错

// 用于响应组件中用户的动作
const actions = {
  incr_d(context, value) {
    context.commit("INCR_D", value);
  },
  decr_d(context, value) {
    context.commit("DECR_D", value);
  },
  incr_d_when_odd(context, value) {
    if (context.state.sum % 2) {
      context.commit("INCR_D", value);
    }
  },
  incr_d_after_wait(context, value) {
    setTimeout(() => {
      context.commit("INCR_D", value);
    }, 500);
  },
};

// 用于修改 state 中的数据
const mutations = {
  INCR_D(state, value) {
    state.sum += value;
  },
  DECR_D(state, value) {
    state.sum -= value;
  }
};

// 保存具体的数据
const state = {
  sum: 0
};

// 用于存储计算后的共享数据
const getters = {
  sumMultipliedBy10(state) {
    return state.sum * 10
  }
}

/* 创建并暴露 Vuex 中的 store 对象 */
export default new Vuex.Store({ actions, mutations, state, getters });