import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { Auth0Plugin } from "./auth";
import hljs from "highlight.js/lib/core";
import "highlight.js/styles/github.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faLink, faUser, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { domain, clientId } from "../auth_config.json";
import Notifications from "vue-notification";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

Vue.config.productionTip = false;

Vue.use(hljs.vuePlugin);

Vue.use(Notifications);

Vue.use(Auth0Plugin, {
    domain,
    clientId,
    onRedirectCallback: (appState) => {
        history.replaceState({}, document.title, window.location.pathname);
        router.push(
            appState && appState.targetUrl ?
            appState.targetUrl :
            window.location.pathname
        );
    },
});

library.add(faLink, faUser, faPowerOff);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.component("v-select", vSelect);

new Vue({
    router,
    render: (h) => h(App),
}).$mount("#app");