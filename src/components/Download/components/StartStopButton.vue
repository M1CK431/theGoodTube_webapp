<template>
  <b-button @click.stop="startStopDownload" v-bind="$attrs" :disabled="loading">
    <i class="fas" :class="btnIcon"></i>
  </b-button>
</template>

<script>
const { VUE_APP_API_URL: apiUrl } = process.env;
const statusIconMap = {
  downloading: "fa-pause",
  stopped: "fa-play",
  finished: "fa-redo-alt"
};

export default {
  props: { id: String, progress: Object },
  data: () => ({ loading: false }),
  computed: {
    btnIcon() {
      if (this.loading) return "fa-spin fa-spinner";
      return statusIconMap[this.progress.status];
    }
  },
  methods: {
    startStopDownload() {
      const { id } = this;
      const { status } = this.progress;

      this.loading = true;
      this.axios
        .patch(`${apiUrl}/downloads/${id}/progress`, {
          status: status === "downloading" ? "stop" : "start"
        })
        .finally(() => (this.loading = false));
    }
  }
};
</script>

<style scoped></style>
