/* axios 的二次封装 */
/* 讨论：对 axios 二次封装的好处是什么？
    - 统一管理请求配置：可以在一个地方集中管理请求的基础配置，如请求的 baseURL、超时时间、默认头信息等，避免在每个请求中重复配置，
    提高代码的可维护性。
    - 处理请求和响应拦截器：通过统一设置请求和响应拦截器，可以在所有请求前进行统一处理（如添加认证信息、修改请求数据格式等），以及
    在响应后进行统一处理（如全局错误处理、数据格式化等）。
    - 简化接口调用：可以根据项目的具体需求，对常用的接口进行封装，使接口调用更加简单直观，减少重复代码。例如，封装常用的 GET、POST 
    请求，使得调用时只需传入必要的参数。
    - 错误处理和异常捕获：可以在封装的过程中统一处理错误和异常，根据不同的错误类型采取不同的处理方式，如跳转到登录页、弹出错误提示
    等，提升用户体验。
    - 自动处理 Token：统一在请求头中携带认证 Token，或在响应中自动更新 Token，简化用户的认证处理流程，提高安全性。
    - 全局加载状态管理：可以在请求开始和结束时触发全局的加载状态，方便在界面上展示请求的进度和状态，提升用户体验。
    - 封装业务逻辑：可以将与业务相关的逻辑封装在请求中，例如根据业务需要对请求参数或响应数据进行处理，保持业务代码的简洁和清晰。
*/

import axios from "axios"
import { ElMessage } from "element-plus";

/* 创建 axios 实例对象 */
const request = axios.create({
    baseURL: "/api", // 请求基础路径
    timeout: 5000 // 请求超时时间
});

/* 配置请求拦截器 */
request.interceptors.request.use((config) => {
    return config
}, (error) => {
    return Promise.reject(error);
});

/* 配置响应拦截器 */
request.interceptors.response.use((response) => {
    /* 这里进行数据简化 */
    response.data = response.data.data;
    return response;
}, (error) => {
    /* 这里处理 http 网络错误（非 2xx 范围的状态码都会触发该错误） */
    const { response } = error;
    if (response) {
        // 服务器有响应的错误
        const { status, data } = response;
        let message = '';

        switch (status) {
            case 400:
                message = data.message || '请求错误';
                break;
            case 401:
                message = data.message || '未授权，请登录';
                break;
            case 403:
                message = data.message || '拒绝访问';
                break;
            case 404:
                message = data.message || '请求地址出错';
                break;
            case 500:
                message = data.message || '服务器内部错误';
                break;
            default:
                message = data.message || '未知错误';
        }

        // 使用 ElMessage 显示错误信息
        ElMessage({
            message,
            type: "error"
        })
    } else {
        // 服务器没有响应的错误（网络问题等）
        ElMessage({
            message: "网络连接错误，请稍后再试",
            type: "error"
        })
    }

    return Promise.reject(error);
});

export default request;