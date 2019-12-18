import Vue from 'vue';
import { find } from "lodash";
let store = Vue.observable({
    projects: [],
    todos: [],
    getProject(projectId) {
        return find(store.projects, ['_id',projectId])
    }
});
export default store;
