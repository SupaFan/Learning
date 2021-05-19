import axios from 'axios';
import qs from 'qs';
import store from '@/store'
import { Toast } from 'vant';

// login过滤
const loginFilterList = [
  '/login/qrcode'
];
Toast.allowMultiple();
class HttpRequest {
  constructor(configs) {
    this.baseUrl = configs.baseUrl;
    this.queue = {};
  }

  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      defaults: {
        withCredentials: true,
      },
      // transformRequest: [data => qs.stringify(data)],
      headers: {
        post: {
          'Content-Type': 'application/json;',
        },
      },
    };
    let token = store.getters.token;
    if (token) {
      config.headers[`Authorization`] = `Bearer ${token}`;
    }
    return config;
  }

  distroy(url) {
    delete this.queue[url];
  }

  renderPage ({data, url}) {
    try {
      // 取出分页相关字段
      let pageParams = {};

      // 滤除分页相关的字段
      for (let key in data) {
        if (["pageNo", "pageSize"].includes(key)) {
          let value = data[key];

          // 当前页码从第一页开始
          if (key === "pageNo") {
            value = Math.max(1, +value || 0);
          }

          // 必须设置每页显示条数
          if (key === "pageSize") {
            value = +value || 0;
            value = value === 0 ? app.config.pageSize : Math.max(1, value);
          }

          pageParams[key] = value;
          delete data[key];
        }
      }

      // 混合 URL
      if (JSON.stringify(pageParams) !== "{}") {
        if (url.includes('?')) {
          url = `${url}&${qs.stringify(pageParams)}`;
        } else {
          url = `${url}?${qs.stringify(pageParams)}`;
        }
      }
      return {pageParams , url};
    } catch (error) {
      console.log(error);
    }
  }

  delEmtyParmas(params) {
    for (let key in params) {
      if (Array.isArray(params[key]) && params[key][0] === "") {
        delete params[key];
      }
      if (params[key] === "") {
        delete params[key];
      }
    }
    return params;
  }


  interceptors(instance, url) {
    // 请求拦截
    instance.interceptors.request.use((config) => {
      // 分页过滤
      const _pageParams = this.renderPage(config);
      config.url = _pageParams.url;
      if (config.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
        config.transformRequest = [data => qs.stringify(data)];
      }
      // 接口-登录过滤
      loginFilterList.includes(config.url) && delete (config.headers.Authorization);

      // 添加全局的loading...
      if (!Object.keys(this.queue).length) {
        //
      }
      this.queue[url] = true;
      return config;
    }, error => Promise.reject(error));

    // 响应拦截
    instance.interceptors.response.use((res) => {
      this.distroy(url);
      res.data.success = (res.data.code === '0000');
      if (!res.data.success && res.data.message) {
        Toast({
          message: res.data.message,
          icon: 'cross',
        });
      }
      return res.data;
    }, (error) => {
      const pathName = window.location.pathname;
      // 未登录 无权限
      if ([401, 403].includes(error.response.status) && !/login/ig.test(pathName)) {
        // 此处需要每次跳转到微信授权页面，以免无法获取客户端 openId
        // window.location.href = '/';
        window.location.href = `/login?redirect_path=${window.location.href}`
      } else if (error.response.data.message) {
        Toast({
          message: error.response.data.message,
          timeout: 3000,
          icon: 'cross',
        });
      } else {
        Toast({
          message: '网络不佳~请稍后重试~',
          timeout: 3000,
          icon: 'cross',
        });
      }
      this.distroy(url);
      return error.response.data;
      // return Promise.reject(error);
    });
  }

  request(options) {
    const instance = axios.create();
    options = Object.assign(this.getInsideConfig(), {
      method: 'POST',
    }, options);
    this.interceptors(instance, options.url);
    return instance(options);
  }
}
export default HttpRequest;
