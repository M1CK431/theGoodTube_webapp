import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);
const { VUE_APP_API_URL: apiUrl } = process.env;

export default new Vuex.Store({
  state: { downloads: [], search: "" },
  getters: {
    numberOfDownloadsPerStatus: ({ downloads }) =>
      downloads.reduce(
        (acc, { progress: { status } }) => ({
          ...acc,
          [status]: ++acc[status] || 1
        }),
        {}
      )
  },
  mutations: {
    setDownloads: (state, downloads) => (state.downloads = downloads),
    event_progress: (state, payload) => {
      const { downloads } = state;
      const downloadIndex = downloads.findIndex(({ id }) => payload.id === id);

      if (downloadIndex > -1) {
        Object.assign(downloads[downloadIndex], payload);
      } else {
        downloads.push(payload);
      }
      state.downloads = downloads;
    },
    setSearch: (state, search) => (state.search = search)
  },
  actions: {
    getDownloads: ({ commit }) =>
      axios
        .get(`${apiUrl}/downloads`)
        .then(({ data }) => commit("setDownloads", data))
  }
});
