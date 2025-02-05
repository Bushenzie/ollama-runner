import { ChangeEvent, useEffect, useState } from "react"
import { ModelResponse } from "ollama";
import { useChat } from "../context/ChatContext";
import { Trash } from "lucide-react";
import clsx from "clsx";

export const Topbar = () => {
    const chat = useChat();
    const [models, setModels] = useState<ModelResponse[]>([]);
    const [isOllamaRunning, setIsOllamaRunning] = useState(false);

    useEffect(() => {
        (async () => {
            const isRunning = await window.api.checkAvailability()
            setIsOllamaRunning(isRunning)
            const response = await window.api.getModels()
            setModels(response.models)
        })()
    }, [])

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        chat.changeModel(e.target.value)
    }


    return (
        <nav className='bg-zinc-900 z-10 flex items-center justify-between p-2 w-full'>
            <div>
                <button className="btn btn-link text-white" onClick={chat.clearChat}>
                    <Trash />
                </button>
                <div className={clsx("badge", isOllamaRunning ? "badge-success" : "badge-error")}>Ollama</div>
            </div>
            <select onChange={handleChange} defaultValue="" className="select bg-zinc-800 focus:outline-none focus:border-none">
                <option disabled={true} value={""}>Select model</option>
                {models.map((model) => (
                    <option value={model.name} key={model.digest}>{model.name}</option>
                ))}
            </select>
        </nav>
    )
}
