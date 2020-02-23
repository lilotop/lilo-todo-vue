<template>
    <div class="todo-editor">
        <input v-model="todo.title" type="text" class="title" id="todo-title" :class="{title_done: todo.done}">
        <div class="priority">Priority:
            <Priority v-model="todo.priority"/>
        </div>
        <div class="done"><label for="done">Done? </label>
            <CheckBox v-model="todo.done" id="done" :size="checkBoxSize"/>
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
        data() {
            return {
                checkBoxSize:14
            }
        },
        props: ['todo'],
        mounted() {
            this.$el.querySelector('.title').focus();

            // media query - responsive ui support
            this.respondToMediaChanges = (mediaQuery) => {
                if(mediaQuery.matches){
                    this.checkBoxSize = 30;
                } else {
                    this.checkBoxSize = 14;
                }
            };
            this.mediaQuery = window.matchMedia("(max-width: 700px)");
            this.respondToMediaChanges(this.mediaQuery); // call listener function once
            this.mediaQuery.addEventListener('change', this.respondToMediaChanges); // register for changes
        },
        beforeDestroy() {
            this.mediaQuery.removeEventListener('change', this.respondToMediaChanges)
        }
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
    @media screen and (max-width: 700px) {
        .todo-editor {
            grid-template-rows: 40px 40px 40px auto;
        }
    }

    .title {
        grid-column: span 2;
    }

    .title_done {
        text-decoration-line: line-through;
        text-decoration-color: gray;
    }

    .done {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .project {
        grid-column: 1/3;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .description {
        grid-column: span 2;
        min-height: 100px;
    }

    ::selection {
        background: $highlight;
    }
</style>
