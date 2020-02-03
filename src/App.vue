<template>
    <div id="app">
        <div class="app__masthead">
            <div class="app__title">TODO App <span v-if="email"> - {{email}}</span></div>
            <div class="app__nav">
                <router-link v-if="email" to="/todos">Todos</router-link>
                <router-link v-if="email" to="/projects">Projects</router-link>
                <router-link to="/about">About</router-link>
                <a href="" v-if="email" @click="logout">Logout</a>
                <router-link v-if="!email" to="/login">Login</router-link>
            </div>
        </div>
        <router-view/>
    </div>
</template>

<script>
    import store from "./store";
    import services from "./services";

    export default {
        methods: {
            logout() {
                store.reset();
                services.logout();
                this.$router.push({name: 'login'});
            }
        },
        computed: {
            email() {
                return store.user.email;
            }
        }
    }
</script>

<style lang="scss">
    @import "main";

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        margin: 50px;
        box-shadow: 0 0 30px 4px rgba(0, 0, 0, 0.3);
        padding: 30px;
    }

    .app__masthead {
        margin-bottom: 60px;
        display: flex;
        justify-content: space-between;
        font-weight: bold;
        color: #2c3e50;

        .app__nav {

            a {
                color: #2c3e50;
                margin: 0 10px;

                &.router-link-active {
                    color: #42b983;
                }
            }
        }
    }


    .check-box {
        border: 1px solid darkgray;

        &.readonly {
            border: none;
        }

        .check-mark {
            fill: $primary;
        }

        &:focus {
            outline: black auto 2px;
        }
    }

    .btn {
        border: none;
        background: $primary;
        color: $text_on-primary;
        text-transform: uppercase;
        padding: 6px 10px;
        cursor: pointer;
        &:focus {
            outline: black auto 2px;
        }
    }

</style>
