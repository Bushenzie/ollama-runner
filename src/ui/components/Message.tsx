import clsx from "clsx";

type MessageProps = {
    side: "assistant" | "user",
    text: string;
}

export const Message: React.FC<MessageProps> = ({ side, text }) => {
    return (
        <div className={clsx("chat", side === "assistant" ? "chat-start" : "chat-end")}>
            <div className={clsx("chat-bubble", side === "user" && "chat-bubble-primary")}>
                {text}
            </div>
        </div>
    )
}
