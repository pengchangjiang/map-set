import Vue from "vue";
import Router from "vue-router";
import MainContainer from "@/components/MainContainer";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "mainContainer",
      component: MainContainer
    }
  ]
});
