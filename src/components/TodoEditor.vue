<template>
    <div class="todo-editor">
        <input v-model="todo.title" type="text" class="title" :class="{title_done: todo.done}">
        <Priority v-model="todo.priority" class="priority" />
        <CheckBox v-model="todo.done" class="done"/>
        <textarea class="description" v-model="todo.description"></textarea>
    </div>
</template>

<script>
    import Priority from "./Priority";
    import CheckBox from "./CheckBox";
    export default {
        name: "TodoEditor",
        components: { CheckBox, Priority },
        props: ['todo']
    }
</script>

<style scoped lang="scss">
    @import '../main';

    .todo-editor {
        display: grid;
        grid-template-rows: 20px auto;
        grid-template-columns: auto 50px 20px;
        grid-column-gap: 10px;
        grid-row-gap: 10px;
    }
    .title {
        grid-column: 1;
        &:focus {
            outline: black auto 2px;
        }
    }
    .title_done {
        text-decoration-line: line-through;
        text-decoration-color: gray;
    }
    .priority {
        grid-column: 2;
        height: 20px;
    }
    .done {
        grid-column: 3;
        border: 1px solid darkgray;
    }
    .description {
        grid-column: 1/4;
        min-height: 100px;
        &:focus {
            outline: black auto 2px;
        }
    }
    ::selection {
        background: $highlight;
    }
</style>
