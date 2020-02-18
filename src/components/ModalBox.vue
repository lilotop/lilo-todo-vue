<template>
    <div class="modal__backdrop">
        <div class="modal" role="dialog" aria-modal="true">
            <div v-if="title" class="modal__header">{{title}}</div>
            <div class="modal__body">
                <slot><i>no content</i></slot>
            </div>
            <div class="modal__buttons">
                <button class="btn" @click="$emit('ok')" v-if="!hideOK">{{okButtonText}}</button>
                <button class="btn" @click="$emit('cancel')" v-if="!hideCancel">{{cancelButtonText}}</button>
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
            hideCancel: Boolean,
            hideOK: Boolean
        },
        mounted() {
            window.addEventListener('keydown', this.handleKey);
        },
        beforeDestroy() {
            window.removeEventListener('keydown', this.handleKey);
        },
        methods: {
            handleKey(e) {
                if (e.keyCode === 27) {
                    if(this.hideCancel){
                        this.$emit('ok');
                    }else {
                        this.$emit('cancel');
                    }
                }
                if (e.keyCode === 9) {
                    let focusable = this.$el.querySelectorAll('input,button,select,.check-box');
                    if (focusable.length) {
                        let first = focusable[0];
                        let last = focusable[focusable.length - 1];
                        let shift = e.shiftKey;
                        if (shift) {
                            if (e.target === first) {
                                last.focus();
                                e.preventDefault();
                            }
                        } else {
                            if (e.target === last) {
                                first.focus();
                                e.preventDefault();
                            }
                        }
                    }
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
        padding: 10px;
    }

    .modal__buttons {
        display: flex;
        justify-content: space-evenly;

        .btn {
            margin: 10px;
            flex-grow: 1;
            flex-basis: 0;
        }
    }
    @media screen and (max-width: 700px) {
        .btn {
            height: 60px;
        }
    }

</style>
