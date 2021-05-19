/**
 * @author Chenjunfan(chenjf@songcw.com)
 * @return {promise}
 */
import axios from '@/libs/api.request';
import config from '@/config';

const Api = {};

/**
 * @description 登录
 */
Api.login = opts => axios.request({
  url: `/login/qrcode`,
  method: 'GET',
  headers: {
    platform: 'FINANCE_IBP_APP'
  }
});

const authToken = window.btoa(`${config.auth.basicAuthUsername}:${config.auth.basicAuthPassword}`);

/**
 * @description 授权认证
 */
Api.process = opts => axios.request({
  url: `/login/qrcode/process`,
  method: 'POST',
  headers: {
    Authorization: `Basic ${authToken}`,
    platform: 'FINANCE_IBP_APP'
  },
  data: opts
});

/**
 * 密码登录
 * @param {*} opts
 * @returns
 */
Api.passwordLogin = opts => axios.request({
  url: `/login/token`,
  method: 'POST',
  headers: {
    Authorization: `Basic ${authToken}`,
    platform: 'FINANCE_IBP_APP'
  },
  data: opts
});


/**
 * @description 首页部门统计
 */
Api.deptStatisticalReport = opts => axios.request({
  url: '/api/v4/ibp/apply/count/deptStatisticalReport',
  method: 'GET',
});

/**
 * @description 首页数据统计
 */
Api.homeStatisticalReport = opts => axios.request({
  url: '/api/v4/ibp/apply/count/homeStatisticalReport',
  method: 'GET',
});



// 客诉

/**
 * @description 分页查询客诉跟进记录
 */
 Api.complaintFollowFindPage = opts => axios.request({
  url: '/api/v4/ibp/finance/customerComplaint/complaintFollowFindPage',
  data: opts,
});

/**
 * @description 通过逻辑主键查询【complaintNo】客诉详情
 */
 Api.getOneByComplaintNo = complaintNo => axios.request({
  url: `/api/v4/ibp/finance/customerComplaint/getOneByComplaintNo/${complaintNo}`,
  method: 'GET',
});

/**
 * @description 通过ID查询[rowId] 客诉详情
 */
 Api.getOneById = id => axios.request({
  url: `/api/v4/ibp/finance/customerConsultationFollow/get/${id}`,
  method: 'GET',
});


/**
 * @description 保存,客诉跟进记录
 */
 Api.saveComplaintFollow = opts => axios.request({
  url: '/api/v4/ibp/finance/customerComplaint/saveComplaintFollow',
  data: opts,
});

/**
 * @description 上传
 */
 Api.uploadFile = opts => axios.request({
  url: '/api/v4/nicp/files/no/auth/file',
  data: opts,
});


export default Api;
