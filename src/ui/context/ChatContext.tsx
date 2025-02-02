/* eslint-disable react-refresh/only-export-components */
import { useContext, createContext, useState } from "react";
import { Message } from "../types/message";


type ChatContext = {
    isThinking: boolean;
    model: string | null;
    messages: Message[];
    changeModel: (model: string | null) => void;
    sendMessage: (msg: Message) => Promise<string>;
    clearChat: () => void;
}

const defaultContextState: ChatContext = {
    isThinking: false,
    model: null,
    messages: [],
    changeModel: () => { },
    sendMessage: async () => "",
    clearChat: () => { },
}

const ChatContext = createContext<ChatContext>(defaultContextState)

export const ChatContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [model, setModel] = useState<string | null>(null);
    const [isThinking, setIsThinking] = useState(false);
    const [messages, setMessages] = useState<Message[]>([])

    const changeModel = (model: string | null) => {
        setModel(model);
    }

    const clearChat = () => {
        setMessages([])
    }

    const sendMessage = async (msg: Message) => {
        if (!model) return;
        setIsThinking(true)

        const currentMessages = [...messages, msg]
        setMessages((prev) => ([...prev, msg]))

        // @ts-expect-error TODO
        const response = await window.api.sendMessage({ model, messages: currentMessages })

        setIsThinking(false);

        const answer = response.message.content;

        const thinkClosingTag = "</think>"
        const endOfThinkingBlock = answer.indexOf(thinkClosingTag)
        const formattedAnswer = answer.slice(endOfThinkingBlock + thinkClosingTag.length);

        const responseMessage: Message = {
            role: "assistant",
            content: formattedAnswer
        }

        setMessages((prev) => ([...prev, responseMessage]))
        return formattedAnswer;
    }

    return (
        <ChatContext.Provider value={{
            isThinking,
            model,
            messages,
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