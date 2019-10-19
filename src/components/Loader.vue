<template>
  <div
    v-if="loading"
    class="pt-5 d-flex justify-content-center align-items-center"
  >
    <i class="fas fa-spinner fa-spin fa-10x"></i>
  </div>
  <div v-else>
    <slot></slot>
  </div>
</template>

<script>
export default { props: { loading: Boolean } };
</script>

<style scoped></style>
