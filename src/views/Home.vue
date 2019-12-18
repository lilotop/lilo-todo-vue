<template>
    <div class="home">
        <TodoList/>
    </div>
</template>

<script>
    import TodoList from "../components/TodoList";
    import services from '../services';
    import store from "../store";

    export default {
        name: 'home',
        components: {
            TodoList

        },
        async beforeRouteEnter(routeTo, routeFrom, next) {
          let res = await Promise.all([services.getTodos(), services.getProjects()]);
          store.todos = res[0].data.data;
          store.projects = res[1].data.data;
          next();


        }
    }
</script>
