import { PageLoading } from '@ant-design/pro-layout';
import type { RunTimeLayoutConfig } from 'umi';
import type { RequestOptionsInit, ResponseError } from 'umi-request';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import { Inspector } from 'react-dev-inspector';
import React from 'react';
import { baseUrl } from '../config/http';
import { Storage } from '../utils/local';

const loginPath = '/user/login';
import { history } from 'umi';
import { message } from 'antd';
import moment from 'moment';
import type { RequestConfig } from 'umi';
// * 引入点击DOM快速打开对应文件并且跳转到对应行
const InspectorWrapper = process.env.NODE_ENV === 'development' ? Inspector : React.Fragment;

const isDev = process.env.NODE_ENV === 'development';
moment.locale('zh-cn');

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
// export async function getInitialState(): Promise<{
//   settings?: Partial<LayoutSettings>;
//   currentUser?: API.CurrentUser;
//   fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
// }> {
//   const fetchUserInfo = async () => {
//     try {
//       const msg = await queryCurrentUser();
//       return msg.data;
//     } catch (error) {
//       history.push(loginPath);
//     }
//     return undefined;
//   };
//   // 如果是登录页面，不执行
//   if (history.location.pathname !== loginPath) {
//     const currentUser = await fetchUserInfo();
//     return {
//       fetchUserInfo,
//       currentUser,
//       settings: {},
//     };
//   }
//   return {
//     fetchUserInfo,
//     settings: {},
//   };
// }

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = () => {
  return {
    rightContentRender: () => (
      <InspectorWrapper keys={['control', 'shift', 'command', 'c']} disableLaunchEditor={!isDev}>
        <RightContent />
      </InspectorWrapper>
    ),
    disableContentMargin: false,
    footerRender: () => <Footer />,
    onPageChange: () => {
      // 页面切换时如果检测到本地没有身份信息（登陆页除外） 就 重定向到 login
      // const { location } = history;
      //
      // const token = Storage.s?.get('token');
      //
      // if (!token && location.pathname !== loginPath) {
      //   message.error('身份过期，请重新登陆');
      //   history.push(loginPath);
      // }
    },
    menuHeaderRender: undefined,
    // 自定义 403 页面
    unAccessible: <div>unAccessible</div>,
    // ...initialState?.settings,
  };
};

// <editor-fold desc="request相关" defaultstate="collapsed">

/** 对请求进行拦截，并且添加身份信息 */
const authHeaderInterceptor = (url: string, options: RequestOptionsInit) => {
  // 身份信息来自全局验证设置
  const authorization = { Authorization: sessionStorage.getItem('token') as string };
  return {
    url: `${baseUrl}${url}`,
    options: { ...options, interceptors: true, headers: authorization },
  };
};

/** 响应后拦截 */
const demoResponseInterceptors = async (response: Response) => {
  // 对请求进行解析 不能删除
  const res = await response.clone().json();
  // console.log(res)
  // 如果一旦数据中的success为false 则不进行下面的判断，直接抛给异常处理
  //
  // if (res.code === 'NO_AUTHC') {
  //   message.error('身份失效，请重新登录')
  //   history.replace('/login')
  //   return res
  // }

  if (!res.success) return res;
  // 如果响应成功但是code不为0
  if (res.code !== '0') {
    // 直接将错误抛出到主界面
    message.error(res?.msg);
    return res;
  }
  return res;
};

/** 错误处理 */
const errorHandler = (error: ResponseError) => {
  try {
    if (error.data?.code === 'NO_AUTHC') {
      return history.push(loginPath);
    }
  } catch (e) {
    console.log('error:', e);
  }
};

export const request: RequestConfig = {
  timeout: 30000,
  errorHandler,
  requestInterceptors: [authHeaderInterceptor],
  responseInterceptors: [demoResponseInterceptors],
};

// </editor-fold>
