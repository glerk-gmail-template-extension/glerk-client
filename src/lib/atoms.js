import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const toastMessageAtom = atom({ message: null, isWarning: true });

export const tokenAtom = atomWithStorage("xauth", "");

export const isLoggedInAtom = atom((get) => !!get(tokenAtom));
