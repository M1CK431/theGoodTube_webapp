<template>
  <div v-if="error" class="p-2">
    <b-alert variant="danger" show>
      {{ $t("AN_ERROR_OCCURED") }}
      {{ $t("SEE_DETAILS_BELOW") }}
      <br />
      <b-card bg-variant="light">
        <b-card-text><pre v-html="errorString"></pre></b-card-text>
      </b-card>
    </b-alert>
  </div>
  <div v-else>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: { error: [String, Error] },
  computed: {
    errorString() {
      return JSON.stringify(this.error, undefined, 2).replace(/\\+n/g, "\n");
    }
  }
};
</script>

<style scoped></style>
