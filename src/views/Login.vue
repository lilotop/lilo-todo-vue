<template>
    <main class="login">
        <form @submit.prevent="login">
            <img src="../assets/logo.png" alt="logo">
            <p>Welcome to Lilo's TODO application, please login to continue</p>
            <p>Don't have an account yet? You can
                <router-link to="/sign-up">sign up</router-link>
                for free
            </p>
            <section class="form">
                <label for="username">Name</label>
                <input type="text" id="username" v-model="user">
                <label for="password">Password</label>
                <input type="password" id="password" v-model="password">
                <span>
                    <button class="btn">Login</button> or <router-link to="/sign-up">sign up</router-link> for free</span>
            </section>
        </form>
        <Toast ref="toast"></Toast>
        <BlockUI :block="blockUI" text="Logging in user..."></BlockUI>
        <FormValidation ref="validation" :rules="validationRules"></FormValidation>
    </main>
</template>
<script>
    import services from "../services";
    import ModalBox from "../components/ModalBox";
    import BlockUI from "../components/BlockUI";
    import get from 'lodash-es/get';
    import Toast from "../components/Toast";
    import FormValidation from "../components/FormValidation";

    export default {
        name: 'login',
        components: { FormValidation, Toast, BlockUI, ModalBox },
        data() {
            return {
                user: '',
                password: '',
                blockUI: false,
                validationRules: [
                    {type: 'required', id: 'username', name: 'Name'},
                    {type: 'required', id: 'password', name: 'Password'},
                ]
            }
        },
        methods: {
            async login() {

                if(!this.$refs.validation.validate()){
                    // has validation errors, abort
                    return;
                }

                try {
                    this.blockUI = true;
                    let res = await services.login(this.user, this.password);
                    this.$cookies.set('token', res.data.token, '7d');
                    await this.$router.push({ name: 'todos' });
                } catch (e) {
                    if (get(e, 'response.status') === 401) {
                        this.$refs.toast.popError('Incorrect user name or password.');
                    } else {
                        this.$refs.toast.popError('Could not login. Please try again later.');
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
