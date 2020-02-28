<template>
    <div class="toast-background" @click="closeToast" v-if="isVisible">
        <div class="toast-box" :class="type">
            {{text}}
        </div>
    </div>
</template>

<script>
    export default {
        name: "Toast",
        data() {
            return {
                text: '',
                isVisible: false,
                type: ''
            }
        },
        methods: {
            closeToast() {
                this.isVisible = false;
                if (this.timeoutHandle) {
                    clearTimeout(this.timeoutHandle);
                    this.timeoutHandle = null;
                }
            },
            pop(text, type, timeout) {
                this.closeToast();
                this.type = type;
                this.text = text;
                this.isVisible = true;
                this.timeoutHandle = setTimeout(()=> this.isVisible = false, timeout);
            },
            popError(text) {
                this.pop(text, 'error', 3000);
            },
            popInfo(text) {
                this.pop(text, 'info', 3000);
            },
            popSuccess(text) {
                this.pop(text, 'success', 1000);
            }
        }
    }
</script>

<style scoped lang="scss">

    .toast-background {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.2);

        .toast-box {
            min-width: 30%;
            max-width: 80%;
            padding: 20px;
            text-align: center;
            color: white;
            box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.6);

            &.error {
                background: rgba(200, 10, 10, 1);
            }

            &.info {
                background: rgb(26, 96, 133);
            }

            &.success {
                background: rgba(66, 185, 131, 1);
            }
        }
    }
</style>
