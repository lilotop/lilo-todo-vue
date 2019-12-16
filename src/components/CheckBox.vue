<template>
    <span class="check-box" @click="$emit('input',!value)" :tabindex="isReadOnly ? '': 0" @keypress.space="$emit('input',!value)">
        <span v-if="value || checked">
            <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 40 40" width="14" height="14">
                <!--created with vectr.com (it's their built-in check-mark shape-->
                <path d="M21.15 31.19L21.15 31.19L13.74 40L0 23.69L7.42 14.88L13.73 22.39L32.58 0L40 8.81L21.15 31.19Z"></path>
            </svg>
        </span>
    </span>
</template>

<script>
    export default {
        name: "CheckBox",
        props: {
            checked: { // for readonly access
                type: Boolean,
                default: undefined // so that we can check if this property was provided
            },
            value: Boolean // for v-model usage
        },
        computed: {
            isReadOnly() {
                return this.checked !== undefined;
            }
        },

    }
</script>

<style scoped lang="scss">
    @import "../main";

    .check-box:focus {
        outline: black auto 2px;
    }

    svg {
        fill: $primary;
    }

</style>
