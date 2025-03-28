import apiClient from '$lib/server/axios';
import type { ChatDetails } from '$lib/types';

export const load = async ({ params }) => {
    try {
        const response = await apiClient.get<ChatDetails>(`/chats/${params.chat_id}`);
        return {
            chat: {
                ...response.data,
                messages: response.data.messages.map(m => ({
                    ...m,
                    history: m.history.map(h => ({
                        ...h,
                        date: h.date * 1000
                    }))
                }))
            }
        };
    } catch (error) {
        return {
            status: 500,
            error: 'Failed to load chat'
        };
    }
};
