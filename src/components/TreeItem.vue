<template>
    <div :class="classes" @click="select">
        <h3>{{item.name}}</h3>
        <p class="age">{{item.age}}</p>
    </div>
</template>

<script>
    import {
        mapGetters,
        mapMutations
    } from 'vuex';

    import {
        APP_NAMESPACE
    } from '../constants/vuex';

    export default {
        name: 'tree_item',

        props: {
            item: {
                type: Object,
                required: true
            },
            level: {
                type: Number,
                required: true
            }
        },

        computed: {
            ...mapGetters(APP_NAMESPACE, [
               'getItems'
            ]),

            classes() {
                let result = ['tree_item'];

                if (this.childCount > 0) {
                    result.push('multiple');
                }

                if (this.item.selected) {
                    result.push('selected');
                }

                return result;
            },

            childCount() {
                return this.getItems(this.item.id).length;
            }

        },

        methods: {
            ...mapMutations(APP_NAMESPACE, [
                'selectItem'
            ]),

            select() {
                if (this.childCount == 0) {
                    return false;
                }
                let payload = {
                    ...this.item,
                    level: this.level
                };
                this.selectItem(payload);
            }
        }
    }
</script>