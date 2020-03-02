<template>
    <div class="modal__backdrop">
        <div class="modal" role="dialog" aria-modal="true">
            <div v-if="title" class="modal__header">
                <div class="modal__header__title">{{title}}</div>
                <button class="modal__header__menu-toggle" v-if="menuItems" @click="menuOpen = !menuOpen">{{menuOpen ? '&#9650;' : '&#9776;'}}</button>
                <div class="modal__header__menu" v-if="menuOpen" @click="menuOpen = !menuOpen">
                    <button v-for="menuItem in menuItems" class="btn" @click="menuItem.handler">{{menuItem.label}}</button>
                </div>
            </div>
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
        data() {
            return {
                menuOpen: false
            }
        },
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
            hideOK: Boolean,
            menuItems: Array
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
                    if (this.hideCancel) {
                        this.$emit('ok');
                    } else {
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

    @import '../../main';

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
        //overflow-x: auto;
        display: flex;
        flex-direction: column;
        min-width: 250px;
    }

    .modal__header {
        padding: 6px;
        background: $primary;
        color: $text_on-primary;
        position: relative;
        overflow: visible;
        display: flex;
        align-items: center;

        .modal__header__title {
            flex-grow: 1;
            padding-right: 5px;
        }

        .modal__header__menu-toggle {
            justify-self: end;
            height: 30px;
            width: 30px;
        }

        .modal__header__menu {
            position: absolute;
            right: 6px;
            top: 35px;
            display: flex;
            flex-direction: column;
            background-color: white;
            border: 1px solid #ccc;
            color: black;

            .btn {
                border: none;
                background-color: white;
                color: black;
                height: 30px;
                padding: 0 5px;
                text-transform: none;

                &:hover {
                    background-color: $primary;
                    color: $text_on-primary;
                }
            }
        }
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
        .modal__header {
            height: 40px;

            .modal__header__menu-toggle {
                height: 40px;
                width: 40px;
            }

            .modal__header__menu {
                right: 7px;
                top: 45px;
                .btn {
                    height: 60px;
                }
            }
        }
    }

</style>
