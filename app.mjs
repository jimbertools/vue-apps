import Vue from './packages/vue.mjs'
import VueRouter from './packages/vue-router.mjs'
import httpVueLoader from './packages/httpVueLoader.mjs'


Vue.use(VueRouter)

let url = 'apps/apps.json';

fetch(url).then(async (res) => {
    let apps = await res.json();

    let routes = [{
        path: '/about',
        component: httpVueLoader('./views/about.vue'),
        name: "About Us Page"
    }, {
        path: '/settings',
        component: httpVueLoader('./views/settings.vue'),
        name: 'settings page'
    }
    ];
    for(let app of apps){ // Loop all apps from 3bot
        console.log(app)
        for (const route of app.routes) { // loop all routes of the app from 3bot
            routes.push(
                {
                    path: `/${app.name}${route.path}`,
                    component: httpVueLoader(`/apps/${app.name}/${route.component}`),
                    name: `${app.name}-${route.name}`
                }
            )
        }
    }
    console.log(routes)
    const router = new VueRouter({
      routes
    })

  
    new Vue({
        el: '#app', // This should be the same as your <div id=""> from earlier.
        components: {
            'app': httpVueLoader('./templates/app.vue'),
        },
        router,
        template: '<app></app>'
    })



})
