<template>
    <main class="todos">
        <section class="todos__controls">
            <button class="todos__controls__create-button btn" @click="newTodo">Create New Todo</button>
            <div class="todos__controls__filter">Filter by project:
                <ProjectSelector v-model="projectFilter" :all="ALL_PROJECTS"/>
            </div>
        </section>
        <List :columns="columns" :items="todos" @selected="showTodo"/>

        <!-- helper components -->
        <ModalBox v-if="modalOpen" :title="todoForModal.title || '< untitled >'" ok-button-text="Save"
                  @ok="saveChanges" @cancel="closeModal" :menu-items="editorMenuItems">
            <TodoEditor :todo="todoForModal"/>
        </ModalBox>
        <BlockUI :block="isUIBlocked" :text="blockMessage"></BlockUI>
        <Toast ref="toast"></Toast>
        <FormValidation ref="validation" :rules="validationRules"></FormValidation>
        <ModalBox v-if="showDeleteConfirm" title="Are you sure?" ok-button-text="Yes, DELETE!"
                  @ok="deleteTodo" @cancel="showDeleteConfirm = false">
            <h4>Delete this TODO item?</h4>
        </ModalBox>
    </main>
</template>

<script>
    import store from '../store';
    import { getPriorityName, getShortDateTime } from '../utils';
    import get from 'lodash-es/get';
    import cloneDeep from 'lodash-es/cloneDeep';
    import List from '../components/List';
    import ProjectSelector from '../components/ProjectSelector';
    import ModalBox from '../components/ModalBox';
    import TodoEditor from '../components/TodoEditor';
    import Toast from "../components/Toast";
    import FormValidation from "../components/FormValidation";
    import BlockUI from "../components/BlockUI";

    export default {
        name: 'todos',
        components: {
            BlockUI,
            FormValidation,
            Toast,
            TodoEditor,
            ModalBox,
            List, ProjectSelector
        },
        props: {
            project: String
        },
        data() {
            return {
                isUIBlocked: false,
                todoForModal: {},
                modalOpen: false,
                showDeleteConfirm: false,
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

                ],
                validationRules: [
                    { type: 'required', id: 'todo-title', name: 'Title' }
                ],
                editorMenuItems: null
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
            blockUI(message) {
                this.blockMessage = message;
                this.isUIBlocked = true;
            },
            unblockUI() {
                this.blockMessage = '';
                this.isUIBlocked = false;
            },
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
            async saveAndNew() {
                await this.saveChanges();
                this.modalOpen = true;
            },
            async deleteTodo() {
                this.showDeleteConfirm = false;
                this.blockUI('Deleting...');
                try {
                    await store.deleteTodo(this.todoForModal._id);
                    this.todoForModal = {};
                    this.modalOpen = false;
                    this.$refs.toast.popSuccess('Deleted');
                } catch (e) {
                    console.error(e);
                    this.$refs.toast.popError('Unable to delete');
                } finally {
                    this.unblockUI();
                }

            },
            showTodo(todo) {
                this.todoForModal = cloneDeep(todo);
                this.editorMenuItems = [
                    { label: 'Save & New', handler: this.saveAndNew },
                    { label: 'Delete', handler: () => this.showDeleteConfirm = true },
                ];
                this.modalOpen = true;
            },
            newTodo() {
                this.todoForModal = {};
                this.editorMenuItems = [
                    { label: 'Save & New', handler: this.saveAndNew }
                ];

                // if we're filtered on specific project, preselect this project for the new item
                let project = this.$route.query.project;
                if (project && project !== this.NO_PROJECT && project !== this.ALL_PROJECTS) {
                    this.todoForModal.project = project;
                }

                this.modalOpen = true;
            },
            closeModal() {
                this.modalOpen = false;
                this.todoForModal = {};
            },
            async saveChanges() {

                if (!this.$refs.validation.validate()) {
                    // has validation errors, abort
                    return;
                }

                try {
                    this.blockUI('Saving changes...');
                    if (this.todoForModal._id) {
                        await store.updateTodo(this.todoForModal);
                    } else {
                        await store.addTodo(this.todoForModal);
                    }
                    this.modalOpen = false;
                    this.todoForModal = {};
                    this.$refs.toast.popSuccess('TODO Saved');
                } catch (e) {
                    console.log(e);
                    let error = get(e, 'response.data.error', 'Unknown error');
                    this.$refs.toast.popError(error);
                } finally {
                    this.unblockUI();
                }
            }
        },
        async mounted() {
            this.blockUI('Loading TODOs from server...');
            await store.loadFromServer();
            this.unblockUI();
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
