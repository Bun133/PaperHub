import Vue from 'vue'
import Router from 'vue-router'
import Download from "@/download";
import Import from "@/Import";
import App from "@/App";

Vue.use(Router)

const routes = [
    {
        path: '/download',
        name: 'download',
        component: Download
    },
    {
        path: '/import',
        name: 'import',
        component: Import
    },
    {
        path: '/',
        name: 'App',
        component: App
    },
]

export default new Router({
    mode: 'history',
    routes: routes
})