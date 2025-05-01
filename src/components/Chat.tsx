import { useState } from "react";
import "./Chat.css";

type Message = {
  sender: "user" | "bot";
  text: string;
};

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [userName, setUserName] = useState<string | null>(null);
  const [showOptions, setShowOptions] = useState(false);
  const [availableOptions, setAvailableOptions] = useState<string[]>([
    "História 📖",
    "Títulos 🏆",
    "Redes Sociais 🌐",
    "Jogadores da FURIA 👥",
    "Últimas Partidas 🖥️",
  ]);
  const [chatEnded, setChatEnded] = useState(false);
  const [started, setStarted] = useState(false);
  const [awaitingConsent, setAwaitingConsent] = useState(false);
  const [, setRating] = useState<number | null>(null); // Variável 'rating' mantida
  const [chatDisabled, setChatDisabled] = useState(false);
  const [ratingGiven, setRatingGiven] = useState(false);

  const handleSend = (customInput?: string) => {
    const finalInput = customInput || input.trim();
    // sourcery skip: use-braces
    if (!finalInput || chatEnded || chatDisabled) return;

    const userMessage: Message = { sender: "user", text: finalInput };
    setMessages((prev) => [...prev, userMessage]);

    if (!started) {
      setStarted(true);
      setAwaitingConsent(true);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Fala, guerreiro(a)! Quer ficar por dentro de tudo sobre nosso time de CS? Desde a história da FURIA, nossos jogadores até os últimos resultados?",
        },
      ]);
      setInput("");
      return;
    }

    if (awaitingConsent) {
      setAwaitingConsent(false);
      if (finalInput.toLowerCase() === "sim") {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: "Perfeito! Para começarmos, me diga seu nome?",
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: "Beleza! Quando quiser saber mais, é só voltar. 🖤",
          },
        ]);
        setChatEnded(true);
      }
      setInput("");
      return;
    }

    if (!userName) {
      const name = finalInput;
      setUserName(name);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: `Olá ${name}, tudo certo? <br> É um prazer te conhecer!<br>Ficamos muito felizes em saber que você é fã do nosso time de CS. <br><br>Escolha uma das opções abaixo para saber mais sobre nós:`,
        },
      ]);
      setShowOptions(true);
    } else if (showOptions) {
      handleOption(finalInput);
    }

    setInput("");
  };

  const handleOption = (option: string) => {
    const lower = option.toLowerCase();
    let response = "";

    if (lower.includes("história")) {
      response =
        "Fundada em 2017 em Uberlândia, a FURIA brilhou no CS:GO. <br> Foi a primeira das Américas no PGL Major Stockholm e chegou às semifinais no IEM Rio Major 2022. <br> Em 2023, abriu uma nova sede em Mellieħa, Malta.";
    } else if (lower.includes("título") || lower.includes("titulos")) {
      response = `
        DreamHack Masters Spring - 2020 🥇<br />
        IEM New York - 2020 🥇<br />
        ESL PRO League Season 12 - 2020 🥇<br />
        Elisa Masters Espoo - 2023 🥇<br />
      `;
    } else if (lower.includes("rede") || lower.includes("social")) {
      response = `
        Acompanhe a FURIA nas redes sociais:<br />
        <a href="https://www.instagram.com/furiagg" target="_blank" style="color: #fff;">Instagram</a><br />
        <a href="https://twitter.com/furiagg" target="_blank" style="color: #fff;">Twitter</a><br />
        <a href="https://www.youtube.com/@FURIAggCS" target="_blank" style="color: #fff;">YouTube</a><br />
      `;
    } else if (lower.includes("jogadores")) {
      response =
        "Jogadores atuais da FURIA:<br> FalleN, yuurih, molodoy, KSCERATO, YEKINDAR.<br />Coach: sidde.";
    } else if (lower.includes("últimas partidas")) {
      response = `
        <strong>PGL Bucharest 2025</strong><br />
        09/04 | FURIA 0 x 2 The MongolZ<br />
        08/04 | FURIA 0 x 2 Virtus.pro<br />
        07/04 | FURIA 1 x 2 Complexity<br />
        06/04 | FURIA 2 x 0 Betclic<br /><br />
        
        <strong>BLAST Open Lisbon 2025</strong><br />
        22/03 | FURIA 1 x 2 M80<br />
        20/03 | FURIA 0 x 2 NAVI<br /><br />
        
        <strong>ESL Pro League</strong><br />
        10/03 | FURIA 1 x 2 Falcons<br />
        09/03 | FURIA 2 x 1 MIBR<br />
        08/03 | FURIA 0 x 2 Liquid<br />
        07/03 | FURIA 1 x 2 MOUZ<br /><br />
        
        <strong>IEM Katowice 2025</strong><br />
        03/02 | FURIA 1 x 2 Astralis<br />
      `;
    } else {
      response = "Hmm... não entendi. Tente clicar em uma das opções abaixo.";
    }

    setMessages((prev) => [...prev, { sender: "bot", text: response }]);
    setAvailableOptions((prev) =>
      prev.filter((opt) => !lower.includes(opt.toLowerCase()))
    );

    setTimeout(() => {
      if (availableOptions.length > 1) {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "Quer saber mais alguma coisa?" },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: "Essas eram todas as informações! Obrigado por conversar comigo! 🖤",
          },
        ]);
        setShowOptions(false);
        setChatEnded(true);
      }
    }, 500);
  };

  const handleRating = (stars: number) => {
    setRating(stars); // Agora, o valor de 'rating' é utilizado aqui
    setRatingGiven(true);
    setMessages((prev) => [
      ...prev,
      {
        sender: "bot",
        text: `Você avaliou com ${stars} estrela(s). Muito obrigado!`,
      },
    ]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Agradecemos muito a sua avaliação. Até a próxima! GO FURIA 👊🖤",
        },
      ]);
      setChatDisabled(true);
    }, 1000);

    setTimeout(() => {
      setChatEnded(true);
    }, 5000);
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

        {awaitingConsent && (
          <div className="options">
            <button onClick={() => handleSend("Sim")}>Sim</button>
            <button onClick={() => handleSend("Não")}>Não</button>
          </div>
        )}

        {showOptions && !chatEnded && (
          <div className="options">
            {availableOptions.map((opt, index) => (
              <button key={index} onClick={() => handleSend(opt)}>
                {opt}
              </button>
            ))}
          </div>
        )}

        {chatEnded && !ratingGiven && (
          <div className="rating">
            <p>Avalie nosso atendimento:</p>
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} onClick={() => handleRating(star)}>
                {star}⭐
              </button>
            ))}
          </div>
        )}
      </div>

      {!chatEnded && !chatDisabled && (
        <div className="chat-input">
          <input
            type="text"
            placeholder="Digite sua mensagem..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button onClick={() => handleSend()}>Enviar</button>
        </div>
      )}
    </div>
  );
};

export default Chat;
