<template>
  <b-card
    border-variant="light"
    :body-class="`d-flex p-3 download-card${selected ? ' selected' : ''}`"
    @click="selectDownload({ id, selected: !selected })"
  >
    <BreezeIcon :type="codec" />
    <div class="ml-2 flex-grow-1 d-flex flex-column">
      <div class="d-flex flex-grow-1 align-items-center">
        <div class="flex-grow-1">
          {{ title }}
        </div>
        <div>
          <b-badge v-show="format.height" variant="danger" class="ml-1"
            >{{ format.height }}p</b-badge
          >
          <b-badge v-show="format.acodec !== 'none'" class="ml-1">{{
            format.acodec
          }}</b-badge>
          <b-badge v-show="format.abr" class="ml-1"
            >{{ format.abr }} Kbps</b-badge
          >
          <b-badge v-show="format.vcodec !== 'none'" class="ml-1">{{
            format.vcodec
          }}</b-badge>
          <b-badge v-show="format.vbr" class="ml-1"
            >{{ format.vbr }} Kbps</b-badge
          >
        </div>
      </div>
      <b-progress
        height="7px"
        variant="success"
        :animated="progress.status === 'downloading'"
        :value="parseFloat(progress._percent_str)"
      />
      <div class="d-flex justify-content-between">
        <span>
          <StartStopButton
            v-bind="$props"
            size="sm"
            class="p-0 download-action"
            variant="link"
          />
          <ClearButton
            v-bind="$props"
            v-show="progress.status === 'finished'"
            size="sm"
            class="p-0 ml-2 download-action"
            variant="link"
          />
          <DeleteButton
            v-bind="$props"
            size="sm"
            class="p-0 ml-2 download-action"
            variant="link"
          />
        </span>
        <span>{{ progress._speed_str }}</span>
        <span>{{ progress._eta_str }}</span>
        <span>{{ progress._total_bytes_str }}</span>
        <span>{{ progress._percent_str }}</span>
      </div>
    </div>
  </b-card>
</template>

<script>
import { mapMutations } from "vuex";
import BreezeIcon from "@/components/BreezeIcon.vue";
import StartStopButton from "./components/StartStopButton.vue";
import ClearButton from "./components/ClearButton.vue";
import DeleteButton from "./components/DeleteButton.vue";

export default {
  components: { BreezeIcon, StartStopButton, ClearButton, DeleteButton },
  props: {
    id: String,
    selected: Boolean,
    title: String,
    formats: Array,
    progress: Object
  },
  data: () => ({ loading: false }),
  computed: {
    format() {
      const { filename } = this.progress;
      const { formats } = this;
      const [id, extension] = filename.split(".").slice(-2);
      const format =
        formats.find(
          ({ format_id, ext }) => `f${format_id}` === id && ext === extension
        ) || {};

      // return a sanitized format
      return Object.entries(format).reduce(
        (acc, [key, value]) => ({
          ...acc,
          ...([null, "none"].includes(value) ? {} : { [key]: value })
        }),
        {}
      );
    },
    codec() {
      const { acodec, vcodec } = this.format;

      return acodec || vcodec;
    }
  },
  methods: mapMutations(["selectDownload"])
};
</script>

<style scoped>
.download-card:hover {
  background-color: #ebf8ff;
}
.download-card.selected {
  background-color: #bee3f8;
}

.download-action {
  color: #6c757d;
}
.download-action:hover {
  color: #343a40;
}
</style>
