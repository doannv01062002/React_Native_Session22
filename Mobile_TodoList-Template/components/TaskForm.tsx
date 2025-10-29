import { yupResolver } from '@hookform/resolvers/yup';
import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import * as yup from 'yup';
import { Priority, TaskFormValues } from '../types';

const schema = yup.object().shape({
    name: yup.string().required('Tên công việc là bắt buộc'),
    priority: yup.string().oneOf(Object.values(Priority)).required(),
    description: yup.string(),
});

interface TaskFormProps {
    onSubmit: (data: TaskFormValues) => void;
    initialValues?: TaskFormValues;
    submitButtonText?: string;
}



const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, initialValues, submitButtonText = 'Lưu' }) => {
    const { control, handleSubmit, formState: { errors } } = useForm<TaskFormValues>({
        resolver: yupResolver(schema),
        defaultValues: initialValues || { name: '', priority: Priority.MEDIUM, description: '' },
    });

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Tên công việc</Text>
            <Controller
                control={control}
                name="name"
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
            />
            {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}

            <Text style={styles.label}>Độ ưu tiên</Text>
            <Controller
                control={control}
                name="priority"
                render={({ field: { onChange, value } }) => (
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={value}
                            onValueChange={onChange}
                        >
                            <Picker.Item label="Thấp" value={Priority.LOW} />
                            <Picker.Item label="Trung bình" value={Priority.MEDIUM} />
                            <Picker.Item label="Cao" value={Priority.HIGH} />
                        </Picker>
                    </View>
                )}
            />

            <Text style={styles.label}>Mô tả</Text>
            <Controller
                control={control}
                name="description"
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        multiline
                    />
                )}
            />

            <Button title={submitButtonText} onPress={handleSubmit(onSubmit)} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        fontSize: 16,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 15,
    },
});

export default TaskForm;