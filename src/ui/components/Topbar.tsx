import { useEffect, useState } from "react"
import { ModelResponse } from "ollama";

export const Topbar = () => {
    const [models, setModels] = useState<ModelResponse[]>([]);

    useEffect(() => {
        (async () => {
            // @ts-expect-error TODO
            const response = await window.api.getModels()
            setModels(response.models)
        })()
    }, [])

    return (
        <nav className='bg-zinc-900 z-10 flex justify-end p-2 w-full'>
            <select defaultValue="" className="select bg-zinc-800 focus:outline-none focus:border-none">
                <option disabled={true} value={""}>Select model</option>
                {models.map((model) => (
                    <option value={model.name} key={model.digest}>{model.name}</option>
                ))}
            </select>
        </nav>
    )
}
