<template>
  <div class="p-2">
    <Download
      :key="id"
      v-for="{ id, ...rest } in filteredDownloads"
      v-bind="{ id, ...rest }"
    />
    <div v-show="!filteredDownloads.length" class="text-center text-secondary">
      {{ $t("NO_DOWNLOAD_TO_DISPLAY_HERE") }}
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Download from "./Download/Download.vue";

export default {
  name: "Downloads",
  components: { Download },
  props: { downloadsType: { type: String, required: true } },
  computed: {
    ...mapState(["downloads", "search"]),
    filteredDownloads() {
      return this.downloads.filter(
        ({ title, progress: { status } }) =>
          status === this.downloadsType && RegExp(this.search, "i").test(title)
      );
    }
  }
};
</script>

<style scoped></style>
