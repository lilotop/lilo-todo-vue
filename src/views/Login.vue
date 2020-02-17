<template>
    <div class="login">
        <form @submit.prevent="login">
            This is a demo version of the app, so the credentials are pre-filled. <br>
            Just click the LOGIN button to continue. <br>
            <input type="text" v-model="user">
            <input type="password" v-model="password">
            <button class="btn">Login</button>
        </form>
    </div>
</template>
<script>
    import services from "../services";

    export default {
        name: 'login',
        data() {
            return {
                user: 'red',
                password: '123456'
            }
        },
        methods: {
            async login() {
                let res = await services.login(this.user, this.password);
                this.$cookies.set('token',res.data.token,'7d');
                this.$router.push({name:'todos'});
            }
        }
    }
</script>
<style scoped>
</style>
