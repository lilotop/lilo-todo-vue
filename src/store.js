import Vue from 'vue';
import { find, filter } from "lodash";
import services from "./services";
let loaded;
let store = Vue.observable({
    projects: [],
    todos: [],
    user: {},
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
            try {
                let res = await Promise.all([services.getTodos(), services.getProjects(), services.getUser()]);
                store.todos = res[0].data.data;
                store.projects = res[1].data.data;
                store.user = res[2].data.data;
                loaded = true;
            }
            catch(err){
                store.reset();
                console.log('Failed to reload store, error: ',err.response.status);
            }
        }
    },
    reset() {
        store.projects = [];
        store.todos = [];
        store.user = {};
    }
});
export default store;
