import Vue from 'nativescript-vue';

import store from './store';

import HelloWorld from './components/HelloWorld';

// Uncommment the following to see NativeScript-Vue output logs
// Vue.config.silent = false;

new Vue({

    render: h => h('frame', [h(HelloWorld)])

}).$start();