import { writable } from 'svelte/store';

export type NotificationType = 'info' | 'warning' | 'error';

export type Notification = { 
    id: number; 
    title?: string;
    message: string;
    type: NotificationType;
};

const notificationsStore = writable<Notification[]>([]);
let id = 0;

export const notifications = {
    subscribe: notificationsStore.subscribe,

    add: (message: string, options?: { title?: string; type?: NotificationType; duration?: number }) => {
        const { title, type = 'info', duration = 5000 } = options || {};
        const newId = id++;
        notificationsStore.update(n => [...n, { id: newId, title, message, type }]);

        setTimeout(() => {
            notificationsStore.update(n => n.filter(x => x.id !== newId));
        }, duration);
    },

    // Convenience methods for different types
    info: (message: string, options?: { title?: string; duration?: number }) => {
        notifications.add(message, { ...options, type: 'info' });
    },

    warning: (message: string, options?: { title?: string; duration?: number }) => {
        notifications.add(message, { ...options, type: 'warning' });
    },

    error: (message: string, options?: { title?: string; duration?: number }) => {
        notifications.add(message, { ...options, type: 'error' });
    }
};
