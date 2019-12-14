<template>
    <span class="check-box" @click="$emit('input',!value)" :tabindex="isReadOnly ? '': 0" @keypress.space="$emit('input',!value)">
        <img src="../assets/check-green.png" alt="v" v-if="value || checked">
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

<style scoped>
    .check-box:focus {
        outline: black auto 2px;
    }

</style>
