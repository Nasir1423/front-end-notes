import { reactive, onMounted, onBeforeUnmount } from "vue"
export default function () {
    // 数据点
    const point = reactive({ x: 0, y: 0 });

    // 更新数据点
    function getPointPosition(event) {
        point.x = event.pageX;
        point.y = event.pageY;
        console.log(`(${point.x}, ${point.y})`);
    }

    // 给文档对象绑定点击事件，用于更新数据点位置
    onMounted(() => {
        document.addEventListener("click", getPointPosition);
    });

    // 给文档对象解绑点击事件（注意，绑定和解绑时必须传入同一回调函数）
    onBeforeUnmount(() => {
        document.removeEventListener("click", getPointPosition);
    });

    return point
}