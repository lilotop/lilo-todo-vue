<template>
    <div class="modal__backdrop">
        <div class="modal">
            <div v-if="title" class="modal__header">{{title}}</div>
            <div class="modal__body">
                <slot><i>no content</i></slot>
            </div>
            <div class="modal__buttons">
                <button @click="$emit('ok')" v-if="!onlyCancel">{{okButtonText}}</button>
                <button @click="$emit('cancel')">{{cancelButtonText}}</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ModalBox",
        props: {
            title: String,
            okButtonText: {
                type: String,
                default: 'OK'
            },
            cancelButtonText: {
                type: String,
                default: 'Cancel'
            },
            onlyCancel: Boolean
        },
        mounted() {
            window.addEventListener('keyup', this.handleKey);
        },
        beforeDestroy() {
            window.removeEventListener('keyup', this.handleKey);
        },
        methods: {
            handleKey(e) {
                if (e.which === 27) {
                    this.$emit('cancel');
                }
            }
        }
    }
</script>

<style scoped lang="scss">

    @import '../main';

    .modal__backdrop {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.3);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .modal {
        background: #FFFFFF;
        box-shadow: 2px 2px 20px 1px;
        overflow-x: auto;
        display: flex;
        flex-direction: column;
        min-width: 250px;
    }

    .modal__header {
        padding: 6px;
        background: $primary;
        color: $text_on-primary;
    }

    .modal__body {
        padding: 20px;
    }

    .modal__buttons {
        button {
            border: none;
            background: $primary;
            color: $text_on-primary;
            text-transform: uppercase;
            padding: 6px 10px;
            margin: 10px;
            cursor: pointer;
            &:focus {
                outline: $highlight auto 2px;
            }
        }
    }
</style>
