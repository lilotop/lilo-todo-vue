<template>
    <div class="about">
        <img src="../assets/logo.png" alt="logo" @click="logoClick">
        <audio src="../assets/KiP.mp3"></audio>
        <h4>No UI/CSS libraries were hurt (or used) during the development of this app.</h4>
        <h4>Created by Lilo Elia, 2020</h4>
        <h5>Source code available <a href="https://github.com/lilotop/lilo-todo-vue" target="_blank">here</a> (frontend) and
            <a href="https://github.com/lilotop/lilo-todo-server" target="_blank">here</a> (backend)
        </h5>
        <Toast ref="toast"></Toast>
    </div>
</template>
<script>
    import Toast from "../components/Toast";

    export default {
        name: 'About',
        components: { Toast },
        data() {
            return {
                clicks: 0
            }
        },
        methods: {
            logoClick() {
                if (this.clicks === 7) {
                    this.$refs.toast.popInfo('Knowledge is Power');
                    this.$el.querySelector('audio').play();
                    this.clicks = 0;
                } else {
                    this.clicks++;
                }
            }
        }
    }
</script>
<style scoped lang="scss">
    .about {
        display: flex;
        flex-direction: column;
        align-items: center;

        img {
            width: 80vw;
            max-width: 691px;
        }
    }
</style>
