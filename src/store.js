import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: { downloading: 0, waiting: 0, stopped: 0, finished: 0 },
  mutations: {
    setNumberOfDownloads: (state, downloads) => {
      Object.assign(state, {
        downloading: 0,
        waiting: 0,
        stopped: 0,
        finished: 0
      });
      downloads.forEach(({ progress: { status } }) => ++state[status]);
    }
  }
});
