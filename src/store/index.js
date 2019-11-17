import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import room from './modules/room';

const types = {
  SET_LOADING: 'SET_LOADING',
};

export default new Vuex.Store({
  state: {
    isLoading: false,
  },
  getters: {
    isLoading: state => state.isLoading,
  },
  actions: {
    showLoading({ state, commit }) {
      if (state.isLoading) return;
      commit(types.SET_LOADING, { isLoading: true });
    },
    hideLoading({ state, commit }) {
      if (!state.isLoading) return;
      commit(types.SET_LOADING, { isLoading: false });
    },
  },
  mutations: {
    [types.SET_LOADING](state, { isLoading }) {
      state.isLoading = isLoading;
    },
  },
  modules: {
    room,
  },
});
