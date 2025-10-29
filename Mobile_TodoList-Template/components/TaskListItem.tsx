import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';
import { Alert, Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { Priority, Status, Task } from '../types';

interface TaskListItemProps {
    task: Task;
    onStatusChange: (id: number, newStatus: Status) => void;
    onDelete: (id: number) => void;
}

const priorityColors: { [key in Priority]: string } = {
    [Priority.HIGH]: 'red',
    [Priority.MEDIUM]: 'orange',
    [Priority.LOW]: 'green',
};

// comment: TaskListItem component to display individual task with status toggle, edit and delete options

const TaskListItem: React.FC<TaskListItemProps> = ({ task, onStatusChange, onDelete }) => {
    const handleSwitchToggle = () => {
        const newStatus = task.status === Status.PENDING ? Status.COMPLETED : Status.PENDING;
        onStatusChange(task.id, newStatus);
    };

    const handleDelete = () => {
        Alert.alert(
            'Xác nhận xóa',
            `Bạn có chắc chắn muốn xóa công việc "${task.name}"?`,
            [
                { text: 'Hủy', style: 'cancel' },
                { text: 'Xóa', onPress: () => onDelete(task.id), style: 'destructive' },
            ]
        );
    };

    return (
        <Link href={`/(tasks)/${task.id}`} asChild>
            <Pressable style={styles.container}>
                <Switch
                    value={task.status === Status.COMPLETED}
                    onValueChange={handleSwitchToggle}
                    style={styles.switch}
                />
                <View style={styles.middleContainer}>
                    <Text style={styles.taskName}>{task.name}</Text>
                    <Text style={{ color: priorityColors[task.priority] }}>
                        {task.priority}
                    </Text>
                </View>
                <View style={styles.rightContainer}>
                    <Link href={{ pathname: '/(tasks)/edit', params: { id: task.id } }} asChild>
                        <Pressable style={styles.iconButton}>
                            <Ionicons name="pencil" size={24} color="blue" />
                        </Pressable>
                    </Link>
                    <Pressable onPress={handleDelete} style={styles.iconButton}>
                        <Ionicons name="trash" size={24} color="red" />
                    </Pressable>
                </View>
            </Pressable>
        </Link>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        backgroundColor: 'white',
    },
    switch: {
        marginRight: 15,
    },
    middleContainer: {
        flex: 1,
    },
    taskName: {
        fontSize: 18,
        fontWeight: '500',
    },
    rightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconButton: {
        marginLeft: 15,
    },
});

export default TaskListItem;