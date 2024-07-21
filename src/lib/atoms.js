import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const toastMessageAtom = atom(null);
export const tokenAtom = atomWithStorage(
  "xauth",
  "",
  {
    getItem(key, initialValue) {
      return localStorage.getItem(key) || initialValue;
    },
    setItem(key, value) {
      localStorage.setItem(key, value);
    },
    removeItem(key) {
      localStorage.removeItem(key);
    },
    subscribe(key, callback, initialValue) {
      if (
        typeof window === "undefined" ||
        typeof window.addEventListener === "undefined"
      ) {
        return;
      }
      window.addEventListener("storage", (e) => {
        if (e.storageArea === localStorage && e.key === key) {
          const newValue = e.newValue || initialValue;
          callback(newValue);
        }
      });
    },
  },
  {
    getOnInit: true,
  },
);
export const isLoggedInAtom = atom((get) => !!get(tokenAtom));
