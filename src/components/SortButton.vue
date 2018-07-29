<template>
    <li :class="classes" @click="click">
        {{name}}
    </li>
</template>

<script>
    export default {
        name: 'sort-button',

        props: {
            name: String,
            selected: Boolean
        },

        computed: {
            classes() {
                let result = ['button'];

                if (this.selected) {
                    result.push('selected');
                }

                return result;
            }
        },

        methods: {
            click() {
                this.$emit("click");
            }
        }
    }
</script>