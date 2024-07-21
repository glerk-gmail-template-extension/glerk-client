import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const toastMessageAtom = atom(null);
export const isLoggedInAtom = atomWithStorage("isLoggedIn", false);
