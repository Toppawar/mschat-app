import { useState, useEffect, useCallback } from "react";

export function useLocalStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item =
        typeof window !== "undefined" ? window?.localStorage.getItem(key) : "";
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window?.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

export function useMedia(queries, values, defaultValue) {
  // Array containing a media query list for each query
  const mediaQueryLists =
    typeof window !== "undefined"
      ? queries.map((q) => window?.matchMedia(q))
      : [];

  // Function that gets value based on matching media query
  const getValue = useCallback(() => {
    // Get index of first media query that matches
    const index = mediaQueryLists.findIndex((mql) => mql.matches);
    // Return related value or defaultValue if none
    return typeof values[index] !== "undefined" ? values[index] : defaultValue;
  }, [mediaQueryLists, values, defaultValue]);

  // State and setter for matched value
  const [value, setValue] = useState(getValue);

  useEffect(() => {
    // Event listener callback
    // Note: By defining getValue outside of useEffect we ensure that it has ...
    // ... current values of hook args (as this hook callback is created once on mount).
    const handler = () => setValue(getValue);
    // Set a listener for each media query with above handler as callback.
    mediaQueryLists.forEach((mql) => mql.addListener(handler));
    // Remove listeners on cleanup
    return () => mediaQueryLists.forEach((mql) => mql.removeListener(handler));
  }, [getValue, mediaQueryLists]);

  return value;
}

export function useDarkMode() {
  // See if user has set a browser or OS preference for dark mode.
  const prefersDarkMode = useMedia(
    ["(prefers-color-scheme: dark)"],
    [true],
    false
  );

  // Use our useLocalStorage hook to persist state through a page refresh
  const [enabled, setEnabled] = useLocalStorage(
    "dark-mode-enabled",
    prefersDarkMode
  );

  // Fire off effect that add/removes dark mode class
  useEffect(
    () => {
      const className = "dark";
      const element = window?.document.body;
      if (enabled) {
        element.classList.add(className);
      } else {
        element.classList.remove(className);
      }
    },
    [enabled] // Only re-call effect when value changes
  );

  // Return enabled state and setter
  return [enabled, setEnabled];
}
