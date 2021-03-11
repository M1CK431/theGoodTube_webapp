<template>
  <div class="p-2 bg-dark" style="height: 100vh" role="navigation">
    <router-link to="/" style="text-decoration: none">
      <h3 class="text-center my-3" style="cursor: pointer">
        <span class="text-light">
          <span style="font-size: 0.8em" class="align-top">the</span
          >Good<b-badge style="font-size: 1em" variant="danger">Tube</b-badge>
        </span>
      </h3>
    </router-link>
    <hr class="text-secondary bg-secondary" />
    <b-nav vertical>
      <b-nav-item
        class="block text-white-50 inactive"
        active-class="bg-secondary text-light font-weight-bold active"
        to="/downloading"
      >
        <i class="fas fa-arrow-alt-circle-down mr-1"></i>
        {{ $t("DOWNLOADING") }}
        <b-badge class="float-right m-1" variant="light">{{
          numberOfDownloadsPerStatus.downloading || 0
        }}</b-badge>
      </b-nav-item>
      <b-nav-item
        class="block text-white-50 inactive"
        active-class="bg-secondary text-light font-weight-bold active"
        to="/waiting"
      >
        <i class="fas fa-clock mr-1"></i> {{ $t("WAITING") }}
        <b-badge class="float-right m-1" variant="light">{{
          numberOfDownloadsPerStatus.waiting || 0
        }}</b-badge>
      </b-nav-item>
      <b-nav-item
        class="block text-white-50 inactive"
        active-class="bg-secondary text-light font-weight-bold active"
        to="/stopped"
      >
        <i class="fas fa-stop-circle mr-1"></i> {{ $t("STOPPED") }}
        <b-badge class="float-right m-1" variant="light">{{
          numberOfDownloadsPerStatus.stopped || 0
        }}</b-badge>
      </b-nav-item>
      <b-nav-item
        class="block text-white-50 inactive"
        active-class="bg-secondary text-light font-weight-bold active"
        to="/finished"
      >
        <i class="fas fa-check-circle mr-1"></i> {{ $t("FINISHED") }}
        <b-badge class="float-right m-1" variant="light">{{
          numberOfDownloadsPerStatus.finished || 0
        }}</b-badge>
      </b-nav-item>
    </b-nav>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Sidebar",
  computed: mapGetters(["numberOfDownloadsPerStatus"])
};
</script>

<style scoped lang="stylus">
.active
  cursor default

.inactive
  cursor pointer
  :hover
    background-color #6c757d
</style>
