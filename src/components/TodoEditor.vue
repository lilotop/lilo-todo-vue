<template>
    <div class="todo-editor">
        <input v-model="todo.title" type="text" class="title" :class="{title_done: todo.done}">
        <div class="priority">Priority:
            <Priority v-model="todo.priority"/>
        </div>
        <div class="done"><label for="done">Done? </label>
            <CheckBox v-model="todo.done" id="done"/>
        </div>
        <div class="project">
            Project:
            <ProjectSelector v-model="todo.project"/>
        </div>
        <textarea class="description" v-model="todo.description"></textarea>
    </div>
</template>

<script>
    import Priority from "./Priority";
    import CheckBox from "./CheckBox";
    import ProjectSelector from "./ProjectSelector";

    export default {
        name: "TodoEditor",
        components: { ProjectSelector, CheckBox, Priority },
        props: ['todo']
    }
</script>

<style scoped lang="scss">
    @import '../main';

    .todo-editor {
        display: grid;
        grid-template-rows: 20px 20px 20px auto;
        grid-template-columns: auto auto;
        grid-column-gap: 10px;
        grid-row-gap: 10px;
    }

    .title {
        grid-column: span 2;

        &:focus {
            outline: black auto 2px;
        }
    }

    .title_done {
        text-decoration-line: line-through;
        text-decoration-color: gray;
    }

    .priority {
        height: 20px;
    }

    .project {
        grid-column: 1/3;
        display: flex;
        justify-content: space-between;
    }

    .description {
        grid-column: span 2;
        min-height: 100px;

        &:focus {
            outline: black auto 2px;
        }
    }

    ::selection {
        background: $highlight;
    }
</style>
