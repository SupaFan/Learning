const {
  VITE_NODE_ENV,
  VITE_APP_API_BASE,
  VITE_APP_API_BASIC_AUTH_USERNAME,
  VITE_APP_API_BASIC_AUTH_PASSWORD
} = import.meta.env;

export default {
  env: VITE_NODE_ENV,
  /**
   * @description api请求基础路径
   */
  baseUrl: VITE_APP_API_BASE,
  pageSize: 20,
  /**
   * @description 权限验证
   */
  auth: {
    basicAuthUsername: VITE_APP_API_BASIC_AUTH_USERNAME,
    basicAuthPassword: VITE_APP_API_BASIC_AUTH_PASSWORD,
  },
};
