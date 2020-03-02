<template>
    <main class="login">
        <form @submit.prevent="signUp">
            <img src="../assets/logo.png" alt="logo">
            <p>Welcome to Lilo's TODO application, please complete this form to sign up</p>
            <p>Already have an account?
                <router-link to="/login">Login</router-link>
                to your account
            </p>
            <section class="form">
                <label for="username">Name</label>
                <input type="text" id="username" v-model="user">
                <label for="email">Email</label>
                <input type="text" id="email" v-model="email">
                <label for="password">Password</label>
                <input type="password" id="password" v-model="password">
                <label for="password-repeat">Retype the Password</label>
                <input type="password" id="password-repeat" v-model="passwordRepeat">
                <span>
                    <button class="btn">SIGN UP</button> or <router-link to="/login">login here</router-link></span>
            </section>
        </form>
        <BlockUI :block="blockUI" :text="`Signing up '${user}'...`"></BlockUI>
        <Toast ref="toast"></Toast>
        <FormValidation ref="validation" :rules="validationRules"></FormValidation>
    </main>
</template>
<script>
    import server from "../server";
    import ModalBox from "../components/common/ModalBox";
    import BlockUI from "../components/common/BlockUI";
    import get from 'lodash-es/get';
    import Toast from "../components/common/Toast";
    import FormValidation from "../components/common/FormValidation";

    export default {
        name: 'signUp',
        components: { FormValidation, Toast, BlockUI, ModalBox },
        data() {
            return {
                user: '',
                email: '',
                password: '',
                passwordRepeat: '',
                blockUI: false,
                validationRules: [
                    { type: 'required', id: 'username', name: 'Name' },
                    { type: 'required', id: 'email', name: 'Email' },
                    { type: 'email', id: 'email', name: 'Email' },
                    { type: 'minLength', value: 6, id: 'password', name: 'Password' },
                    { type: 'match', id1: 'password', id2: 'password-repeat', name: 'Password' },
                ]
            }
        },
        methods: {
            async signUp() {

                if (!this.$refs.validation.validate()) {
                    // has validation errors, abort
                    return;
                }

                try {
                    this.blockUI = true;
                    await server.signUp(this.user, this.email, this.password);
                    await this.$router.push({ name: 'todos' });
                } catch (e) {
                    if (get(e, 'response.status') === 401) {
                        this.$refs.toast.popError('Incorrect user name or password.');
                    } else {
                        let errorCategory = get(e, 'response.data.errorCategory');
                        if (errorCategory === 'duplicate') {
                            this.$refs.toast.popError('User or email already exists.');
                        } else {
                            this.$refs.toast.popError('Could not sign up. Please try again later.');
                        }
                    }

                } finally {
                    this.blockUI = false;
                }
            }
        }
    }
</script>
<style scoped lang="scss">
    .login {
        display: flex;
        flex-direction: column;
        align-items: center;

        img {
            width: 80vw;
            max-width: 500px;
        }

        p {
            text-align: center;
        }

        .form {
            display: flex;
            width: 200px;
            margin: 0 auto;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;

            label {
                font-size: 0.8em;
                align-self: flex-start;
                margin-bottom: 5px;
            }

            input {
                width: 100%;
                margin-bottom: 20px;
            }
        }
    }

</style>
