import HttpRequest from '@/libs/axios';
import config from '@/config';

// 配置ajax请求组件
const axios = new HttpRequest(config);
export default axios;
