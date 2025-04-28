import Chat from "./components/Chat";
import "./index.css";

function App() {
  return (
    <div className="app-container">
      <div className="bg-image" />
      <div className="content">
        <h1 className="title">FURIA CHATBOT</h1>
        <Chat />
      </div>
    </div>
  );
}

export default App;
