<template>
    <div class="todos">
        <div class="todos__controls">
            <button class="todos__controls__create-button btn" @click="newTodo">Create New Todo</button>
            <div class="todos__controls__filter">Filter by project:
                <ProjectSelector v-model="projectFilter" :all="ALL_PROJECTS"/>
            </div>
        </div>
        <List :columns="columns" :items="todos" @selected="showTodo"/>

        <!-- helper components -->
        <ModalBox v-if="modalOpen" :title="todoForModal.title || '< untitled >'" ok-button-text="Save" @ok="saveChanges" @cancel="closeModal">
            <TodoEditor :todo="todoForModal"/>
        </ModalBox>
        <BlockUI :block="blockUI" :text="blockMessage"></BlockUI>
    </div>
</template>

<script>
    import store from '../store';
    import { getPriorityName, getShortDateTime } from '../utils';
    import { cloneDeep } from 'lodash';
    import List from '../components/List';
    import ProjectSelector from '../components/ProjectSelector';
    import ModalBox from '../components/ModalBox';
    import TodoEditor from '../components/TodoEditor';
    import BlockUI from "../components/BlockUI";

    export default {
        name: 'todos',
        components: {
            BlockUI,
            TodoEditor,
            ModalBox,
            List, ProjectSelector
        },
        props: {
            project: String
        },
        data() {
            return {
                blockUI: false,
                todoForModal: {},
                modalOpen: false,
                blockMessage: '',
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
                if (this.projectFilter === this.ALL_PROJECTS) {
                    return store.todos;
                } else {
                    return store.getTodosByProject(this.projectFilter);
                }
            },
            projectFilter: {
                get() {
                    // handling the conflict:
                    // in data - an undefined project id means no project
                    // in url - an undefined project id means all projects
                    if (!this.project) {
                        return this.ALL_PROJECTS;
                    } else if (this.project === this.NO_PROJECT) {
                        return undefined;
                    } else {
                        return this.project;
                    }

                },
                set(projectId) {
                    // don't send an empty project id in the url because this means 'all projects'
                    this.$router.push({ name: 'todos', query: { project: projectId || this.NO_PROJECT } });
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
            newTodo() {
                this.todoForModal = {};

                // if we're filtered on specific project, preselect this project for the new item
                let project = this.$route.query.project;
                if(project && project !== this.NO_PROJECT && project !== this.ALL_PROJECTS) {
                    this.todoForModal.project = project;
                }

                this.modalOpen = true;
            },
            closeModal() {
                this.modalOpen = false;
                this.todoForModal = {};
            },
            async saveChanges() {

                this.blockMessage = 'Saving changes...';
                this.blockUI = true;
                if(this.todoForModal._id) {
                    await store.updateTodo(this.todoForModal);
                } else {
                    await store.addTodo(this.todoForModal);
                }
                this.blockUI = false;
                this.modalOpen = false;
                this.todoForModal = {};
            }
        },
        async mounted() {
            this.blockMessage = 'Loading TODOs from server...';
            this.blockUI = true;
            await store.loadFromServer();
            this.blockUI = false;
        }
    }
</script>

<style scoped lang="scss">
    .todos__controls {
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .todos__controls__create-button {
            margin-right: 10px;
        }
        .todos__controls__filter {
            display: flex;
            .project-selector {
                margin-left: 10px;
            }

        }
    }
    @media screen and (max-width: 700px) {
        .todos__controls {
            .todos__controls__filter {
                flex-direction: column;

                .project-selector {
                    margin-left: 0;
                }
            }
            .btn {
                height: 60px;
            }
        }
    }

</style>
