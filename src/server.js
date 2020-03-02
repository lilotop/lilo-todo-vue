import axios from 'axios';
import router from "./router/index";
import Vue from 'vue';

const apiClient = axios.create({
    // baseURL: `http://localhost:4242/api/v1`, // local (clone lilo-todo-server)
    baseURL: `https://lilo-todo-server.herokuapp.com/api/v1`,
    withCredentials: false, // This is the default
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
});

apiClient.interceptors.response.use(response => response, error => {
    if (error.response && error.response.status === 401) {
        if (router.currentRoute.name !== 'login') {
            router.push({ name: 'login' });
        }
    }
    return Promise.reject(error)
});

apiClient.interceptors.request.use(
    (config) => {
        let token = Vue.$cookies.get('token');

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }

        return config
    },

    (error) => {
        return Promise.reject(error)
    }
);

function saveToken(token) {
    Vue.$cookies.set('token', token, '7d');
}
function clearToken() {
    Vue.$cookies.remove('token');
}

export default {
    async getTodos() {
        return apiClient.get('/todos');
    },
    updateTodo(id, todo) {
        return apiClient.put('/todos/' + id, todo);
    },
    addTodo(todo) {
        return apiClient.post('/todos', todo);
    },
    deleteTodo(id) {
        return apiClient.delete('/todos/' + id);
    },

    getProjects() {
        return apiClient.get('/projects');
    },
    updateProject(id, project) {
        return apiClient.put('/projects/' + id, project);
    },
    addProject(project) {
        return apiClient.post('/projects', project);
    },
    deleteProject(id) {
        return apiClient.delete('/projects/' + id);
    },

    getUser() {
        return apiClient.get('/auth/user');
    },
    async login(name, password) {
        let res = await apiClient.post('/auth/login', { name, password });
        saveToken(res.data.token);
        return res;
    },
    async signUp(name, email, password) {
        let res = await apiClient.post('/auth/register', { name, email, password });
        saveToken(res.data.token);
        return res;

    },
    logout() {
        clearToken();
    }
}
