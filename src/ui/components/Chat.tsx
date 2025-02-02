import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { Send } from 'lucide-react';
import { Message } from './Message'

type Message = {
    text: string;
    side: "assistant" | "user"
}

export const Chat = () => {
    const [isThinking, setIsThinking] = useState(false);
    const [messages, setMessages] = useState<Message[]>([])
    const [inputValue, setInputValue] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(e.target.value)
    }

    const postMessage = (side: "assistant" | "user", text: string) => {
        setMessages((prev) => {
            return [...prev, { side, text }];
        })
    }

    const handleSend = async () => {
        if (!inputValue) return;
        setInputValue("");
        setIsThinking(true)
        postMessage("user", inputValue)
        // @ts-expect-error TODO
        const response = await window.api.sendMessage({ model: "deepseek-r1:1.5b", message: inputValue })
        setIsThinking(false);

        const answer = response.message.content;

        const thinkClosingTag = "</think>"
        const endOfThinkingBlock = answer.indexOf(thinkClosingTag)
        const formattedAnswer = answer.slice(endOfThinkingBlock + thinkClosingTag.length);
        postMessage("assistant", formattedAnswer)
    }

    return (
        <main className='w-full h-full px-4 pb-4 bg-zinc-800 flex flex-col overflow-hidden justify-end'>
            {isThinking && (
                <div className='z-50 bg-black/80 absolute inset-0 h-screen w-screen flex justify-center items-center'>
                    <p className='text-2xl'>Thinking...</p>
                </div>
            )}
            <div className="overflow-y-scroll">
                {messages.map((msg) => (<Message key={uuidv4()} {...msg} />))}
            </div>
            <div className="flex items-center mt-8 gap-2 w-full">
                <textarea
                    placeholder='Enter your prompt'
                    className='textarea table-xl w-full outline-none border-none focus:outline-none bg-zinc-900 focus:border-none'
                    value={inputValue}
                    onChange={handleChange}
                />
                <button disabled={isThinking} className='btn btn-circle btn-xl btn-primary btn-outline' onClick={handleSend}>
                    <Send />
                </button>
            </div>
        </main>
    )
}
