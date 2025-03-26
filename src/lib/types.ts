export interface Chat {
    id: string;
    name: string;
}

export interface MessageHistoryItem {
    id: string;
    type: 'created' | 'edited' | 'deleted';
    payload?: string;
    date: number;
}

export interface Message {
    id: string;
    history: MessageHistoryItem[];
}

export interface ChatDetails {
    id: string;
    name: string;
    messages: Message[];
}
