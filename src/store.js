import Vue from 'vue';
import get from 'lodash-es/get';
import filter from 'lodash-es/filter';
import find from 'lodash-es/find';
import server from "./server";
let loaded;
let store = Vue.observable({
    projects: [],
    todos: [],
    user: {},
    error: null,
    handleError(err) {
        store.reset();
        if(get(err,'response.status') === 401) {
            return; // it's not an error, just not logged in yet
        }
        store.error = err.message || err.response.status;
        console.log('Failed to load store, error: ', store.error);
    },
    getProject(projectId) {
        return find(store.projects, ['_id',projectId])
    },
    async updateProject(project) {
        await server.updateProject(project._id, project);
        await this.loadFromServer(true);
    },
    async addProject(project) {
        await server.addProject(project);
        await this.loadFromServer(true);
    },
    async deleteProject(id) {
        await server.deleteProject(id);
        await this.loadFromServer(true);
    },
    getTodosByProject(projectId) {
        if(projectId) {
            return filter(store.todos, todo => todo.project === projectId);
        }
        else {
            return filter(store.todos, todo => !todo.project);
        }
    },
    async updateTodo(todo) {
        await server.updateTodo(todo._id, todo);
        await this.loadFromServer(true);
    },
    async addTodo(todo) {
        await server.addTodo(todo);
        await this.loadFromServer(true);
    },
    async deleteTodo(id) {
        await server.deleteTodo(id);
        await this.loadFromServer(true);
    },
    async loadFromServer(forceReload) {
        if(!loaded || forceReload) {
            try {
                let res = await Promise.all([server.getTodos(), server.getProjects(), server.getUser()]);
                store.todos = res[0].data.data;
                store.projects = res[1].data.data;
                store.user = res[2].data.data;
                store.error = null;
                loaded = true;
            }
            catch(e){
                this.handleError(e)
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
