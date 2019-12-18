import axios from 'axios';

const apiClient = axios.create({
    baseURL: `http://localhost:4242/api/v1`,
    withCredentials: false, // This is the default
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
});

export default {
    getTodos() {
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
    }

}
