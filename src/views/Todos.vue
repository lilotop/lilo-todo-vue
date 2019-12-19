<template>
    <div class="todos">
        <div class="todos__filter">Filter by project: <ProjectSelector v-model="projectFilter" :all="ALL_PROJECTS"/> </div>
        <List :columns="columns" :items="todos" @selected="showTodo"/>
        <ModalBox v-if="modalOpen" :title="todoForModal.title" ok-button-text="Save" @ok="saveChanges" @cancel="closeModal">
            <TodoEditor :todo="todoForModal"/>
        </ModalBox>
    </div>
</template>

<script>
    import store from '../store';
    import { getPriorityName, getShortDateTime } from '../utils';
    import {cloneDeep} from 'lodash';
    import List from '../components/List';
    import ProjectSelector from '../components/ProjectSelector';
    import ModalBox from '../components/ModalBox';
    import TodoEditor from '../components/TodoEditor';

    export default {
        name: 'todos',
        components: {
            TodoEditor,
            ModalBox,
            List, ProjectSelector
        },
        props: {
            project: String
        },
        data() {
            return {
                todoForModal: {},
                modalOpen: false,
                ALL_PROJECTS: 'all',
                NO_PROJECT: 'none',
                columns: [
                    {
                        header: 'Title',
                        field: 'title',
                    },
                    {
                        header: 'Created',
                        field: 'createdAt',
                        formatter: this.getDateTime
                    },
                    {
                        header: 'Modified',
                        field: 'modifiedAt',
                        formatter: this.getDateTime
                    },
                    {
                        header: 'Project',
                        field: 'project',
                        formatter: this.getProjectName
                    },
                    {
                        header: 'Priority',
                        field: 'priority',
                        formatter: this.getPriorityName
                    },
                    {
                        header: 'Done',
                        field: 'done',
                        type: Boolean
                    }

                ]
            }
        },
        computed: {
            todos() {
                if(this.projectFilter === this.ALL_PROJECTS) {
                    return store.todos;
                }
                else {
                    return store.getTodosByProject(this.projectFilter);
                }
            },
            projectFilter: {
                get() {
                    // handling the conflict:
                    // in data - an undefined project id means no project
                    // in url - an undefined project id means all projects
                    if(!this.project){
                        return this.ALL_PROJECTS;
                    }
                    else if(this.project === this.NO_PROJECT) {
                        return undefined;
                    }
                    else {
                        return this.project;
                    }

                },
                set(projectId) {
                    // don't send an empty project id in the url because this means 'all projects'
                    this.$router.push({ name: 'todos', query: {project: projectId || this.NO_PROJECT }});
                }
            }
        },
        methods: {
            getDateTime(isoDate) {
                return getShortDateTime(isoDate);
            },
            getProjectName(projectId) {
                let project = store.getProject(projectId);
                return project ? project.name : 'None';
            },
            getPriorityName(priority) {
              return getPriorityName(priority)
            },
            showTodo(todo) {
                this.todoForModal = cloneDeep(todo);
                this.modalOpen = true;
            },
            closeModal() {
                this.modalOpen = false;
                this.todoForModal = {};
            },
            saveChanges() {
                // todo - save to store/server
                this.modalOpen = false;
                this.todoForModal = {};
            }
        },
        async beforeRouteEnter(routeTo, routeFrom, next) {
            await store.loadFromServer();
            next();


        }
    }
</script>

<style scoped>
    .todos__filter {
        margin-bottom: 20px;
    }
</style>
