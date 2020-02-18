<template>
    <div class="login">
        <form @submit.prevent="login">
            This is a demo version of the app, so the credentials are pre-filled. <br>
            Just click the LOGIN button to continue. <br>
            <input type="text" v-model="user">
            <input type="password" v-model="password">
            <button class="btn">Login</button>
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
    import {get} from 'lodash';

    export default {
        name: 'login',
        components: { BlockUI, ModalBox },
        data() {
            return {
                user: 'red',
                password: '123456',
                modalOpen: false,
                errorMessage:'',
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
                    if(get(e,'response.status') === 401) {
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
<style scoped>
</style>
