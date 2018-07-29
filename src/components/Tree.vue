<template>
    <transition name="fade">
        <div class="tree">
            <h2>{{name}}</h2>

            <TreeItem
                v-for="(item,key) in items"
                :key="key"
                :item="item"
                :level="level"
            />
        </div>
    </transition>
</template>

<script>
    import {
        mapGetters,
        mapState
    } from 'vuex';

    import * as SortTypes from '../constants/sort';
    import TreeItem from './TreeItem.vue';

    import {
        APP_NAMESPACE
    } from '../constants/vuex';

    export default {
        name: 'tree',

        props: {
            name: {
                type: String,
                required: false,
                default: 'Root'
            },
            level: {
                type: Number,
                required: true,
                default: null
            },
            parent: {
                required: true
            }
        },

        components: {
            TreeItem
        },

        computed: {
            ...mapState(APP_NAMESPACE, {
                'sort': state => state.sort
            }),

            ...mapGetters(APP_NAMESPACE, [
                'getItems'
            ]),

            items() {
                let items = this.getItems(this.parent);

                switch (this.sort) {
                    case SortTypes.SORT_BY_AGE:
                        items.sort((obj1, obj2) => {
                            return obj1.age > obj2.age;
                        });
                        break;
                    case SortTypes.SORT_BY_NAME:
                        items.sort((obj1, obj2) => {
                            return obj1.name > obj2.name;
                        });
                        break;
                }

                return items;
            }
        }
    }
</script>

<style>
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
</style>