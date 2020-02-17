<template>
    <div class="nav-menu" :class="{open: isOpen}">
        <span v-for="link in links" class="nav-menu__link">
            <router-link v-if="link.path" :to="link.path">{{link.label}}</router-link>
            <a href="" v-if="link.handler" @click="link.handler">{{link.label}}</a>
        </span>
        <button class="nav-menu__toggle btn" @click="isOpen = !isOpen">{{isOpen ? '&#9650;' : '&#9776;'}}</button>
    </div>

</template>

<script>
    export default {
        name: "NavMenu",
        data() {
            return {
                isOpen: false,
            }
        },
        props: {
            links: Array
        }
    }
</script>

<style scoped lang="scss">
    .nav-menu {

        a {
            color: #2c3e50;
            margin: 0 10px;

            &.router-link-active {
                color: #42b983;
            }
        }

        .nav-menu__toggle {
            display: none;
        }

    }
    @media screen and (max-width: 700px) {
        .nav-menu .nav-menu__link {
            display: none;
        }
        .nav-menu.open {
            display: flex;
            flex-direction: column;
            border: 1px solid #ccc;
            padding: 5px;
            .nav-menu__link {
                display: block;
                margin: 10px;
            }
        }
        .nav-menu .nav-menu__toggle {
            display: block;
            align-self: flex-end;
        }
    }
</style>
