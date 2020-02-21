<template>
    <div class="login">
        <form @submit.prevent="login">
            <img src="../assets/logo.png" alt="logo">
            <p>This is a demo version of the app, so the credentials are pre-filled.</p>
            <p>Just click the LOGIN button to continue.</p>
            <div class="form">
                <label for="username">Name</label>
                <input type="text" id="username" v-model="user">
                <label for="password">Password</label>
                <input type="password" id="password" v-model="password">
                <button class="btn">Login</button>
            </div>
        </form>
        <ModalBox v-if="modalOpen" title="Cannot Login" hide-cancel @ok="modalOpen = !modalOpen">
            {{errorMessage}}
        </ModalBox>
        <BlockUI :block="blockUI" text="Logging in user..."></BlockUI>
    </div>
</template>
<script>
    import services from "../services";
    import ModalBox from "../components/ModalBox";
    import BlockUI from "../components/BlockUI";
    import { get } from 'lodash';

    export default {
        name: 'login',
        components: { BlockUI, ModalBox },
        data() {
            return {
                user: 'red',
                password: '123456',
                modalOpen: false,
                errorMessage: '',
                blockUI: false,
            }
        },
        methods: {
            async login() {
                try {
                    this.blockUI = true;
                    let res = await services.login(this.user, this.password);
                    this.$cookies.set('token', res.data.token, '7d');
                    await this.$router.push({ name: 'todos' });
                } catch (e) {
                    if (get(e, 'response.status') === 401) {
                        this.errorMessage = 'Incorrect user name or password.';
                    } else {
                        this.errorMessage = 'Could not login. Please try again later.'
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
