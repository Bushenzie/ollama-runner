
export type MessageSender = "user" | "assistant"

export type Message = {
    role: MessageSender;
    content: string;
}