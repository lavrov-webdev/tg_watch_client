import apiClient from '$lib/server/axios';
import type { Chat } from '$lib/types';

export const load = async ({params}) => {
    try {
        const response = await apiClient.get<Chat[]>('/chats');
        return {
            chats: response.data,
            chatId: params.chat_id
        };
    } catch (error) {
        return {
            status: 500,
            error: 'Failed to load chats'
        };
    }
};
