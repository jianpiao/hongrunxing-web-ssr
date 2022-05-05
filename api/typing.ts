export interface IPage {
  current?: number;
  pageSize?: number;
}

export interface IProductListParams extends IPage {
  type: string;
  texture_id?: number;
  category_id?: number;
  name?: string;
  desc?: string;
  price?: number;
}

export interface IMessage {
  title: string;
  username: string;
  phone: string;
  content: string;
  type?: string;
}

export interface IProduct {
  id: number;
  name: string;
  type: string;
  src: string;
  desc: string;
  content: string;
  category?: number;
  texture?: number;
  price: string;
  update_time?: number;
  create_time?: number;
  current?: number;
  pageSize?: number;
  images: { id: number; src: string; type: string }[];
}

export interface IGetNewsList extends IPage {
  type: number;
}

export interface IView {
  page_name: string;
}
