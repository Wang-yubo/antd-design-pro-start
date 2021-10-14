import type { orderStatusOptionsItem } from './translation';

/** 订单状态字典 */
export const orderStatusOptions: orderStatusOptionsItem[] = [
  {
    code: '',
    text: '全部',
  },
  {
    code: '10',
    text: '创建订单',
  },
  {
    code: '20',
    text: '预定中',
    desc: '买家已支付，正在等待平台确认',
  },
  {
    code: '21',
    text: '预定成功',
    desc: '买家已支付，平台已确认',
  },
  {
    code: '22',
    text: '预定失败',
  },
  {
    code: '30',
    text: '取消中',
    desc: '买家提交取消订单，正在等待平台确认',
  },
  {
    code: '31',
    text: '取消成功',
    desc: '买家提交取消订单，平台已确认',
  },
  {
    code: '32',
    text: '取消失败',
  },
  {
    code: '40',
    text: '已消费退款',
    desc: '买家与平台协商，平台已为买家办理已退款',
  },
  {
    code: '50',
    text: '已入住',
    desc: '买家已入住',
  },
];

/** 支付状态字典 */
export const payStatusOptions: orderStatusOptionsItem[] = [
  {
    code: 2040,
    text: '支付成功',
  },
  {
    code: 2050,
    text: '已退款',
  },
];

/** 订单预约房间的状态 */
export const appointmentStatusOptions: orderStatusOptionsItem[] = [
  {
    code: '1010',
    text: '未知状态',
  },
  {
    code: 1020,
    text: '预约中,',
  },
  {
    code: 1040,
    text: '商家预约',
  },
  {
    code: 1050,
    text: '接收预约',
  },
  {
    code: 1070,
    text: '已取消',
  },
  {
    code: 1080,
    text: '取消失败',
  },
  {
    code: 1090,
    text: '美团客服取消',
  },
  {
    code: 1110,
    text: '已消费或已入住',
  },
];
