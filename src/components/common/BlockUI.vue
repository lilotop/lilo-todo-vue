<template>
    <div class="blocker" v-if="block">
        <div class="text">{{text}}</div>
    </div>
</template>

<script>
    export default {
        name: "BlockUI",
        props: {
            text: String,
            block: Boolean
        }
    }
</script>

<style scoped>
    .blocker {
        background: rgba(100, 100, 100, 0.9);
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: wait;
    }

    .text {
        font-size: 20px;
        font-weight: bold;
        font-style: italic;
    }

</style>
