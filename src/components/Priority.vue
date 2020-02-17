<template>
<span class="priority">
    <span v-if="readonly" v-bind="$attrs">{{getLabel($attrs.value)}}</span>
    <select v-else v-bind="$attrs" @input="$emit('input', parseInt($event.target.value))" class="priority">
        <option v-for="p in 3" :value="p">{{getLabel(p)}}</option>
    </select>

</span>

</template>

<script>
    import { getPriorityName } from "../utils";

    export default {
        name: "Priority",
        props: {
            readonly: {
                default: false
            }
        },
        methods: {
            getLabel(value) {
                return getPriorityName(value);
            }
        }

    }
</script>

<style scoped>
    select:focus {
        outline: black auto 2px;
    }

    @media screen and (max-width: 700px) {
        select {
            height: 40px;
        }
    }


</style>
