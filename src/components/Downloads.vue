<template>
  <div class="m-2">
    <table class="table">
      <thead>
        <tr>
          <th>{{ $t("NAME") }}</th>
          <th>{{ $t("SIZE") }}</th>
          <th>{{ $t("SPEED") }}</th>
          <th>{{ $t("PROGRESSION") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          :key="id"
          v-for="{
            id,
            title,
            progress: {
              _total_bytes_str,
              _percent_str = '100%',
              _speed_str,
              status
            }
          } in filteredDownloads"
        >
          <td>{{ title }}</td>
          <td>{{ _total_bytes_str }}</td>
          <td>{{ _speed_str || "-" }}</td>
          <td>
            <b-progress
              :max="100"
              variant="success"
              :animated="status === 'downloading'"
            >
              <b-progress-bar
                :value="parseFloat(_percent_str)"
                :label="_percent_str"
              ></b-progress-bar>
            </b-progress>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-show="!filteredDownloads.length" class="text-center text-secondary">
      {{ $t("NO_DOWNLOAD_TO_DISPLAY_HERE") }}
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Downloads",
  props: { downloadsType: { type: String, required: true } },
  computed: {
    ...mapState(["downloads"]),
    filteredDownloads() {
      return this.downloads.filter(
        ({ progress: { status } }) => status === this.downloadsType
      );
    }
  }
};
</script>

<style scoped></style>
