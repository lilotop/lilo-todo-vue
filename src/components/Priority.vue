<template>
<span class="priority">
    <span type="text" v-if="readonly" v-bind="$attrs">{{getLabel($attrs.value)}}</span>
    <select v-else v-bind="$attrs" @input="$emit('input', parseInt($event.target.value))" class="priority">
        <option v-for="p in 3" :value="p">{{getLabel(p)}}</option>
    </select>

</span>

</template>

<script>
    export default {
        name: "Priority",
        props: {
            readonly: {
                default: false
            }
        },
        methods: {
            getLabel(value) {
                switch(value) {
                    case 1:
                        return 'High';
                    case 2:
                        return 'None';
                    case 3:
                        return 'Low';
                }
            }
        }

    }
</script>

<style scoped>

</style>
