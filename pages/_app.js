import Head from "next/head";
import Image from "next/image";
import "tailwindcss/tailwind.css";

import { useRouter } from "next/router";

import { useDarkMode } from "../src/hooks/useDarkMode";

import { MoonIcon, SunIcon, ChatIcon } from "../src/components/Icons";

import Button from "../src/components/Button";

import useUser from "../src/hooks/useUser";

import "../styles/globals.css";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  const [darkMode, setDarkMode] = useDarkMode();
  const { user, signOut } = useUser();
  const router = useRouter();

  const ThemeIcon = darkMode ? SunIcon : MoonIcon;

  useEffect(() => {
    if (user && user.username) {
      router.push("/chats");
    } else if (!user && router.pathname !== "/") {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <Head>
        <title>MSChat</title>
        <meta name="description" content="Chat with friends ma dude" />
        <meta
          name="google-site-verification"
          content="9mJAIsqkauCG0Xjoco-Fed997d-paS7G4Rycy6BX3C4"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col h-screen w-full bg-white dark:bg-coolDark-500 dark:text-white transition-colors">
        <main
          className="flex-1"
          // style={{ maxHeight: "calc(100% - var(--topbar-height))" }}
        >
          <header
            className="flex-shrink-0 flex items-center justify-between flex-col sm:flex-row sm:p-2 sm:mx-8 min-h-60 h-auto"
            // style={{ height: "var(--topbar-height)" }}
          >
            <div className="flex row items-center w-auto justify-between">
              <a href={router.pathname}>
                <ChatIcon />
              </a>
              <h1 className="text-4xl ml-6">MSChat</h1>
            </div>

            <div className="flex items-center flex-wrap flex-col sm:flex-row">
              {user ? (
                <div className="flex items-center sm:mr-10 flex-wrap justify-center">
                  <div className="grid sm:grid-cols-2 flex items-center">
                    <div className="mt-5 sm:mt-0 sm:pl-5 sm:pr-5 h-10 sm:border-r-2 dark:border-gray-600 border-gray-400 flex items-center justify-center transition-colors">
                      <div className="m-2">
                        <Image
                          src={user.avatar}
                          width={45}
                          height={45}
                          className="rounded-full"
                          alt="avatar"
                        />
                      </div>
                      <span>{user.username}</span>
                    </div>
                    <div className="m-5">
                      <Button onClick={signOut}>Desconectarse</Button>
                    </div>
                  </div>
                </div>
              ) : null}
              <ThemeIcon
                className="h-8 w-8 cursor-pointer"
                onClick={() => setDarkMode((prev) => !prev)}
              />
            </div>
          </header>
          {user || (!user && router.pathname === "/") ? (
            <Component {...pageProps} />
          ) : null}
        </main>
      </div>
    </>
  );
}

export default MyApp;
