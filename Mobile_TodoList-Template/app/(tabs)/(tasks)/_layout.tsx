import { Link, Stack } from 'expo-router';
import React from 'react';
import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default function TasksLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    title: 'Danh sách Công việc',
                    headerRight: () => (
                        <Link href="/(tasks)/add" asChild>
                            <Pressable>
                                {({ pressed }) => (
                                    <Ionicons
                                        name="add-circle"
                                        size={25}
                                        color="black"
                                        style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                                    />
                                )}
                            </Pressable>
                        </Link>
                    ),
                }}
            />
            <Stack.Screen name="[id]" options={{ title: 'Chi tiết công việc' }} />
            <Stack.Screen name="add" options={{ title: 'Thêm mới công việc', presentation: 'modal' }} />
            <Stack.Screen name="edit" options={{ title: 'Chỉnh sửa công việc', presentation: 'modal' }} />
        </Stack>
    );
}