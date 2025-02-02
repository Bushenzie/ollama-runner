import { Chat } from "./components/Chat"
import { Topbar } from "./components/Topbar"

const App = () => {

  return (
    <div className="flex flex-col w-screen h-screen">
      <Topbar />
      <Chat />
    </div>
  )
}

export default App
