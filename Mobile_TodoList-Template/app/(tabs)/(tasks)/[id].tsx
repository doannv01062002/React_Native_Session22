import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { getTaskById } from '../../../api/api';
import { Task, Priority } from '../../../types';

const priorityColors: { [key in Priority]: string } = {
    [Priority.HIGH]: 'red',
    [Priority.MEDIUM]: 'orange',
    [Priority.LOW]: 'green',
};

export default function TaskDetailScreen() {
    const { id } = useLocalSearchParams();
    const [task, setTask] = useState<Task | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            const taskId = parseInt(id as string, 10);
            getTaskById(taskId)
                .then(response => {
                    setTask(response.data);
                })
                .catch(error => {
                    Alert.alert('Lỗi', 'Không thể tải chi tiết công việc.');
                    console.error(error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [id]);

    if (loading) {
        return <ActivityIndicator size="large" style={{ flex: 1 }} />;
    }

    if (!task) {
        return <View><Text style={styles.errorText}>Không tìm thấy công việc.</Text></View>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Tên công việc:</Text>
            <Text style={styles.value}>{task.name}</Text>

            <Text style={styles.label}>Độ ưu tiên:</Text>
            <Text style={[styles.value, { color: priorityColors[task.priority] }]}>
                {task.priority}
            </Text>

            <Text style={styles.label}>Trạng thái:</Text>
            <Text style={styles.value}>{task.status}</Text>

            <Text style={styles.label}>Mô tả:</Text>
            <Text style={styles.value}>{task.description || 'Không có mô tả'}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 15,
    },
    value: {
        fontSize: 16,
        marginTop: 5,
    },
    errorText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 18,
        color: 'red',
    },
});