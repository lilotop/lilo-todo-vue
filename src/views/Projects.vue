<template>
    <div class="projects">
        <List :columns="columns" :items="projects" @selected="projectSelected"/>
        <BlockUI :block="blockUI" :text="blockMessage"></BlockUI>
    </div>
</template>

<script>
    import store from '../store';
    import List from '../components/List';
    import BlockUI from "../components/BlockUI";

    export default {
        name: 'projects',
        components: { BlockUI, List },
        async mounted() {
            this.blockMessage = 'Loading projects from server...';
            this.blockUI = true;
            await store.loadFromServer();
            this.blockUI = false;
        },
        methods: {
          projectSelected(project) {
              this.$router.push({ name: 'todos', query: {project: project._id }});
          }
        },
        data() {
            return {
                blockUI: false,
                blockMessage: '',
                columns: [
                    {
                        header: 'Project',
                        field: 'name',
                    },
                    {
                        header: 'Description',
                        field: 'description'
                    }
                ]
            }
        },
        computed: {
            projects() {
                return store.projects;
            }
        }
    }
</script>

<style scoped>
    .projects {
        margin-top: 39px;
    }
</style>
