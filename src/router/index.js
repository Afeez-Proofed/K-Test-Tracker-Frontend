import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home.vue";
import Profile from "../views/Profile.vue";
import MarkedTests from "../views/MarkedTests.vue";
import UnmarkedTests from "../views/UnmarkedTests.vue";
import TestMarker from "../views/TestMarker.vue";
import SchemaEditor from "../views/SchemaEditor.vue";
import { authGuard } from "../auth";

Vue.use(Router);

const router = new Router({
    mode: "hash",
    base: process.env.BASE_URL,
    routes: [{
            path: "/",
            name: "home",
            component: Home,
        },
        {
            path: "/profile",
            name: "profile",
            component: Profile,
            beforeEnter: authGuard,
        },
        {
            path: "/unmarked-tests",
            name: "UnmarkedTests",
            component: UnmarkedTests,
            beforeEnter: authGuard,
        },
        {
            path: "/marked-tests",
            name: "MarkedTests",
            component: MarkedTests,
            beforeEnter: authGuard,
        },
        {
            path: "/mark-test/:id",
            name: "TestMarker",
            component: TestMarker,
            beforeEnter: authGuard,
        },
        {
            path: "/test/:id",
            name: "MarkedTest",
            component: TestMarker,
            beforeEnter: authGuard,
        },
        {
            path: "/schema-editor",
            name: "SchemaEditor",
            component: SchemaEditor,
            beforeEnter: authGuard,
        },
    ],
});

export default router;