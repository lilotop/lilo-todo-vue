<template>
    <div class="todo-list">
        <h1>TODO App - Edit but no save</h1>

        <div class="todo-list__content">
            <div class="todo-list__filter">Filter by project: <ProjectSelector v-model="projectFilter" :all="ALL_PROJECTS"/> </div>
            <table cellpadding="0" cellspacing="0">
                <tr class="todo-header">
                    <th class="todo-header__selection-indicator"></th>
                    <th class="todo-header__title">Title</th>
                    <th class="todo-header__date">Created</th>
                    <th class="todo-header__date">Modified</th>
                    <th class="todo-header__project">Project</th>
                    <th class="todo-header__priority">Priority</th>
                    <th class="todo-header__status">Done</th>
                </tr>
                <tr class="todo" v-for="(todo, index) in todos" :key="todo._id"
                    :class="{'todo_done': todo.done, 'todo_selected': todo._id === todoForModal._id}"
                    @click="showTodo(todo)">
                    <td class="todo__selection-indicator" :class="index === selectedIndex ? 'todo__selection-indicator_selected':''"></td>
                    <td class="todo__title">{{todo.title}}</td>
                    <td class="todo__date">{{getDateTime(todo.createdAt)}}</td>
                    <td class="todo__date">{{getDateTime(todo.modifiedAt)}}</td>
                    <td class="todo__project">{{getProjectName(todo.project)}}</td>
                    <td class="todo__priority">
                        <Priority v-model="todo.priority" readonly="true"/>
                    </td>
                    <td class="todo__status" :class="todo.done ? 'todo__status_done':''">
                        <CheckBox :checked="todo.done"/>
                    </td>
                </tr>
            </table>
        </div>
        <ModalBox v-if="modalOpen" :title="todoForModal.title" ok-button-text="Save" @ok="saveChanges" @cancel="closeModal">
            <TodoEditor :todo="todoForModal"/>
        </ModalBox>
    </div>
</template>

<script>
    import { cloneDeep} from 'lodash'
    import { getShortDateTime } from '../utils';
    import ModalBox from './ModalBox';
    import TodoEditor from "./TodoEditor";
    import Priority from "./Priority";
    import CheckBox from "./CheckBox";
    import store from "../store";
    import ProjectSelector from "./ProjectSelector";

    export default {
        name: 'TodoList',
        components: { ProjectSelector, CheckBox, Priority, TodoEditor, ModalBox },
        methods: {
            getDateTime(isoDate) {
                return getShortDateTime(isoDate);
            },
            getProjectName(projectId) {
                let project = store.getProject(projectId);
                return project ? project.name : 'None';
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
            },
            handleKey(e) {
                if (e.which === 38) {
                    // up
                    if (this.selectedIndex === null || this.selectedIndex <= 0) {
                        this.selectedIndex = this.todos.length - 1;
                    } else {
                        this.selectedIndex--;
                    }
                }
                if (e.which === 40) {
                    // down
                    if (this.selectedIndex === null || this.selectedIndex >= this.todos.length - 1) {
                        this.selectedIndex = 0;
                    } else {
                        this.selectedIndex++;
                    }
                }
                if (e.which === 32) {
                    // space - select
                    if (this.selectedIndex !== null) {
                        let todo = this.todos[this.selectedIndex];
                        if (todo) {
                            this.showTodo(todo);
                        }
                    }
                }

            }

        },
        data() {
            return {
                todoForModal: {},
                modalOpen: false,
                selectedIndex: null,
                ALL_PROJECTS: 'all',
                projectFilter: 'all'
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
            projects() {
                return store.projects;
            }
        },
        mounted() {
            window.addEventListener('keyup', this.handleKey);
        },
        beforeDestroy() {
            window.removeEventListener('keyup', this.handleKey);
        },
    }
</script>

<style scoped lang='scss'>
    @import '../main';

    .todo-list {
        padding: 50px;
    }

    .todo-list__content {
        padding: 50px;
        box-shadow: 0px 0px 30px 4px rgba(0, 0, 0, 0.3);
    }
    .todo-list__filter {
        margin-bottom: 20px;
    }
    table {
        width: 100%;
    }

    .todo {
        cursor: pointer;

        .todo__selection-indicator {
            border-left: 2px solid transparent;
        }

        .todo__selection-indicator_selected {
            border-left: 2px solid $primary;
        }

        &:not(.todo_done):hover, &:not(.todo_done).todo_selected {
            background: $highlight;
        }

        &.todo_done {
            &:hover, &.todo_selected {
                background: $highlight_disabled;
            }

            color: $text_disabled;
            text-decoration: line-through;
        }

        td {
            padding: 6px 4px;
        }

        .todo__title {
            text-align: start;
        }

        .todo__project {
            text-align: start;
            padding-left: 30px;
        }

        .todo__date {
            text-align: end;
        }
    }

    .todo-header {
        background: $primary;
        color: $text_on-primary;

        th {
            padding: 6px 4px;
        }

        .todo-header__title {
            text-align: start;
        }

        .todo-header__date {
            text-align: end;
        }

    }
</style>
