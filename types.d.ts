import { ListResponse, ChatResponse } from "ollama";

type OllamaChatResponse = {
  tokensPerSecond: number;
} & ChatResponse;

type Message = {
  role: MessageSender;
  content: string;
};

interface ElectronAPI {
  checkAvailability: () => Promise<boolean>;
  getModels: () => Promise<ListResponse>;
  sendMessage: (args: {
    model: string;
    messages: Message[];
  }) => Promise<OllamaChatResponse>;
}

declare global {
  interface Window {
    api: ElectronAPI;
  }
}
