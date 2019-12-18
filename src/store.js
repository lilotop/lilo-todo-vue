import Vue from 'vue';
import { find, filter } from "lodash";
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
    }
});
export default store;
