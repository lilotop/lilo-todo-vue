<template>
    <div class="background" @click="closeInfo" v-if="isVisible">
        <div class="info-box">
            <p class="title">Please correct the following validation errors to continue</p>
            <div class="validation-error" v-for="error in errors">
                {{error}}
            </div>
            <p class="close-tip">click anywhere to close this dialog</p>
        </div>
    </div>
</template>

<script>

    function getValue(id) {
        let node = document.getElementById(id);
        if (node) {
            return node.value;
        } else {
            console.error(`Validation: field with id '${id}' was not found in document`);
            return '';
        }
    }

    export default {
        name: "FormValidation",
        data() {
            return {
                isVisible: false,
                errors: []
            }
        },
        props: {
            rules: Array
        },
        methods: {
            closeInfo() {
                this.isVisible = false;
            },
            validate() {
                this.errors = [];
                for (let rule of this.rules) {
                    switch (rule.type) {
                        case 'required':
                            if (getValue(rule.id).length === 0) {
                                this.errors.push(`${rule.name} is required`);
                            }
                            break;
                        case 'email':
                            let value = getValue(rule.id);
                            if (value.length && /\S+@\S+\.\S+/.exec(value) === null) {
                                this.errors.push(`${rule.name}: ${value} is not a valid email`);
                            }
                            break;
                        case 'match':
                            let value1 = getValue(rule.id1);
                            let value2 = getValue(rule.id2);
                            if (value1 !== value2) {
                                this.errors.push(`${rule.name} fields do not match`);
                            }
                            break;
                        default:
                            console.error(`Validation rule of type ${rule.type} is not supported`);
                    }
                }
                if (this.errors.length) {
                    this.isVisible = true;
                    return false;
                } else {
                    return true;
                }
            }
        }
    }
</script>

<style scoped lang="scss">

    .background {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.2);

        .info-box {
            min-width: 30%;
            max-width: 80%;
            padding: 20px;
            text-align: center;
            color: white;
            box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.6);
            background: orangered;

            .title {
                color: rgba(255, 255, 255, 0.8);
                font-weight: bold;
            }
            .close-tip {
                color: rgba(255, 255, 255, 0.8);
            }
            .validation-error {
                border-top: 1px solid rgba(255, 255, 255, 0.5);
                padding: 5px;
                &:last-of-type {
                    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
                }
            }
        }
    }
</style>
