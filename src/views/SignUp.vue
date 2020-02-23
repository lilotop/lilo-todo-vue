<template>
    <div class="login">
        <form @submit.prevent="signUp">
            <img src="../assets/logo.png" alt="logo">
            <p>Welcome to Lilo's TODO application, please complete this form to sign up</p>
            <p>Already have an account?
                <router-link to="/login">Login</router-link>
                to your account
            </p>
            <div class="form">
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
            </div>
        </form>
        <ModalBox v-if="modalOpen" title="Sign up failed" hide-cancel @ok="modalOpen = !modalOpen">
            {{errorMessage}}
        </ModalBox>
        <BlockUI :block="blockUI" :text="`Signing up '${user}'...`"></BlockUI>
    </div>
</template>
<script>
    import services from "../services";
    import ModalBox from "../components/ModalBox";
    import BlockUI from "../components/BlockUI";
    import { get, some } from 'lodash';

    export default {
        name: 'signUp',
        components: { BlockUI, ModalBox },
        data() {
            return {
                user: '',
                email: '',
                password: '',
                passwordRepeat: '',
                modalOpen: false,
                errorMessage: '',
                blockUI: false,
            }
        },
        methods: {
            async signUp() {

                this.errorMessage = '';
                if (this.password !== this.passwordRepeat) {
                    this.errorMessage = 'Passwords do not match!';
                }
                if (some([this.user, this.email, this.password, this.passwordRepeat], value => value.length === 0)) {
                    this.errorMessage = 'All fields are mandatory, please complete the form';
                }

                if (this.errorMessage) {
                    this.modalOpen = true;
                    return;
                }

                try {
                    this.blockUI = true;
                    let res = await services.signUp(this.user, this.email, this.password);
                    this.$cookies.set('token', res.data.token, '7d');
                    await this.$router.push({ name: 'todos' });
                } catch (e) {
                    if (get(e, 'response.status') === 401) {
                        this.errorMessage = 'Incorrect user name or password.';
                    } else {
                        this.errorMessage = 'Could not sign up. Please try again later.'
                    }
                    this.modalOpen = true;
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
