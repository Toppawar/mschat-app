import { useState } from "react";

import useUser from "../src/hooks/useUser";

import { GoogleIcon, ChatIcon } from "../src/components/Icons";

import Button from "../src/components/Button";

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
        <Button onClick={handleLogin}>
          <GoogleIcon />
          Entra con Google
        </Button>
        {isLoading ? (
          <div className="mt-5">
            <Loader />
          </div>
        ) : null}
      </div>
    </div>
  );
}
