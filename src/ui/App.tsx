import { Chat } from "./components/Chat"
import { Topbar } from "./components/Topbar"
import { ChatContextProvider } from "./context/ChatContext"

const App = () => {

  return (
    <div className="flex flex-col w-screen h-screen">
      <ChatContextProvider>
        <Topbar />
        <Chat />
      </ChatContextProvider>
    </div>
  )
}

export default App
