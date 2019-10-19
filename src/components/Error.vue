<template>
  <div v-if="error" class="">
    <b-alert variant="danger">
      {{ $t("AN_ERROR_OCCURED") }}
      {{ $t("SEE_DETAILS_BELOW") }}
      <br />
      <b-card bg-variant="light" class="text-center">
        <b-card-text>{{ error }}</b-card-text>
      </b-card>
    </b-alert>
  </div>
  <div v-else>
    <slot></slot>
  </div>
</template>

<script>
export default { props: { error: String } };
</script>

<style scoped></style>
