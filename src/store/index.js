import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import workers from './workers';

Vue.use(Vuex);

const workerState = createPersistedState({
  paths: ['workers', 'counterId'],
});

export default new Vuex.Store({
  modules: {
    workers: {
      namespaced: true,
      ...workers,
    },
  },
  plugins: [workerState],
});
