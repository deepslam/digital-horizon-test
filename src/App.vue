<template>
  <div id="error" v-if="loadingError">Ошибка загрузки приложения, исходные данные не были получены</div>
  <div id="app" v-else>
    <div id="header">
      <ul>
        <li class="color_red">
          Sort
        </li>
        <sort-button name="By name" :selected="isItSortingByName" @click="sortByName"/>
        <sort-button name="By age" :selected="isItSortingByAge" @click="sortByAge"/>
      </ul>
    </div>
    <div id="content">
        <div id="content_flex">
            <Tree
                    v-for="(item, level) in levels"
                    :key="level"
                    :parent="item.parentId"
                    :name="item.name"
                    :level="level"
            />
        </div>
    </div>
  </div>
</template>

<script>
import {
    mapActions,
    mapMutations,
    mapState
} from 'vuex';
import _ from 'lodash';

import 'reset-css';

import * as SortTypes from './constants/sort';
import Tree from './components/Tree.vue';
import SortButton from './components/SortButton.vue';

import Styles from './scss/main.scss';
import {
    APP_NAMESPACE
} from './constants/vuex';

export default {
    name: 'app',

    components: {
        Tree,
        SortButton
    },

    data() {
        return {
            loadingError: false
        }
    },

    methods: {

        ...mapActions(APP_NAMESPACE, [
            'loadItems'
        ]),

        ...mapMutations(APP_NAMESPACE, [
            'setItems',
            'setSort'
        ]),

        sortByName() {
            this.setSort(SortTypes.SORT_BY_NAME);
        },
        sortByAge() {
            this.setSort(SortTypes.SORT_BY_AGE);
        }

    },

    computed: {
        ...mapState(APP_NAMESPACE, {
            'selected': state => state.selected,
            'sort': state => state.sort
        }),

        levels() {
            let result = [{
                parentId: null,
                name: 'Root'
            }];

            _.each(this.selected, i => {
                if (_.isObject(i)) {
                    result.push({
                        parentId: i.id,
                        name: i.name
                    });
                }
            });

            return result;
        },

        isItSortingByName() {
            return this.sort == SortTypes.SORT_BY_NAME;
        },
        isItSortingByAge() {
            return this.sort == SortTypes.SORT_BY_AGE;
        }

    },

    mounted() {
        this.loadItems().then(res => {
            this.setItems(res);
        }).catch(err => {
            this.loadingError = true;
        });
    }
}
</script>