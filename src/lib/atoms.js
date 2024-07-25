import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

import axios from "../api/axiosConfig";

export const toastMessageAtom = atom({ message: null, isWarning: true });

export const tokenAtom = atomWithStorage("xauth", "");

export const isLoggedInAtom = atom((get) => !!get(tokenAtom));

export const searchCriteriaAtom = atom({
  groupId: 0,
  templateName: "",
});

export const groupsAtom = atom([]);

export const groupsAsyncAtom = atom(
  async (get) => get(groupsAtom),
  async (get, set) => {
    const searchParams = new URLSearchParams(get(searchCriteriaAtom));
    const { data } = await axios.get(`/v1/groups?${searchParams}`);
    set(groupsAtom, data);
  },
);

const groupOptionsAtom = atom([]);

export const groupOptionsAsyncAtom = atom(
  async (get) => get(groupOptionsAtom),
  async (get, set) => {
    const { data: groups } = await axios.get(`/v1/groups`);
    set(
      groupOptionsAtom,
      groups.map((group) => ({ id: group.id, name: group.name })),
    );
  },
);
