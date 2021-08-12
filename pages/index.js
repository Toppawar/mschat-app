import { useState } from "react";

import useUser from "../src/hooks/useUser";

import { GoogleIcon, ChatIcon } from "../src/components/Icons";

import Loader from "../src/components/Loader";

export default function Home() {
  const { loginWithGoogle } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    loginWithGoogle()
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  };

  return (
    <div className="flex items-center justify-center shadow-md h-full">
      <div className="flex flex-col items-center justify-center max-w-xl w-full mx-4 p-8 rounded-md shadow-card bg-white dark:bg-coolDark-600 transition-all">
        <h2 className="mb-2 text-3xl flex items-center">
          <ChatIcon />
          MSChat
        </h2>
        <p className="mb-8 text-lg text-center">
          Es como cualquier sistema de mensajeria, nada nuevo.
        </p>
        <button
          onClick={handleLogin}
          className="rounded shadow-button pl-6 pr-8 py-3 bg-white hover:bg-gray-50 text-gray-600 font-medium flex items-center justify-center overflow-y-hidden focus:outline-none focus:ring focus:ring-primary-500 focus:ring-opacity-75"
        >
          <GoogleIcon />
          Entra con Google
        </button>
        {isLoading ? (
          <div className="mt-5">
            <Loader />
          </div>
        ) : null}
      </div>
    </div>
  );
}
