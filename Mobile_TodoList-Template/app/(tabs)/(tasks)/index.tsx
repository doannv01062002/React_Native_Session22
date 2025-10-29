import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, ActivityIndicator, Text, RefreshControl, Alert } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import TaskListItem from '../../../components/TaskListItem';
import { getTasks, deleteTask, updateTaskStatus } from '../../../api/api';
import { Task, Status } from '../../../types';

export default function TaskListScreen() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const isFocused = useIsFocused();

    const fetchTasks = useCallback(async () => {
        try {
            setLoading(true);
            const response = await getTasks();
            setTasks(response.data);
        } catch (error) {
            Alert.alert('Lỗi', 'Không thể tải danh sách công việc.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (isFocused) {
            fetchTasks();
        }
    }, [isFocused, fetchTasks]);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await fetchTasks();
        setRefreshing(false);
    }, [fetchTasks]);

    const handleDelete = async (id: number) => {
        try {
            await deleteTask(id);
            setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
        } catch (error) {
            Alert.alert('Lỗi', 'Không thể xóa công việc.');
            console.error(error);
        }
    };

    const handleStatusChange = async (id: number, newStatus: Status) => {
        try {
            await updateTaskStatus(id, newStatus);
            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task.id === id ? { ...task, status: newStatus } : task
                )
            );
        } catch (error) {
            Alert.alert('Lỗi', 'Không thể cập nhật trạng thái.');
            console.error(error);
        }
    };

    if (loading && !refreshing) {
        return <ActivityIndicator size="large" style={{ flex: 1 }} />;
    }

    if (tasks.length === 0) {
        return <View><Text style={{textAlign: 'center', marginTop: 20}}>Không có công việc nào.</Text></View>
    }

    return (
        <FlatList
            data={tasks}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
                <TaskListItem
                    task={item}
                    onDelete={handleDelete}
                    onStatusChange={handleStatusChange}
                />
            )}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        />
    );
}