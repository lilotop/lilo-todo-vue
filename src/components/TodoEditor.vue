<template>
    <div class="todo-editor">
        <input v-model="todo.title" type="text" class="title" :class="{title_done: todo.done}">
        <Priority v-model="todo.priority" />
        <input v-model="todo.done" type="checkbox" class="done">
        <textarea class="description" v-model="todo.description"></textarea>
    </div>
</template>

<script>
    import Priority from "./Priority";
    export default {
        name: "TodoEditor",
        components: { Priority },
        props: ['todo']
    }
</script>

<style scoped>
    .todo-editor {
        display: grid;
        grid-template-rows: 20px auto;
        grid-template-columns: auto 50px 20px;
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
