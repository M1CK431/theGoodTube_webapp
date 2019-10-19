<template>
  <Loader :loading="loading" class="m-2">
    <Error :error="error">
      Downloads which are in state "{{ downloadsType }}"<br />
      <table class="table">
        <thead>
          <tr>
            <th>{{ $t("NAME") }}</th>
            <th>{{ $t("SIZE") }}</th>
            <th>{{ $t("PROGRESSION") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr :key="index" v-for="(download, index) in downloads">
            <td>{{ download.name }}</td>
            <td>{{ download.size }}</td>
            <td>
              <b-progress
                :value="download.progress"
                :max="100"
                variant="success"
                show-progress
                animated
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
import Loader from "./Loader.vue";
import Error from "./Error.vue";

export default {
  name: "Downloads",
  components: { Loader, Error },
  props: { downloadsType: { type: String, required: true } },
  data: () => ({ loading: true, error: "", downloads: [] }),
  mounted() {
    this.axios
      .get("http://127.0.0.1:5000/downloads")
      .then(({ data }) => (this.downloads = data))
      .catch(error => (this.error = JSON.stringify(error)))
      .finally(() => (this.loading = false));
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus"></style>
