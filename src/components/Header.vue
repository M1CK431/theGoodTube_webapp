<template>
  <b-navbar toggleable="md" variant="light">
    <b-collapse is-nav>
      <b-navbar-nav>
        <b-nav-item to="/new" class="pr-2 mr-2 border-right">
          <i class="fas fa-plus mr-1"></i>{{ $t("NEW") }}
        </b-nav-item>

        <b-nav-item
          :disabled="!numberOfSelectedDownloadsPerStatus.stopped"
          @click="startSelectedDownloads"
          ><i class="fas fa-play"></i
        ></b-nav-item>
        <b-nav-item
          :disabled="!numberOfSelectedDownloadsPerStatus.downloading"
          @click="stopSelectedDownloads"
          ><i class="fas fa-stop"></i
        ></b-nav-item>
        <b-nav-item
          :disabled="!selectedDownloads.length"
          @click="deleteSelectedDownloads"
        >
          <i class="fas fa-trash-alt"></i>
        </b-nav-item>
        <b-nav-item v-show="$route.name === 'Finished'" @click="clearDownloads">
          <i class="fas fa-eraser"></i>
        </b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input
            :value="search"
            @input="setSearch"
            size="sm"
            class="mr-sm-2"
            type="text"
            :placeholder="$t('SEARCH')"
          />
        </b-nav-form>

        <b-nav-item-dropdown text="Lang" right>
          <b-dropdown-item @click="$i18n.locale = 'fr_FR'">FR</b-dropdown-item>
          <b-dropdown-item @click="$i18n.locale = 'en_US'">EN</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "Header",
  computed: {
    ...mapState(["search"]),
    ...mapGetters([
      "numberOfDownloadsPerStatus",
      "numberOfSelectedDownloadsPerStatus",
      "selectedDownloads"
    ])
  },
  methods: {
    ...mapMutations(["setSearch"]),
    ...mapActions([
      "startSelectedDownloads",
      "stopSelectedDownloads",
      "clearDownloads",
      "deleteSelectedDownloads"
    ])
  }
};
</script>

<style scoped lang="stylus"></style>
