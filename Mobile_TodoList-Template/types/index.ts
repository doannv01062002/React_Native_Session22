export enum Priority {
    HIGH = 'HIGH',
    MEDIUM = 'MEDIUM',
    LOW = 'LOW',
}

export enum Status {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
}

export interface Task {
    id: number;
    name: string;
    priority: Priority;
    status: Status;
    description?: string;
}

export type TaskFormValues = Omit<Task, 'id' | 'status'>;