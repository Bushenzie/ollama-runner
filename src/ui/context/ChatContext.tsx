/* eslint-disable react-refresh/only-export-components */
import { useContext, createContext, useState } from "react";
import { Message } from "../types/message";


type ChatContext = {
    isThinking: boolean;
    model: string | null;
    messages: Message[];
    speed: number | null;
    changeModel: (model: string | null) => void;
    sendMessage: (msg: Message) => Promise<string | null>;
    clearChat: () => void;
}

const defaultContextState: ChatContext = {
    isThinking: false,
    model: null,
    messages: [],
    speed: null,
    changeModel: () => { },
    sendMessage: async () => "",
    clearChat: () => { },
}

const ChatContext = createContext<ChatContext>(defaultContextState)

export const ChatContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [model, setModel] = useState<string | null>(null);
    const [isThinking, setIsThinking] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [speed, setSpeed] = useState<number | null>(null)

    const changeModel = (model: string | null) => {
        setModel(model);
    }

    const clearChat = () => {
        setMessages([])
    }

    const sendMessage = async (msg: Message) => {
        if (!model) return null;
        setIsThinking(true)

        const currentMessages = [...messages, msg]
        setMessages((prev) => ([...prev, msg]))


        const response = await window.api.sendMessage({ model, messages: currentMessages })

        setIsThinking(false);

        setSpeed(response.tokensPerSecond);

        const answer = response.message.content;

        const responseMessage: Message = {
            role: "assistant",
            content: answer
        }

        setMessages((prev) => ([...prev, responseMessage]))
        return answer;

    }

    return (
        <ChatContext.Provider value={{
            isThinking,
            model,
            messages,
            speed,
            changeModel,
            clearChat,
            sendMessage
        }}>
            {children}
        </ChatContext.Provider>)
}


export const useChat = () => {
    const data = useContext(ChatContext);
    return data
}