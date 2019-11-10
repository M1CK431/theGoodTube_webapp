import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import Download from "@/helpers/Download.prototype.js";

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
      ),
    numberOfSelectedDownloadsPerStatus: (_state, { selectedDownloads }) =>
      selectedDownloads.reduce(
        (acc, { progress: { status } }) => ({
          ...acc,
          [status]: ++acc[status] || 1
        }),
        {}
      ),
    selectedDownloads: ({ downloads }) =>
      downloads.filter(({ selected }) => selected)
  },

  mutations: {
    selectDownload: ({ downloads }, { id, selected }) =>
      (downloads.find(download => download.id === id).selected = selected),
    setDownloads: (state, downloads) =>
      (state.downloads = downloads.map(download => new Download(download))),
    event_progress: (state, payload) => {
      const { downloads } = state;
      const downloadIndex = downloads.findIndex(({ id }) => payload.id === id);

      if (downloadIndex > -1) {
        const {
          selected,
          progress: { status }
        } = downloads[downloadIndex];

        Object.assign(downloads[downloadIndex], {
          ...new Download(payload),
          // Preserve selected state except if status change
          selected: payload.progress.status === status ? selected : false
        });
      } else {
        downloads.push(new Download(payload));
      }
      state.downloads = downloads;
    },
    get event_start() {
      return this.event_progress;
    },
    get event_stop() {
      return this.event_progress;
    },
    event_clear: ({ downloads }, { id }) => {
      const downloadIndex = downloads.findIndex(download => download.id === id);

      downloads.splice(downloadIndex, 1);
    },
    get event_delete() {
      return this.event_clear;
    },
    event_clear_finished: state => {
      state.downloads = state.downloads.filter(
        ({ progress: { status } }) => status !== "finished"
      );
    },
    setSearch: (state, search) => (state.search = search)
  },

  actions: {
    getDownloads: ({ commit }) =>
      axios
        .get(`${apiUrl}/downloads`)
        .then(({ data }) => commit("setDownloads", data)),
    clearDownloads: ({ getters: { selectedDownloads } }) => {
      if (selectedDownloads.length) {
        return axios.all(
          selectedDownloads
            .filter(({ progress: { status } }) => status === "finished")
            .map(({ id }) => axios.delete(`${apiUrl}/downloads/${id}`))
        );
      }
      return axios.delete(`${apiUrl}/downloads`);
    },
    startSelectedDownloads: ({ state: { downloads } }) =>
      axios.all(
        downloads
          .filter(
            ({ selected, progress: { status } }) =>
              selected && status === "stopped"
          )
          .map(({ id }) =>
            axios.patch(`${apiUrl}/downloads/${id}/progress`, {
              status: "start"
            })
          )
      ),
    stopSelectedDownloads: ({ state: { downloads } }) =>
      axios.all(
        downloads
          .filter(
            ({ selected, progress: { status } }) =>
              selected && status === "downloading"
          )
          .map(({ id }) =>
            axios.patch(`${apiUrl}/downloads/${id}/progress`, {
              status: "stop"
            })
          )
      ),
    deleteSelectedDownloads: ({ state: { downloads } }) =>
      axios.all(
        downloads
          .filter(({ selected }) => selected)
          .map(({ id }) => axios.delete(`${apiUrl}/downloads/${id}/files`))
      )
  }
});
