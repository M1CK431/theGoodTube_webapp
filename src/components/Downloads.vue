<template>
  <Loader :loading="loading" class="m-2">
    <Error :error="error">
      <table class="table">
        <thead>
          <tr>
            <th>{{ $t("NAME") }}</th>
            <th>{{ $t("SIZE") }}</th>
            <th>{{ $t("PROGRESSION") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            :key="index"
            v-for="({ title, progress: { size, percent, status } },
            index) in downloads"
          >
            <td>{{ title }}</td>
            <td>{{ size }}</td>
            <td>
              <b-progress
                :value="percent"
                :max="100"
                variant="success"
                show-progress
                :animated="status === 'downloading'"
              ></b-progress>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-show="!downloads.length" class="text-center text-secondary">
        {{ $t("NO_DOWNLOAD_TO_DISPLAY_HERE") }}
      </div>
    </Error>
  </Loader>
</template>

<script>
import { mapMutations } from "vuex";
import Loader from "./Loader.vue";
import Error from "./Error.vue";

export default {
  name: "Downloads",
  components: { Loader, Error },
  props: { downloadsType: { type: String, required: true } },
  data: () => ({ loading: true, error: "", data: [] }),
  mounted() {
    this.axios
      .get("http://127.0.0.1:5000/downloads")
      .then(({ data }) => {
        this.data = data;
        this.setNumberOfDownloads(data);
      })
      .catch(error => (this.error = JSON.stringify(error)))
      .finally(() => (this.loading = false));
  },
  computed: {
    downloads() {
      return this.data
        .filter(({ progress: { status } }) => status === this.downloadsType)
        .map(
          ({
            progress: {
              _total_bytes_str,
              _percent_str,
              status,
              ...progressRest
            },
            ...rest
          }) => ({
            ...rest,
            progress: {
              ...progressRest,
              status,
              size: _total_bytes_str,
              percent: status === "finished" ? 100 : parseFloat(_percent_str)
            }
          })
        );
    }
  },
  methods: mapMutations(["setNumberOfDownloads"])
};
</script>

<style scoped></style>
