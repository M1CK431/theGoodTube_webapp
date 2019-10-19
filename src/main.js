import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import axios from "axios";
import VueAxios from "vue-axios";
import VueI18n from "vue-i18n";
import fr_FR from "./i18n/fr_FR.json";
import en_US from "./i18n/en_US.json";
import VueSocketIO from "vue-socket.io";

Vue.use(BootstrapVue);
Vue.use(VueAxios, axios);
Vue.use(VueI18n);
Vue.use(new VueSocketIO({ connection: "http://127.0.0.1:5000" }));
Vue.config.productionTip = false;

const i18n = new VueI18n({
  locale: "fr_FR",
  fallbackLocale: "en_US",
  messages: { fr_FR, en_US }
});

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
