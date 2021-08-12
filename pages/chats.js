import { useRef, useState, useEffect } from "react";
import Message from "../src/components/Message";

import useDatabase from "../src/hooks/useDatabase";

const Chats = () => {
  const { data, collectionByRef, setData } = useDatabase("messages");
  const [message, setMessage] = useState("");

  const inputRef = useRef();
  const bottomListRef = useRef();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  const handleOnChange = (e) => {
    setMessage(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const trimmedMessage = message.trim();
    if (trimmedMessage) {
      // Add new message in Firestore
      setData(trimmedMessage);
      // Clear input field
      setMessage("");
      // Scroll down to the bottom of the list
      bottomListRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="overflow-auto h-full">
        <div className="py-4 max-w-screen-lg mx-auto">
          <div className="border-b dark:border-gray-600 border-gray-200 py-8 mb-4 transition-colors">
            <div className="font-bold text-3xl text-center">
              <p className="mb-1">Esto es MSChat</p>
            </div>
            <p className="text-gray-400 text-center">Versión 0.1</p>
          </div>
          <ul>
            {data
              ?.sort((first, second) =>
                first?.createdAt?.seconds <= second?.createdAt?.seconds ? -1 : 1
              )
              ?.map((message) => (
                <li key={message.id}>
                  <Message {...message} />
                </li>
              ))}
          </ul>
          <div ref={bottomListRef} />
        </div>
      </div>
      <div className="mb-6 mx-4">
        <form
          onSubmit={handleOnSubmit}
          className="flex transition-colors flex-row bg-gray-200 dark:bg-coolDark-400 rounded-md px-4 py-3 z-10 max-w-screen-lg mx-auto dark:text-white shadow-md"
        >
          <input
            ref={inputRef}
            type="text"
            value={message}
            onChange={handleOnChange}
            placeholder="Escribe tu mensaje aqui..."
            className="flex-1 bg-transparent outline-none"
          />
          <button
            type="submit"
            disabled={!message}
            className="uppercase font-semibold text-sm tracking-wider text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chats;
