import clsx from "clsx";
import Markdown from 'react-markdown'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Message as MessageProps } from "../types/message"

export const Message: React.FC<MessageProps> = ({ content, role }) => {
    return (
        <div className={clsx("chat", role === "assistant" ? "chat-start" : "chat-end")}>
            <div className={clsx("chat-bubble", role === "user" && "chat-bubble-primary")}>
                <Markdown
                    children={content}
                    className="leading-relaxed"
                    components={{
                        code(props) {
                            const { className, children } = props;
                            const lang = className?.split("-")[1] ?? "typescript";

                            return (
                                <div className="flex flex-col bg-neutral-950 p-2">
                                    <span className="text-right italic capitalize text-xs mb-2">{lang}</span>
                                    <SyntaxHighlighter
                                        language={lang}
                                        style={atomOneDark}
                                    >
                                        {children as string}
                                    </SyntaxHighlighter>
                                </div>
                            )
                        }
                    }}
                />
            </div>
        </div>
    )
}
