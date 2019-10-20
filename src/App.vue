<template>
  <div id="app">
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.6.3/css/all.css"
    />
    <b-container fluid class="p-0">
      <b-row no-gutters>
        <b-col cols="2"><Sidebar /></b-col>
        <b-col cols="10">
          <Header />
          <Loader :loading="loading">
            <Error :error="error">
              <router-view />
            </Error>
          </Loader>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import Header from "@/components/Header.vue";
import Loader from "@/components/Loader.vue";
import Error from "@/components/Error.vue";
import { mapActions } from "vuex";

export default {
  components: { Sidebar, Header, Loader, Error },
  data: () => ({ loading: true, error: "" }),
  async mounted() {
    await this.getDownloads().catch(error => (this.error = error));
    this.loading = false;
  },
  methods: mapActions(["getDownloads"])
};
</script>
