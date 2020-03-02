<template>
    <main class="projects">
        <section class="projects__controls">
            <button class="projects__controls__create-button btn" @click="newProject">Create New Project</button>
        </section>

        <List :columns="columns" :items="projects" @selected="showProject"/>
        <ModalBox v-if="modalOpen" title="Create Project" ok-button-text="Save" @ok="saveChanges" @cancel="closeModal"
                  :menu-items="editorMenuItems">
            <div class="project-editor">
                <label for="new-project-name">Name</label><input type="text" id="new-project-name" v-model="projectForModal.name">
                <label for="project-description">Description</label><textarea id="project-description" v-model="projectForModal.description"></textarea>
            </div>
        </ModalBox>
        <FormValidation ref="validation" :rules="[{type:'required', id:'new-project-name', name: 'Project name'}]"></FormValidation>
        <Toast ref="toast"></Toast>
        <ModalBox v-if="showDeleteConfirm" title="Are you sure?" ok-button-text="Yes, DELETE!"
                  @ok="deleteProject" @cancel="showDeleteConfirm = false">
            <h4>This will also delete all the TODO items of this project!</h4>
        </ModalBox>
        <BlockUI :block="isUIBlocked" :text="blockMessage"></BlockUI>
    </main>
</template>

<script>
    import store from '../store';
    import List from '../components/common/List';
    import BlockUI from "../components/common/BlockUI";
    import ModalBox from "../components/common/ModalBox";
    import FormValidation from "../components/common/FormValidation";
    import Toast from "../components/common/Toast";
    import get from 'lodash-es/get';
    import cloneDeep from "lodash-es/cloneDeep";

    export default {
        name: 'projects',
        components: { Toast, FormValidation, ModalBox, BlockUI, List },
        async mounted() {
            this.blockUI('Loading projects from server...');
            await store.loadFromServer();
            this.unblockUI();
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
            gotoProject(project) {
                this.$router.push({ name: 'todos', query: { project: project._id } });
            },

            async saveAndNew() {
                await this.saveChanges();
                this.modalOpen = true;
            },
            async deleteProject() {
                this.showDeleteConfirm = false;
                this.blockUI('Deleting project...');
                try {
                    await store.deleteProject(this.projectForModal._id);
                    this.projectForModal = {};
                    this.modalOpen = false;
                    this.$refs.toast.popSuccess('Project deleted');
                } catch (e) {
                    console.error(e);
                    this.$refs.toast.popError('Unable to delete');
                } finally {
                    this.unblockUI();
                }

            },
            showProject(project) {
                this.projectForModal = cloneDeep(project);
                this.editorMenuItems = [
                    { label: 'Save & New', handler: this.saveAndNew },
                    { label: 'Delete', handler: () => this.showDeleteConfirm = true },
                ];
                this.modalOpen = true;
            },

            newProject() {
                this.projectForModal = {};
                this.editorMenuItems = [
                    { label: 'Save & New', handler: this.saveAndNew }
                ];
                this.modalOpen = true;
            },
            closeModal() {
                this.modalOpen = false;
                this.projectForModal = {};
            },
            async saveChanges() {
                if (!this.$refs.validation.validate()) {
                    // has validation errors, abort
                    return;
                }

                try {
                    this.blockUI('Saving project...');
                    if (this.projectForModal._id) {
                        await store.updateProject(this.projectForModal);
                    } else {
                        await store.addProject(this.projectForModal);
                    }
                    this.modalOpen = false;
                    this.projectForModal = {};

                    this.$refs.toast.popSuccess('Project saved');
                } catch (e) {
                    console.log(e);
                    let error = get(e, 'response.data.error', 'Unknown error');
                    let errorCategory = get(e, 'response.data.errorCategory');
                    if (errorCategory === 'duplicate') {
                        error = 'A project with that name already exists';
                    }
                    this.$refs.toast.popError(error);
                } finally {
                    this.unblockUI();
                }


            }
        },
        data() {
            return {
                isUIBlocked: false,
                blockMessage: '',
                columns: [
                    {
                        header: 'Project',
                        field: 'name',
                    },
                    {
                        header: 'Description',
                        field: 'description'
                    },
                    {
                        header: 'Todos',
                        text: 'click to filter',
                        handler: this.gotoProject
                    }
                ],
                projectForModal: {},
                modalOpen: false,
                showDeleteConfirm: false,
                editorMenuItems: []
            }
        },
        computed: {
            projects() {
                return store.projects;
            }
        }
    }
</script>

<style scoped lang="scss">
    .projects {
        margin-top: 39px;

        .projects__controls {
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .project-editor {
            display: flex;
            flex-direction: column;
            input {
                margin-bottom: 10px;
            }
        }
        @media screen and (max-width: 700px) {
            .btn {
                height: 60px;
            }
        }
    }
</style>
