// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

// <editor-fold desc="登录模块 类型+接口" defaultstate="collapsed">

/** 登录请求 */
export interface LoginParams {
  username: string;
  password: string;
}

/** 登录返回参数类型 */
export interface loginResult {
  expireTime: string;
  hasMember: string;
  refreshToken: string;
  token: string;
  userId: string;
}

/**
 * @desc 登录
 * @param data
 */
export async function login(data: LoginParams) {
  return request<API.GeneralResponse<loginResult | { token: any }>>('/rms/login', {
    method: 'POST',
    data,
  });
}

// </editor-fold>

// <editor-fold desc="酒店模块" defaultstate="collapsed">

// <editor-fold desc="酒店订单列表" defaultstate="collapsed">

/** 酒店订单列表请求参数 */
export interface hotelOrderListParams {
  keyword: string;
  orderBy: string;
  orderStatus: number | undefined;
  pageNo: number | string;
  pageSize: number | string;
  current: number | undefined;
  sortOrder: string;
  wd: string;
}

/** 酒店订单列表 返回结果 */
export interface hotelOrderResult {
  pageCount: number;
  pageNo: number;
  pageSize: number;
  rows: hotelOrderResultItem[];
  scrollId: string;
  totalCount: number;
}

/** 酒店订单列表 返回的 rows 中的每一项的参数 */
export interface hotelOrderResultItem {
  /** 预约状态 */
  appointmentStatus: number;
  /** 入住时间 */
  arriveTime: string;
  /** 离店时间 */
  checkoutTime: string;
  /** 联系人电话号码 */
  contactPhone: string;
  /** 分销商订单号 */
  distributorOrderId: string;
  /** 美团提供订单号 */
  mtOrderId: string;
  /** 订单状态10 创建订单 create20 预定中 booking21 预定成功 book_suc22
   * 预定失败 book_fail30 取消中 canceling31 取消成功 cancel_suc32
   * 取消失败 cancel_fail40 已消费退款 abort（美团客服介入后才可能出现此状态）50 已入住 book_checkin21
   * 预订成功 book_suc22 预订失败 book_fail31 取消成功 cancel_suc40
   * 美团客服介入退款 abort50 已入住 book_checkin */
  orderStatus: number;
  /** 支付状态 */
  payStatus: number;
  /** 住客姓名 */
  personNames: string;
  /** 酒店名 */
  poiName: string;
  /** 房间数量 */
  roomCount: number;
  /** 房间名 */
  roomName: string;
  /** 售价，单位为分 */
  sellPrice: number;
  /** 分销商的佣金，单位为分 */
  subPrice: number;
}

/** 请求酒店订单列表 */
export const hotelOrderList = (params: hotelOrderListParams) => {
  return request<API.GeneralResponse<hotelOrderResult>>('/hotel/order/query', {
    method: 'post',
    data: params,
  });
};

/** 酒店订单详情接口data数据 */
export interface hotelDetailResultData {
  address: string;
  checkinTime: string;
  checkoutTime: string;
  contactName: string;
  contactPhone: string;
  day: number;
  frontImage: string;
  goodsId: number;
  hotelId: number;
  orderMsg: string;
  orderRefundInfoS: OrderRefundInfoS[];
  orderRoomNights: OrderRoomNight[];
  orderStatus: number;
  personNames: string;
  poiName: string;
  refundPrice: number;
  refundSettlePrice: number;
  refundTime: string;
  roomCount: number;
  roomName: string;
  settlePrice: number;
  totalPrice: number;
}

/** 退款 */
export interface OrderRefundInfoS {
  refundId: number;
  refundPrice: number;
  refundSettlePrice: number;
  refundTime: string;
}

/** 支付 */
export interface OrderRoomNight {
  appointmentStatus: number;
  bizDate: string;
  payStatus: number;
  sellPrice: number;
  subPrice: number;
}

/**
 * @desc 请求酒店订单详情
 * @param mtOrderId
 */
export const hotelDetail = (mtOrderId: string) => {
  return request<API.GeneralResponse<hotelDetailResultData>>(
    `/hotel/order/query/detail?mtOrderId=${mtOrderId}`,
  );
};

// </editor-fold>

// </editor-fold>

// <editor-fold desc="用户列表" defaultstate="collapsed">

/** 用户请求参数定义 */
export interface UserParams {
  membershipFlag: string;
  orderBy: string;
  pageNo: number;
  pageSize: number;
  sortOrder: string;
  status: string;
  wd: string;
}

/** 用户返回结果定义 */
export interface UserResult {
  pageNo: number;
  pageSize: number;
  pageCount: number;
  totalCount: number;
  scrollId: any;
  rows: UserItem[];
}

/** 返回的数组中的每一项  table Columns 中使用*/
export interface UserItem {
  affiliationCity: string;
  affiliationCounty: string;
  affiliationProvince: string;
  avatar: string;
  createTime: string;
  id: string;
  mobile_phone: string;
  nickname: string;
  sex: string;
  status: string;
}

/**
 * @desc  用户列表
 * @param params
 */
export const userPage = (params: UserParams) => {
  return request<API.GeneralResponse<UserResult>>('/customer/page', {
    method: 'post',
    data: params,
  });
};

// </editor-fold>

// <editor-fold desc="其他接口" defaultstate="collapsed">
/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<{
    data: API.CurrentUser;
  }>('/api/currentUser', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/login/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取规则列表 GET /api/rule */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/rule', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建规则 PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'DELETE',
    ...(options || {}),
  });
}

// </editor-fold>

// <editor-fold desc="支付模块" defaultstate="collapsed">

/**
 * @desc 微信接口测试
 * @returns {*}
 */
export const fileTest = () => {
  return request('/set/payment/payment/verify');
};

/**
 * @desc 获取旧配置
 * @returns {*}
 */
export const getOldSet = () => {
  return request('/set/payment/applet');
};

/**
 * @desc 提交设置
 * @param params
 * @returns {*}
 */
export const paySet = (params: any) => {
  return request('/set/payment/applet', {
    method: 'put',
    data: params,
  });
};

// </editor-fold>
