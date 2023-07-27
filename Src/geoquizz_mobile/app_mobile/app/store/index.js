import Vue from 'nativescript-vue';
import Vuex from '../vuex';

Vue.use(Vuex);

const debug = 'debug';

const store = new Vuex.Store({
    modules: {

    },
    state: {
        closemodal: true
    },
    mutations: {
        closingModal(state) {
            if (state.closemodal) {
                state.closemodal = false;
            }
            else {
                state.closemodal = true;
            }
        }
    },
    strict: debug,
});

Vue.prototype.$store = store;

module.exports = store;