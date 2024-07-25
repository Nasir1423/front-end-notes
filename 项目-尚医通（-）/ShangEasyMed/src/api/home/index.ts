/* 统一管理首页路由组件的接口 */
import request from "@/utils/request";

enum API {
    /* 获取医院数据的分页列表：/api/hosp/hospital/{page}/{limit} */
    HOSPITAL_LIST = "/hosp/hospital"
}

function getHospitalList(page: number, limit: number) {
    return request.get(`${API.HOSPITAL_LIST}/${page}/${limit}`);
}

export { getHospitalList };