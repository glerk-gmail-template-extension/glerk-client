import { atom } from "jotai";

import axios from "../api/axiosConfig";

export const toastMessageAtom = atom({ message: null, isWarning: true });

export const userAtom = atom(null);

export const userAsyncAtom = atom(
  async (get) => get(userAtom),
  async (get, set) => {
    try {
      const { data } = await axios.get("/v1/user");
      set(userAtom, {
        username: data.username,
        email: data.email,
        profileUrl: data.profileUrl,
      });
    } catch (error) {
      set(userAtom, null);
    }
  },
);

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
