import { useState } from "react";
import "./Chat.css";

type Message = {
  sender: "user" | "bot";
  text: string;
};

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Olá, sou o chatbot da FURIA! <br>Qual o seu nome?",
    },
  ]);
  const [input, setInput] = useState("");
  const [userName, setUserName] = useState<string | null>(null);
  const [showOptions, setShowOptions] = useState(false);
  const [availableOptions, setAvailableOptions] = useState<string[]>([
    "História",
    "Títulos",
    "Redes Sociais",
    "Jogadores da FURIA",
  ]);
  const [chatEnded, setChatEnded] = useState(false);

  const handleSend = (customInput?: string) => {
    const finalInput = customInput || input;
    if (finalInput.trim() === "") return;

    const userMessage: Message = { sender: "user", text: finalInput };
    setMessages((prev) => [...prev, userMessage]);

    if (chatEnded) {
      return;
    }

    if (!userName) {
      setUserName(finalInput.trim());
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: `Olá ${finalInput.trim()}, Tudo Bem? <br> Soube que você é fã do nosso time de CS`,
        },
        {
          sender: "bot",
          text: "Escolha uma opção abaixo para saber mais sobre nós:",
        },
      ]);
      setShowOptions(true);
    } else if (showOptions) {
      handleOption(finalInput.trim());
    }

    setInput("");
  };

  const handleOption = (option: string) => {
    const optionLower = option.toLowerCase();
    let response = "";

    if (optionLower.includes("história")) {
      response =
        "Fundada em 2017 em Uberlândia, a FURIA se destacou no CS:GO. Foi a primeira das Américas a se classificar para o PGL Major Stockholm e chegou às semifinais no IEM Rio Major 2022. A organização já possuía escritórios menores em São Paulo e nos Estados Unidos, mas foi em novembro de 2020 que anunciou uma estrutura maior na capital paulista, visando acomodar funcionários e times profissionais. Em 2023, a FURIA também anunciou uma nova sede em Mellieħa, Malta, para facilitar a disputa de torneios na Europa.";
    } else if (
      optionLower.includes("título") ||
      optionLower.includes("titulos")
    ) {
      response = `
    1 - ESL Pro League Season 12 - América do Norte (2020)<br />
    2 - DreamHack Masters Spring (2020)<br />
    3 - CS:GO Championship - ECS Season 7 Finals (2019)
  `;
    } else if (optionLower.includes("rede") || optionLower.includes("social")) {
      response = `
      Siga nós nas redes sociais <br>
<a href="https://www.instagram.com/furiagg" target="_blank" style="color: #fff; text-decoration: none;">Instagram</a><br />
<a href="https://twitter.com/furiagg" target="_blank" style="color: #fff; text-decoration: none;">Twitter</a><br />
<a href="https://www.youtube.com/@FURIAggCS" target="_blank" style="color: #fff; text-decoration: none;">Youtube</a><br />
    `;
    } else if (optionLower.includes("jogadores")) {
      response =
        "Os atuais Jogadores da Furia são:<br> FalleN, yuurih, molodoy, KSCERATO, YEKINDAR, <br> e o Coach: sidde.";
    } else {
      response = "Não entendi bem. Tente clicar em uma das opções!";
    }

    setMessages((prev) => [...prev, { sender: "bot", text: response }]);

    setAvailableOptions((prev) =>
      prev.filter((opt) => !optionLower.includes(opt.toLowerCase()))
    );

    setTimeout(() => {
      if (availableOptions.length > 1) {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "Quer saber sobre mais alguma coisa?" },
        ]);
        setShowOptions(true);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: "Essas eram todas as informações que eu tinha! Obrigado por conversar comigo! 🖤",
          },
        ]);
        setShowOptions(false);
        setChatEnded(true); // termina o chat aqui
      }
    }, 500);
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.sender === "bot" ? (
              <div dangerouslySetInnerHTML={{ __html: msg.text }} />
            ) : (
              msg.text
            )}
          </div>
        ))}
        {showOptions && !chatEnded && (
          <div className="options">
            {availableOptions.map((opt, index) => (
              <button key={index} onClick={() => handleSend(opt)}>
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Digite sua mensagem..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          disabled={chatEnded}
        />
        <button onClick={() => handleSend()} disabled={chatEnded}>
          Enviar
        </button>
      </div>
    </div>
  );
};

export default Chat;
