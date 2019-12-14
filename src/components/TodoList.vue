<template>
    <div class="todo-list">
        <h1>TODO App - Edit but no save</h1>
        <table cellpadding="0" cellspacing="0">
            <tr class="todo-header">
                <th class="todo-header__selection-indicator"></th>
                <th class="todo-header__title">Title</th>
                <th class="todo-header__date">Created</th>
                <th class="todo-header__date">(time)</th>
                <th class="todo-header__date">Modified</th>
                <th class="todo-header__date">(time)</th>
                <th class="todo-header__priority">Priority</th>
                <th class="todo-header__status">Done</th>
            </tr>
            <tr class="todo" v-for="(todo, index) in todos" :key="todo._id"
                :class="{'todo_done': todo.done, 'todo_selected': todo._id === todoForModal._id}"
                @click="showTodo(todo)">
                <td class="todo__selection-indicator" :class="index === selectedIndex ? 'todo__selection-indicator_selected':''"></td>
                <td class="todo__title">{{todo.title}}</td>
                <td class="todo__date">{{getDate(todo.createdAt)}}</td>
                <td class="todo__date">{{getTime(todo.createdAt)}}</td>
                <td class="todo__date">{{getDate(todo.modifiedAt)}}</td>
                <td class="todo__date">{{getTime(todo.modifiedAt)}}</td>
                <td class="todo__priority">
                    <Priority v-model="todo.priority" readonly="true"/>
                </td>
                <td class="todo__status" :class="todo.done ? 'todo__status_done':''">
                    <CheckBox :checked="todo.done"/>
                </td>
            </tr>
        </table>
        <ModalBox v-if="modalOpen" :title="todoForModal.title" ok-button-text="Save" @ok="saveChanges" @cancel="closeModal">
            <TodoEditor :todo="todoForModal"/>
        </ModalBox>
    </div>
</template>

<script>
    import { getShortDate, getShortTime } from '../utils';
    import ModalBox from './ModalBox';
    import axios from 'axios';
    import TodoEditor from "./TodoEditor";
    import { cloneDeep } from 'lodash'
    import Priority from "./Priority";
    import CheckBox from "./CheckBox";

    export default {
        name: 'TodoList',
        components: { CheckBox, Priority, TodoEditor, ModalBox },
        methods: {
            getDate(isoDate) {
                return getShortDate(isoDate);
            },
            getTime(isoDate) {
                return getShortTime(isoDate);
            },
            convertPriority(serverPriority) {
                switch (serverPriority) {
                    case 1:
                        return 'High';
                    case 2:
                        return 'Normal';
                    case 3:
                        return 'Low';

                }
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
                todos: [],
                selectedIndex: null,
            }
        },
        async created() {
            let res = await axios.get('http://localhost:4242/api/v1/todos');
            this.todos = res.data.data;
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

    table {
        width: 100%;
        padding: 50px;
        box-shadow: 0px 0px 30px 4px rgba(0, 0, 0, 0.3);
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
