import { AxiosPromise } from "axios";
import { service } from "./http";
import {
  IMessage,
  IPage,
  IProductListParams,
  IGetNewsList,
  IView,
} from "./typing";

const type = "web";

export const getProductCategory = (
  params: { type: string } = { type: "product" }
): AxiosPromise => {
  return service({
    params: params,
    url: "/product/getCategoryList",
    method: "GET",
  });
};

export const getNewsById = (id: number): AxiosPromise => {
  return service({
    params: { id },
    url: "/news/get_by_id",
    method: "GET",
  });
};

export const getNewsCategory = (): AxiosPromise => {
  return service({
    url: "/news/getCategoryList",
    method: "GET",
  });
};

export const getNewsList = (params: IGetNewsList): AxiosPromise => {
  return service({
    params: params,
    url: "/news/get",
    method: "GET",
  });
};

export const getCarousel = (): AxiosPromise => {
  return service({
    params: {
      type,
    },
    url: "/carousel/get",
    method: "GET",
  });
};

export const getHomeProduct = (): AxiosPromise => {
  return service({
    params: {
      type,
    },
    url: "/home/getProduct",
    method: "GET",
  });
};

export const getHomeCase = (): AxiosPromise => {
  return service({
    params: {
      type,
    },
    url: "/home/getCase",
    method: "GET",
  });
};

export const getHomeNews = (): AxiosPromise => {
  return service({
    params: {
      type,
    },
    url: "/home/getNews",
    method: "GET",
  });
};

export const getHomeService = (): AxiosPromise => {
  return service({
    params: {
      type,
    },
    url: "/home/getService",
    method: "GET",
  });
};

export const getAbout = (): AxiosPromise => {
  return service({
    params: {
      type,
    },
    url: "/company_info/get",
    method: "GET",
  });
};

export const getProductList = (params: IProductListParams): AxiosPromise => {
  return service({
    params: {
      ...params,
    },
    url: "/product/getList",
    method: "GET",
  });
};

export const getPhoneList = (
  params: IPage = { current: 1, pageSize: 20 }
): AxiosPromise => {
  return service({
    params: {
      ...params,
    },
    url: "/phone/get",
    method: "GET",
  });
};

export const addMessage = (params: IMessage): AxiosPromise => {
  return service({
    data: {
      ...params,
      type,
    },
    url: "/message/add",
    method: "PUT",
  });
};

export const getProductDetail = (params: { id: number }): AxiosPromise => {
  return service({
    params: {
      ...params,
    },
    url: "/product/get_by_id",
    method: "GET",
  });
};

export const getProductRecommend = (
  params: { type: string } = { type: "product" }
): AxiosPromise => {
  return service({
    params: {
      ...params,
    },
    url: "/product/getRecommend",
    method: "GET",
  });
};

export const addView = (params: IView): AxiosPromise => {
  return service({
    data: {
      ...params,
      type: "web",
    },
    url: "/view",
    method: "POST",
  });
};
