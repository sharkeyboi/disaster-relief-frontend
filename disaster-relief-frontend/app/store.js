import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "",
    email: ""
  },
  mutations: {
    updateToken(state,token) {
      state.token = token
      
    },
    updateEmail(state,email) {
      state.email = email
      
    }
  },
  actions: {
    login(context,userInfo) {
      
    }
  }
});
