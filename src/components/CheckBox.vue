<template>
    <span
            class="check-box"
            @click="notifyToggle()"
            :tabindex="isReadOnly ? '': 0"
            @keypress.space="notifyToggle()"
            :class="{readonly: isReadOnly}">
        <span v-if="value || checked">
            <svg class="check-mark" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 40 40" :width="size" :height="size">
                <!--created with vectr.com (it's their built-in check-mark shape) -->
                <path d="M21.15 31.19L21.15 31.19L13.74 40L0 23.69L7.42 14.88L13.73 22.39L32.58 0L40 8.81L21.15 31.19Z"></path>
            </svg>
        </span>
        <span v-else>
            <svg xmlns="http://www.w3.org/2000/svg" :width="size" :height="size">
                <!--an empty placeholder for theming purposes -->
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
            id: String, // for tracking down the label that activates this checkbox
            value: Boolean, // for v-model usage
            size: {
                type: Number,
                default: 14
            }
        },
        methods: {
            notifyToggle() {
                if(!this.isReadOnly) {
                    this.$emit('input', !this.value);
                }
            }
        },
        computed: {
            isReadOnly() {
                return this.checked !== undefined;
            }
        },
        mounted() {
            if (this.id) {
                this.label = document.querySelector(`label[for="${this.id}"]`);
                if(this.label && this.label.onclick === null) {
                    this.label.onclick = () => this.notifyToggle();
                }
                else {
                    this.label = null;
                }
            }
        },
        beforeDestroy() {
            if(this.label) {
                this.label.onclick = null;
            }
        }
    }
</script>

<style scoped lang="scss">

</style>
