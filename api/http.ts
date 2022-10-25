/**axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import axios, { AxiosRequestConfig } from "axios";
import QS from "qs";
import { ElNotification } from "element-plus";
import { BASE_URL } from "~~/config/default";

/**
 * 创建axios实例
 */
export const service = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 请求超时时间
  headers: {
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
  },
  withCredentials: false, // 凭证
});

/**
 * 请求前拦截
 */
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // 设置请求头
    if (config.method?.toUpperCase() == "POST") {
      config.data = QS.stringify({
        ...config.data,
      });
    }
    if (config.method?.toUpperCase() == "PUT") {
      config.headers = { "Content-Type": "application/json; charset=utf-8" };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * 响应拦截器
 */
service.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      if (response.data.success) {
        return Promise.resolve(response.data);
      } else {
        ElNotification({
          title: "请求异常",
          message: response.data.errorMessage,
        });
        return Promise.reject(response.data);
      }
    }
    ElNotification({
      title: "请求异常",
      message: "接收数据失败",
    });
    return Promise.reject(response.data);
  },
  // 响应状态码不是200的情况
  (error) => {
    if (error && error.response && error.response.status) {
      ElNotification({
        title: "请求异常",
        message: error.response.data.errorMessage,
      });
      return Promise.reject(error.response.data);
    } else {
      ElNotification({
        title: "请求异常",
        message: `网络链接失败${error}`,
      });
      return Promise.reject(error.response);
    }
  }
);
