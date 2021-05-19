import enums from "@/api/enum";
import axios from '@/libs/api.request';


export default {
  state: {
    enums: {},
  },
  mutations: {
    enumReceived(state, $enum) {
      state.enums = {
        ...state.enums,
        [$enum.key]: $enum.value,
      };
    },
  },
  actions: {
    /**
       * 拉取枚举数据
       * @param {*} param0
       * @param {Array} keys
       */
    async fetchEnums({
      commit,
      state
    }, keys) {

      if (!keys) {
        keys = Object.keys(enums);
      }
      for (const key of keys) {
        // 拉取不存在的枚举
        if (!enums[key]) {
          console.log(`enum key [${key}] not defined`);
          continue;
        }
        // 已经存在，不拉取
        if (state.enums[key] && state.enums[key].length) {
          continue;
        }
        // 拉取之后存sessionStorage 不再发起网络请求
        let _enum = JSON.parse(sessionStorage.getItem(key));
        if (_enum) {
          commit('enumReceived', {
            key: key,
            value: _enum
          });
        } else {
          const res = await axios.request({
            url: enums[key],
            method: 'GET',
          });
          let enumList = res.data || [];
          if (enumList.constructor === Object) {
            enumList = Object.keys(enumList).map((k) => {
              return {
                value: `${k}`,
                displayName: `${enumList[k]}`
              };
            });

            enumList.sort(function (a, b) {
              return parseInt(a.value) - parseInt(b.value);
            });
          }
          sessionStorage.setItem(key, JSON.stringify(enumList))
          commit('enumReceived', {
            key: key,
            value: enumList
          });
        }

      }
    }
  }
}