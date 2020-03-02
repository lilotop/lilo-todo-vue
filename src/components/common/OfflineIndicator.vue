<template>
    <div class="offline-indicator" v-if="storeError">
        <div class="text">Cannot connect to the server ({{storeError}}). <a href="#" @click="tryToConnect()">retry</a> </div>
    </div>
</template>

<script>
    import store from "../../store";
    export default {
        name: "OfflineIndicator",
        computed: {
            storeError() {
                return store.error;
            }
        },
        methods: {
            tryToConnect() {
                store.loadFromServer(true);
            }
        }
    }
</script>

<style scoped lang="scss">
    .offline-indicator {
        background: rgba(200, 10, 10, 0.7);
        color: white;
        height: 30px;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 15px;
        font-style: italic;
        a {
            color: rgba(255,255,255,0.8);
        }
    }

</style>
