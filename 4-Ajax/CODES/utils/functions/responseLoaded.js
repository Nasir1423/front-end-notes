/* 
    - readyState 是 xhr 对象的属性，取值 0、1、2、3、4 表示不同的状态
        - 0 表示未初始化时
        - 1 表示 open 方法调用完毕
        - 2 表示 send 方法调用完毕
        - 3 表示服务端返回部分结果
        - 4 表示服务端返回全部结果
    - readystatechange 事件共计会触发四次，我们选择 readyState = 4 时再对响应结果进行处理
    - 判断：服务端是否返回了全部结果 => xhr.readyState === 4
    - 判断：响应是否属于成功响应（响应状态码是否为 2xx）=> xhr.status >= 200 && xhr.status < 300
*/
function responseLoaded(xhr) {
    return xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300;
}