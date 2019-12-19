<template>
    <div id="app">
        <div class="app__masthead">
            <div class="app__title">TODO App - Edit but no save</div>
            <div class="app__nav">
                <router-link to="/todos">Todos</router-link>
                |
                <router-link to="/projects">Projects</router-link>
                |
                <router-link to="/about">About</router-link>
            </div>
        </div>
        <router-view/>
    </div>
</template>

<style lang="scss">
    @import "main";

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        margin: 50px;
        box-shadow: 0px 0px 30px 4px rgba(0, 0, 0, 0.3);
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

</style>
