<template>
    <div id="app">
        <OfflineIndicator></OfflineIndicator>
        <div class="app__masthead">
            <div class="app__title">Lilo's TODO<span v-if="email"> - {{email}}</span></div>
            <NavMenu :links="navLinks"></NavMenu>
        </div>
        <router-view/>
    </div>
</template>

<script>
    import store from "./store";
    import server from "./server";
    import OfflineIndicator from "./components/common/OfflineIndicator";
    import NavMenu from "./components/common/NavMenu";

    export default {
        components: { NavMenu, OfflineIndicator },
        methods: {
            logout() {
                store.reset();
                server.logout();
                this.$router.push({ name: 'login' });
            }
        },
        computed: {
            email() {
                return store.user.email;
            },
            navLinks() {
                let links = [];
                if (this.email) {
                    links.push({ label: 'Todos', path: '/todos' });
                    links.push({ label: 'Projects', path: '/projects' });
                }
                links.push({ label: 'About', path: '/about' });
                if (this.email) {
                    links.push({ label: 'Logout', handler: this.logout });
                } else {
                    links.push({ label: 'Login', path: '/login' });
                    links.push({ label: 'SignUp', path: '/sign-up' });
                }
                return links;
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
        align-items: center;
        font-weight: bold;
        color: #2c3e50;
        position: sticky;
        top: 0;
        padding: 10px;
        background-color: white;
        border: 1px solid #ccc;
    }

    @media screen and (max-width: 700px) {

        #app {
            margin: 0;
        }
        .app__masthead {
            margin-bottom: 30px;
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

    input, textarea {
        &:focus {
            outline: $primary auto 1px;
        }
    }

    a {
        color: #2c3e50;
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
