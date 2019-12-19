<template>
    <div class="projects">
        <List :columns="columns" :items="projects" @selected="projectSelected"/>
    </div>
</template>

<script>
    import store from '../store';
    import List from '../components/List';

    export default {
        name: 'projects',
        components: { List },
        async beforeRouteEnter(routeTo, routeFrom, next) {
            await store.loadFromServer();
            next();
        },
        methods: {
          projectSelected(project) {
              this.$router.push({ name: 'todos', query: {project: project._id }});
          }
        },
        data() {
            return {
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
