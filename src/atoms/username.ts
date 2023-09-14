import { atom } from "recoil";

export const usernameState = atom({
    key: "usernameState",
    default: "",
});

export const nameState = atom({
    key: "nameState",
    default: "",
});
