<template>
    <div class="todo-editor">
        <input v-model="todo.title" type="text" class="title" :class="{title_done: todo.done}">
        <select v-model="todo.priority" class="priority">
            <option value="1">H</option>
            <option value="2">N</option>
            <option value="3">L</option>
        </select>
        <input v-model="todo.done" type="checkbox" class="done">
        <textarea class="description" v-model="todo.description"></textarea>
    </div>
</template>

<script>
    export default {
        name: "TodoEditor",
        props: ['todo']
    }
</script>

<style scoped>
    .todo-editor {
        display: grid;
        grid-template-rows: 20px auto;
        grid-template-columns: auto 36px 20px;
        grid-column-gap: 10px;
        grid-row-gap: 10px;
    }
    .title {
        grid-column: 1;
    }
    .title_done {
        text-decoration-line: line-through;
        text-decoration-color: gray;
    }
    .priority {
        grid-column: 2;
    }
    .done {
        grid-column: 3;
    }
    .description {
        grid-column: 1/4;
        min-height: 100px;
    }
</style>
