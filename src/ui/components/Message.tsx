import clsx from "clsx";
import Markdown from 'react-markdown'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import remarkGfm from 'remark-gfm'
import { Message as MessageProps } from "../types/message"
import { Copy } from "lucide-react";

export const Message: React.FC<MessageProps> = ({ content, role }) => {

    const handleCopy = async (text: string) => {
        await navigator.clipboard.writeText(text);
    }

    return (
        <div className={clsx("chat", role === "assistant" ? "chat-start" : "chat-end")}>
            <div className={clsx("chat-bubble", role === "user" && "chat-bubble-primary")}>
                <Markdown
                    children={content}
                    className="leading-relaxed"
                    remarkPlugins={[remarkGfm]}
                    components={{
                        code(props) {
                            const { children, className, ...rest } = props
                            const isCodeBlock = className?.includes("language");
                            const language = className?.split("-")[1]
                            return isCodeBlock ? (
                                <div className="p-2 flex flex-col bg-zinc-950">
                                    <div className="flex p-2 justify-between">
                                        <Copy className="cursor-pointer" onClick={() => handleCopy(String(children))} />
                                        <span className="capitalize self-end">{language}</span>
                                    </div>
                                    <SyntaxHighlighter
                                        children={String(children)}
                                        language={language}
                                        style={atomOneDark}
                                    />
                                </div>
                            ) : (
                                <code {...rest} className={clsx("inline text-xs bg-zinc-700 p-1", className)}>
                                    {children}
                                </code>
                            )
                        },

                        h1(props) {
                            return <h1 className="text-3xl leading-loose font-bold">{props.children}</h1>
                        },
                        h2(props) {
                            return <h1 className="text-2xl leading-loose font-bold">{props.children}</h1>
                        },
                        h3(props) {
                            return <h1 className="text-xl leading-loose font-bold">{props.children}</h1>
                        },
                        h4(props) {
                            return <h1 className="text-lg leading-loose font-semibold">{props.children}</h1>
                        },
                        h5(props) {
                            return <h1 className="text-base leading-loose font-semibold">{props.children}</h1>
                        },
                        h6(props) {
                            return <h1 className="text-sm leading-loose font-semibold">{props.children}</h1>
                        },
                    }}
                />
            </div>
        </div>
    )
}