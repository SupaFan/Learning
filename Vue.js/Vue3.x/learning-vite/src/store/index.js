import Vuex from 'vuex';
import storage from '@/libs/storage';
import enums from './modules/enums';

const ACCESS_TOKEN = 'Access-Token'
const USER_INFO = 'User-Info'


const storageUser = storage.get(USER_INFO) || null

const store = new Vuex.Store({
    getters: {
        token: state => state.token,
        info: state => state.info,
    },
    state: {
        token: (storageUser && storageUser.tokenInfo && storageUser.tokenInfo.access_token) || '',
        info: storageUser
    },
    mutations: {
        SET_INFO: (state, info) => {
            state.info = info
        },
        SET_TOKEN: (state, token) => {
            state.token = token
        },
    },
    actions: {
        OnLogin({ commit }, userInfo) {
            storage.set(ACCESS_TOKEN, userInfo.tokenInfo.access_token, '7d')
            storage.set(USER_INFO, userInfo)
            commit('SET_TOKEN', userInfo.tokenInfo.access_token)
            commit('SET_INFO', userInfo)
        },
    },
    modules: {
        enums,
    }
})

export default store