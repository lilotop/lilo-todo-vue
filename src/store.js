import Vue from 'vue';
import { find, filter } from "lodash";
import services from "./services";
let loaded;
let store = Vue.observable({
    projects: [],
    todos: [],
    getProject(projectId) {
        return find(store.projects, ['_id',projectId])
    },
    getTodosByProject(projectId) {
        if(projectId) {
            return filter(store.todos, todo => todo.project === projectId);
        }
        else {
            return filter(store.todos, todo => !todo.project);
        }
    },
    async loadFromServer(forceReload) {
        if(!loaded || forceReload) {
            let res = await Promise.all([services.getTodos(), services.getProjects()]);
            store.todos = res[0].data.data;
            store.projects = res[1].data.data;
            loaded = true;
        }
    }
});
export default store;
