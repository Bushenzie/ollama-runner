import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { Send } from 'lucide-react';
import { Message } from './Message'
import { MessageSender, Message as MessageType } from '../types/message';
import { useChat } from '../context/ChatContext';

type Message = {
    text: string;
    side: MessageSender
}

export const Chat = () => {
    const chat = useChat();
    const [inputValue, setInputValue] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(e.target.value)
    }

    const handleSend = async () => {
        if (!inputValue) return;
        const message: MessageType = {
            role: "user",
            content: inputValue
        }
        await chat.sendMessage(message)
        setInputValue("");
    }

    return (
        <main className='w-full h-full px-4 pb-4 bg-zinc-800 flex flex-col overflow-hidden justify-end'>
            {chat.isThinking && (
                <div className='z-50 bg-black/80 absolute inset-0 h-screen w-screen flex justify-center items-center'>
                    <p className='text-2xl'>Thinking...</p>
                </div>
            )}
            <div className="flex flex-col gap-4 overflow-y-scroll pt-4">
                {chat.messages.map((msg) => (<Message key={uuidv4()} {...msg} />))}
            </div>
            <div className="flex items-center mt-8 gap-2 w-full">
                <textarea
                    placeholder='Enter your prompt'
                    className='textarea table-xl w-full outline-none border-none focus:outline-none bg-zinc-900 focus:border-none'
                    value={inputValue}
                    onChange={handleChange}
                />
                <button disabled={chat.isThinking || !chat.model} className='btn btn-circle btn-xl btn-primary btn-outline' onClick={handleSend}>
                    <Send />
                </button>
            </div>
        </main>
    )
}
