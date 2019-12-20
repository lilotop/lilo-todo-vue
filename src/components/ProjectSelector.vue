<template>
<span class="project-selector">
    <span type="text" v-if="readonly" v-bind="$attrs">{{getName($attrs.value)}}</span>
    <select v-else v-bind="$attrs" @input="$emit('input', $event.target.value)" class="project" :title="getDescription($attrs.value)">
        <option v-if="all" :value="all" :title="getDescription(all)">All</option>
        <option :value="undefined" :title="getDescription()">None</option>
        <option v-for="project in projects" :value="project._id" :title="project.description">{{project.name}}</option>
    </select>

</span>

</template>

<script>
    import store from "../store";

    export default {
        name: "ProjectSelector",
        props: {
            readonly: Boolean,
            all: String
        },
        computed: {
            projects() {
                return store.projects;
            }
        },
        methods: {
            getName(projectId) {
                let project = store.getProject(projectId);
                return project ? project.name : 'None';
            },
            getDescription(projectId) {
                if(!projectId){
                    return 'Not assigned to any project';
                } else if (this.all && projectId === this.all){
                    return 'Show all projects';
                }
                else {
                    let project = store.getProject(projectId);
                    return project.description || ''; // in case the user did not provide a description
                }
            }
        },
    }
</script>

<style scoped>
    select:focus {
        outline: black auto 2px;
    }

</style>
