
//import Vue from './packages/vue.mjs' Currently not possible, vuetify doesnt like vue EMS
import httpVueLoader from './packages/ems/httpVueLoader.mjs'
import VueRouter from './packages/ems/vue-router.mjs'

import store from './store/index.mjs'




let url = 'apps/apps.json';
fetch(url).then(async (res) => {
    let apps = await res.json();

    let routes = [{
        path: '/about',
        component: httpVueLoader('./views/about.vue'),
        name: "About Us Page",
        meta: { position: "top"}
    }, {
        path: '/settings',
        component: httpVueLoader('./views/settings.vue'),
        name: 'settings page',
        meta: { position: "top"}
    }
    ];
    for (let app of apps) { // Loop all apps from 3bot
        for (const route of app.routes) { // loop all routes of the app from 3bot
            routes.push(
                {
                    path: `/${app.name}${route.path}`,
                    component: httpVueLoader(`/apps/${app.name}/${route.component}`),
                    name: `${app.name}-${route.name}`,
                    meta: { position: "top"}
                }
            )
        }
    }
    const router = new VueRouter({
        routes
    })
    window.router = router;

    new Vue({
        el: '#app', // This should be the same as your <div id=""> from earlier.
        vuetify: new Vuetify({
            iconfont: 'fa',
            theme: {
              themes: {
                light: {
                  primary: '#2d4052',
                  secondary: '#57be8e'
                }
              }
            }
          }),
        components: {
            'app': httpVueLoader('./App/index.vue'),
        },
        router,
        store,
        template: '<app></app>'
    })

})