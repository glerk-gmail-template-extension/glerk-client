import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

import axios from "../api/axiosConfig";

export const toastMessageAtom = atom({ message: null, isWarning: true });

export const tokenAtom = atomWithStorage("xauth", "");

export const isLoggedInAtom = atom((get) => !!get(tokenAtom));

export const groupsAtom = atom([]);

export const groupsAsyncAtom = atom(
  async (get) => get(groupsAtom),
  async (_get, set) => {
    const { data } = await axios.get("/v1/groups");
    set(groupsAtom, data);
  },
);
