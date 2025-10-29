import React from 'react';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import TaskForm from '../../../components/TaskForm';
import { createTask } from '../../../api/api';
import { TaskFormValues } from '../../../types';

export default function AddTaskScreen() {
    const router = useRouter();

    const handleSubmit = async (data: TaskFormValues) => {
        try {
            await createTask(data);
            router.back();
        } catch (error) {
            Alert.alert('Lỗi', 'Không thể thêm công việc. Vui lòng thử lại.');
            console.error(error);
        }
    };

    return <TaskForm onSubmit={handleSubmit} />;
}