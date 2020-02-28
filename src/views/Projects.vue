<template>
    <div class="projects">
        <div class="projects__controls">
            <button class="projects__controls__create-button btn" @click="newProject">Create New Project</button>
        </div>

        <List :columns="columns" :items="projects" @selected="projectSelected"/>
        <BlockUI :block="blockUI" :text="blockMessage"></BlockUI>
        <ModalBox v-if="modalOpen" title="Create Project" ok-button-text="Create" @ok="createProject" @cancel="closeModal">
            <input type="text" id="new-project-name" v-model="projectForModal">
        </ModalBox>
        <FormValidation ref="validation" :rules="[{type:'required', id:'new-project-name', name: 'Project name'}]"></FormValidation>
        <Toast ref="toast"></Toast>
    </div>
</template>

<script>
    import store from '../store';
    import List from '../components/List';
    import BlockUI from "../components/BlockUI";
    import ModalBox from "../components/ModalBox";
    import FormValidation from "../components/FormValidation";
    import get from 'lodash-es/get';
    import Toast from "../components/Toast";

    export default {
        name: 'projects',
        components: { Toast, FormValidation, ModalBox, BlockUI, List },
        async mounted() {
            this.blockMessage = 'Loading projects from server...';
            this.blockUI = true;
            await store.loadFromServer();
            this.blockUI = false;
        },
        methods: {
            projectSelected(project) {
                this.$router.push({ name: 'todos', query: { project: project._id } });
            },
            newProject() {
                this.projectForModal = '';
                this.modalOpen = true;
            },
            closeModal() {
                this.projectForModal = '';
                this.modalOpen = false;
            },
            async createProject() {
                if (!this.$refs.validation.validate()) {
                    // has validation errors, abort
                    return;
                }

                try {
                    this.blockMessage = 'Creating Project...';
                    this.blockUI = true;
                    await store.addProject({name: this.projectForModal});
                    this.modalOpen = false;
                    this.projectForModal = {};
                    this.$refs.toast.popSuccess('Project Created');
                } catch (e) {
                    console.log(e);
                    let error = get(e, 'response.data.error', 'Unknown error');
                    let errorCategory = get(e, 'response.data.errorCategory');
                    if (errorCategory === 'duplicate') {
                        error = 'A project with that name already exists';
                    }
                    this.$refs.toast.popError(error);
                } finally {
                    this.blockUI = false;
                }


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
                ],
                projectForModal: '',
                modalOpen: false
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
    }
</style>
