<template>
  <div class="p-2">Downloads will come here (type: {{ downloadsType }}).</div>
</template>

<script>
export default {
  name: "Downloads",
  props: {
    downloadsType: {
      type: String,
      required: true
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus"></style>
