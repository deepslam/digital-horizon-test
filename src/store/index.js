import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import state from './state';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

import {
    APP_NAMESPACE
} from '../constants/vuex';

const module = {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}

export default new Vuex.Store({
    modules: {
        [APP_NAMESPACE]: module
    }
});