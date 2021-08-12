import Head from "next/head";
import Image from "next/image";

import { useRouter } from "next/router";

import { useDarkMode } from "../src/hooks/useDarkMode";

import { MoonIcon, SunIcon, ChatIcon } from "../src/components/Icons";

import useUser from "../src/hooks/useUser";

import "../styles/globals.css";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  const [darkMode, setDarkMode] = useDarkMode();
  const { user, signOut } = useUser();
  const router = useRouter();

  // console.log(user);

  const ThemeIcon = darkMode ? SunIcon : MoonIcon;

  useEffect(() => {
    if (user && user.username) {
      router.push("/chats");
    } else if (!user && router.pathname !== "/") {
      router.push("/");
    }
  }, [user, router]);

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
      <div className="flex flex-col h-screen w-screen bg-white dark:bg-coolDark-500 dark:text-white transition-colors">
        <main
          className="flex-1"
          style={{ maxHeight: "calc(100% - var(--topbar-height))" }}
        >
          <header
            className="flex-shrink-0 flex items-center justify-between px-4 sm:px-8 shadow-md"
            style={{ height: "var(--topbar-height)" }}
          >
            <div className="flex row items-center w-auto justify-between">
              <a href={router.pathname}>
                <ChatIcon />
              </a>
              <h1 className="text-4xl ml-6">MSChat</h1>
            </div>

            <div className="flex items-center">
              {user ? (
                <div className="flex items-center mr-10">
                  <Image
                    src={user.avatar}
                    width={45}
                    height={45}
                    className="rounded-full"
                    alt="avatar"
                  />

                  <div className="grid grid-cols-2 flex items-center">
                    <div className="pl-5 pr-5 h-10 border-r-2 dark:border-gray-600 border-gray-400 flex items-center transition-colors">
                      <span>{user.username}</span>
                    </div>
                    <div className="m-5">
                      <button
                        onClick={signOut}
                        className="rounded shadow-button pl-6 pr-8 py-3 bg-white dark:bg-gray-600 dark:text-gray-200 transition-colors hover:bg-gray-50 text-gray-600 font-medium flex items-center justify-center overflow-y-hidden focus:outline-none focus:ring focus:ring-primary-500 focus:ring-opacity-75"
                      >
                        Desconectarse
                      </button>
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
