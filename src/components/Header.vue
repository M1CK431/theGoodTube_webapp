<template>
  <b-navbar toggleable="md" variant="light">
    <b-collapse is-nav>
      <b-navbar-nav>
        <b-nav-item to="/new" class="pr-2 border-right">
          <i class="fas fa-plus mr-1"></i>{{ $t("NEW") }}
        </b-nav-item>
        <b-nav-item disabled class="ml-2">
          <i class="fas fa-play"></i>
        </b-nav-item>
        <b-nav-item disabled><i class="fas fa-stop"></i></b-nav-item>
        <b-nav-item disabled> <i class="fas fa-eraser"></i> </b-nav-item>
        <b-nav-item disabled> <i class="fas fa-trash-alt"></i> </b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input
            size="sm"
            class="mr-sm-2"
            type="text"
            placeholder="Search"
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
export default { name: "Header" };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus"></style>
