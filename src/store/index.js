import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

import jwt from "../services/jwt";
import { http } from '@/services';

// Create a new store instance.
export default createStore({
  // state 속성 추가
  state: {
    member:null,
    token: {
      accessToken: jwt.getToken(),
      expiryDate: new Date(),
    }, // 토큰정보
    isAuthenticated: !!jwt.getToken(),
    auth_iv: null,
    auth_key: null,
    auth_result: null,
    delYn:false,
  },
  getters: {
    getAccessToken: function (state) {
      return state.token.accessToken;
    },
    isAuthenticated: function (state) {
      return state.isAuthenticated;
    },
    isExpired: (state) => new Date(state.token.expiryDate) < new Date(),
    getAuthResult: function (state) {
      return state.auth_result;
    },
    getMemberConfirm: function (state) {
      // return state.member_confirm;
    },
    getLoginMember: function (state) {
      return state.member;
    },
  },
  mutations: {
    logout: function (state, payload = {}) {
      state.token.accessToken = "";
      state.isAuthenticated = false;
      state.member = null;
      jwt.destroyToken();
      jwt.destroyRemember();
    },
    login: function (state, payload = {}) {
      state.token.accessToken = payload.accessToken;
      state.isAuthenticated = true;
      state.member = payload.member;

      jwt.saveToken(payload.accessToken);
      const date = new Date();
      date.setHours(date.getHours() + payload.expiryHour);
      state.token.expiryDate = date;
      if(payload.remember != null){
        jwt.saveRemember(payload.remember);
      }
    },
    profileUpdate: function (state, payload = {}) {
      console.log("mutations profileUpdate", payload);
      state.profile = String(payload.profile);
      console.log("mutations profileUpdate state.profile", state.profile);
    },
    setExpiryDate: (state) => {
      const date = new Date();
      date.setHours(date.getHours() + 3);
      state.token.expiryDate = date;
    },
    setAuth: function (state, payload = {}) {
      state.auth_iv = String(payload.auth_iv);
      state.auth_key = String(payload.auth_key);
      console.log("mutations auth iv, key", state.auth_iv, state.auth_key);
    },
    setAuthResult: function (state, payload = {}) {
      state.auth_result = String(payload.auth_result);
      console.log("mutations auth_result", state.auth_result);
    },
  },
  actions: {
    logout: function (context, payload) {
      return new Promise((resolve) => {
        setTimeout(function () {
          context.commit("logout", payload);
          resolve({});
        }, 500);
      });
    },
    login: function (context, payload) {
      let params = {
        email: payload.email,
        password: payload.password,
      };
      return new Promise((resolve, reject) => {
        http
            .post("/member/login", params)
            .then((response) => {
              const { data } = response;
              if (data.CODE === 200) {
                context.commit("login", {
                  accessToken: data.BODY.token,
                  member: data.BODY.member,
                  expiryHour: data.BODY.expiryHour,
                });
              } else {
                //alert("잘못된 아이디 또는 비밀번호 입니다.");
              }
              resolve(response);
            })
            .catch((error) => {
              reject(error);
            });
      });
    },
    rememberLogin: function (context, payload) {
      if(jwt.getRemember() == undefined || jwt.getRemember() == null){
        return;
      }
      let params = {
        rememberCode: jwt.getRemember(),
      };
      return new Promise((resolve, reject) => {
        http
            .post("/member/login/remember", params)
            .then((response) => {
              const { data } = response;
              if (data.CODE === 200) {
                context.commit("login", {
                  accessToken: data.BODY.token,
                  member: data.BODY.member,
                  remember: data.BODY.remember,
                  expiryHour: data.BODY.expiryHour,
                });
              } else {
                //alert("잘못된 아이디 또는 비밀번호 입니다.");
              }
              resolve(response);
            })
            .catch((error) => {
              reject(error);
            });
      });
    },
    setTokenExpireDate({ commit, state }) {
      commit("basic", {
        key: "setExpiryDate",
        value,
      });
    },
    setAuthData: function (context, payload) {
      return new Promise((resolve) => {
        context.commit("setAuth", {
          auth_iv: payload.auth_iv,
          auth_key: payload.auth_key,
        });
        resolve({});
      });
    },
    setAuthResultData: function (context, payload) {
      return new Promise((resolve) => {
        context.commit("setAuthResult", { auth_result: payload.auth_result });
        resolve({});
      });
    },
    memberUpdate: function (context, payload) {
      return new Promise((resolve) => {
        setTimeout(function () {
          context.commit("memberUpdate", { member: payload.member });
          resolve({});
        }, 500);
      });
    },
    setDelYn: function (context, payload) {
      return new Promise((resolve) => {
        setTimeout(function () {
          context.commit("setDelYn", { delYn: payload.delYn });
          resolve({});
        });
      });
    },
  },
  plugins: [createPersistedState()],
});
