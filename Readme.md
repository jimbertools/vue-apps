# Frontend getting started

## Serve for development

```
http-server
```
> if needed you can install this with `npm i -g http-server`



## Info

Attempt to run full blown vue project with dependencies without using any package manger. Vue.js already has support for this using EMS modules, unfortunately this is not the case for some other deps such as Vuetify.


## Types of packages

### EMS
New EMS Javascript packages can be loaded like this:
```
<script type="module" src="app.mjs"></script>
```

Or like this:
```
import httpVueLoader from './packages/ems/httpVueLoader.mjs'
```

### Native packages
Native, browser compatible JS packages can be loaded like this:
```
<script src='packages/legacy/vue.js'></script>
```

### Node modules
Node modules use the require('') function from nodejs and can be loaded like this 
```
requirejs(["packages/require/bip39/bip39.browserify.min", "packages/legacy/sodium/libsodium"], function (bip39, libsodium) {
console.log(bip39.wordlists.english)

}
```


## Dynamic loading

Because no compiling is needed, we can load Vue components straight from the main app. This means sections of the SPA can be added on the fly. 

- An API call is made to for instance /api/components.json
- Each component has an entry with it's routes, maybe an icon etc
- Components can be added anywhere in the app.





