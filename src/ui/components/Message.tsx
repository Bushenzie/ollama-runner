import clsx from "clsx";
import Markdown from 'react-markdown'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import remarkGfm from 'remark-gfm'
import { Message as MessageProps } from "../types/message"

export const Message: React.FC<MessageProps> = ({ content, role }) => {
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
                                <SyntaxHighlighter
                                    children={String(children)}
                                    language={language}
                                    style={atomOneDark}
                                />
                            ) : (
                                <code {...rest} className={clsx("inline text-xs bg-zinc-700 p-1", className)}>
                                    {children}
                                </code>
                            )
                        }
                    }}
                />
            </div>
        </div>
    )
}
