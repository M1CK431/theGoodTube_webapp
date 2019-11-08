<template>
  <b-button @click.stop="deleteDownload" v-bind="$attrs" :disabled="loading">
    <i class="fas" :class="loading ? 'fa-spin fa-spinner' : 'fa-trash-alt'"></i>
  </b-button>
</template>

<script>
const { VUE_APP_API_URL: apiUrl } = process.env;

export default {
  props: { id: String },
  data: () => ({ loading: false }),
  methods: {
    deleteDownload() {
      // TODO: confirm modal
      const { id } = this;

      this.loading = true;
      this.axios
        .delete(`${apiUrl}/downloads/${id}/files`)
        .finally(() => (this.loading = false));
    }
  }
};
</script>

<style scoped></style>
