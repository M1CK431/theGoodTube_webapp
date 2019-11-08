<template>
  <Loader :loading="loading" class="m-2">
    <Error :error="error">
      <b-form @submit.prevent="startDownload">
        <b-form-group :label="$t('URL')" label-for="url">
          <b-form-input
            id="url"
            v-model="url"
            required
            placeholder="https://www.youtube.com/watch?v=XXXXX"
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">{{
          $t("DOWNLOAD")
        }}</b-button>
      </b-form>
    </Error>
  </Loader>
</template>

<script>
import Loader from "./Loader.vue";
import Error from "./Error.vue";

const { VUE_APP_API_URL: apiUrl } = process.env;

export default {
  name: "NewDownload",
  components: { Loader, Error },
  data: () => ({ loading: false, error: "", url: "" }),
  methods: {
    startDownload() {
      this.loading = true;
      const { url } = this;

      this.axios
        .post(`${apiUrl}/downloads`, { url })
        .then(() => this.$router.push({ name: "Downloading" }))
        .catch(error => (this.error = error))
        .finally(() => (this.loading = false));
    }
  }
};
</script>

<style scoped lang="stylus"></style>
