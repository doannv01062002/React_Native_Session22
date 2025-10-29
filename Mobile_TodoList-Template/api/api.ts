import axios from 'axios';
import { Task, TaskFormValues, Status } from '../types';

// The base URL should be the common prefix for all API endpoints.
const API_URL = 'http://192.168.2.8:8080/api/v1';

const api = axios.create({
    baseURL: API_URL,
});

// Each function now specifies the full, correct path relative to the base URL.
export const getTasks = () => api.get<Task[]>('/tasks');

export const getTaskById = (id: number) => api.get<Task>(`/tasks/${id}`);

export const createTask = (data: TaskFormValues) => api.post<Task>('/tasks', data);

export const updateTask = (id: number, data: TaskFormValues) => api.put<Task>(`/tasks/${id}`, data);

export const updateTaskStatus = (id: number, status: Status) => api.patch<Task>(`/tasks/${id}/status`, { status });

export const deleteTask = (id: number) => api.delete(`/tasks/${id}`);