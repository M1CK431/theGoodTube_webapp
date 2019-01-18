import Vue from "vue";
import Router from "vue-router";
import Downloads from "./components/Downloads.vue";
import NewDownload from "./components/NewDownload.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/downloading"
    },
    {
      path: "/downloading",
      name: "Downloading",
      component: Downloads,
      props: { downloadsType: "downloading" }
    },
    {
      path: "/waiting",
      name: "Waiting",
      component: Downloads,
      props: { downloadsType: "waiting" }
    },
    {
      path: "/stopped",
      name: "Stopped",
      component: Downloads,
      props: { downloadsType: "stopped" }
    },
    {
      path: "/finished",
      name: "Finished",
      component: Downloads,
      props: { downloadsType: "finished" }
    },
    {
      path: "/new",
      name: "NewDownload",
      component: NewDownload
    }
  ]
});
