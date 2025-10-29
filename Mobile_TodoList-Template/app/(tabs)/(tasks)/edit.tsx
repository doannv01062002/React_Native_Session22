import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import TaskForm from '../../../components/TaskForm';
import { getTaskById, updateTask } from '../../../api/api';
import { Task, TaskFormValues } from '../../../types';

export default function EditTaskScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [task, setTask] = useState<Task | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            const taskId = parseInt(id as string, 10);
            getTaskById(taskId)
                .then(response => {
                    setTask(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    Alert.alert('Lỗi', 'Không thể tải dữ liệu công việc.');
                    console.error(error);
                    setLoading(false);
                    router.back();
                });
        }
    }, [id]);

    const handleSubmit = async (data: TaskFormValues) => {
        if (task) {
            try {
                await updateTask(task.id, data);
                router.back();
            } catch (error) {
                Alert.alert('Lỗi', 'Không thể cập nhật công việc.');
                console.error(error);
            }
        }
    };

    if (loading) {
        return <ActivityIndicator size="large" style={{ flex: 1 }} />;
    }

    if (!task) {
        return <View><Text>Không tìm thấy công việc.</Text></View>;
    }

    const initialValues: TaskFormValues = {
        name: task.name,
        priority: task.priority,
        description: task.description,
    };

    return <TaskForm onSubmit={handleSubmit} initialValues={initialValues} submitButtonText="Cập nhật" />;
}