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
          <router-view />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Sidebar from "./components/Sidebar.vue";
import Header from "./components/Header.vue";

export default { components: { Sidebar, Header } };
</script>
