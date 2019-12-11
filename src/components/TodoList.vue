<template>
    <div class="todo-list">
        <h1>TODO App - Read-only version with mock data</h1>
        <table cellpadding="0" cellspacing="0">
            <tr class="todo-header">
                <th class="todo-header__title">Title</th>
                <th class="todo-header__date">Created</th>
                <th class="todo-header__date">(time)</th>
                <th class="todo-header__date">Modified</th>
                <th class="todo-header__date">(time)</th>
                <th class="todo-header__priority">Priority</th>
                <th class="todo-header__status">Done</th>
            </tr>
            <tr class="todo" v-for="todo in todos" :key="todo._id"
                :class="{'todo_done': todo.done, 'todo_selected': todo._id === todoForModal._id}"
                @click="showTodo(todo)">
                <td class="todo__title">{{todo.title}}</td>
                <td class="todo__date">{{getDate(todo.createdAt)}}</td>
                <td class="todo__date">{{getTime(todo.createdAt)}}</td>
                <td class="todo__date">{{getDate(todo.modifiedAt)}}</td>
                <td class="todo__date">{{getTime(todo.modifiedAt)}}</td>
                <td class="todo__priority">{{convertPriority(todo.priority)}}</td>
                <td class="todo__status" :class="todo.done ? 'todo__status_done':''">
                    <input type="checkbox" :checked="todo.done" @click.prevent>
                </td>
            </tr>
        </table>
        <ModalBox v-if="modalOpen" :title="todoForModal.title" cancel-button-text="Done" @cancel="closeModal" only-cancel>
            {{todoForModal.description}}
        </ModalBox>
    </div>
</template>

<script>
    import { getShortDate, getShortTime } from '../utils';
    import ModalBox from './ModalBox';

    export default {
        name: 'TodoList',
        components: { ModalBox },
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
                this.todoForModal = todo;
                this.modalOpen = true;
            },
            closeModal() {
                this.modalOpen = false;
                this.todoForModal = {};
            },
            saveModalTodo() {
                // todo - save to store/server
                this.modalOpen = false;
                this.todoForModal = {};
            }

        },
        data() {
            return {
                todoForModal: {},
                modalOpen: false,

                // todo - mock data, replace with real one
                todos: [
                    {
                        'priority': 1,
                        'done': false,
                        '_id': '5df0a4d3cf015073bcbaf6c7',
                        'title': 'Test the TODO app',
                        'createdAt': '2019-12-11T08:12:03.720Z',
                        'modifiedAt': '2019-12-11T08:12:03.728Z',
                    },
                    {
                        'priority': 1,
                        'done': true,
                        '_id': '5df01b8d00c6b348200ceed8',
                        'title': 'Schedule the party',
                        'createdAt': '2019-12-10T22:26:21.418Z',
                        'modifiedAt': '2019-12-10T22:26:21.423Z',
                    },
                    {
                        'priority': 2,
                        'done': true,
                        '_id': '5df01b8d00c6b348200ceeda',
                        'title': 'Buy storage boxes',
                        'createdAt': '2019-09-06T22:26:21.418Z',
                        'modifiedAt': '2019-12-10T22:26:21.423Z',
                    },
                    {
                        'priority': 3,
                        'done': false,
                        '_id': '5df01b8d00c6b348200ceed9',
                        'title': 'Arrange paperwork',
                        'description': 'Divide into folders, fill out forms, send letters',
                        'createdAt': '2019-02-01T02:26:21.418Z',
                        'modifiedAt': '2019-12-10T22:26:21.423Z',
                    },
                    {
                        'priority': 2,
                        'done': false,
                        '_id': '5df01b8d00c6b348200ceed7',
                        'title': 'Call mom',
                        'description': 'Reminder her about the party',
                        'createdAt': '2019-12-10T22:26:21.417Z',
                        'modifiedAt': '2019-12-10T22:26:21.423Z',
                    },
                    {
                        'priority': 2,
                        'done': false,
                        '_id': '5df01b8d00c6b348200ceed6',
                        'title': 'Feed the dog',
                        'description': 'Don\'t forget to feed the little guy',
                        'createdAt': '2019-12-10T22:26:21.415Z',
                        'modifiedAt': '2019-12-10T22:26:21.423Z',
                    }
                ]
            }
        }

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
