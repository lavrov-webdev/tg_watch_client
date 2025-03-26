import apiClient from '$lib/server/axios';
import type { ChatDetails } from '$lib/types';

export const load = async ({ params }) => {
    try {
        const response = await apiClient.get<ChatDetails>(`/chats/${params.chat_id}`);
        return {
            chat: response.data
        };
    } catch (error) {
        return {
            status: 500,
            error: 'Failed to load chat'
        };
    }
};
