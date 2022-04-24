import { atom } from "recoil";

export const taskState = atom({
  key: "taskState",
  default: "",
});

export const deadlineState = atom({
  key: "deadlineState",
  default: null,
});

export const memoState = atom({
  key: "memoState",
  default: "",
});
