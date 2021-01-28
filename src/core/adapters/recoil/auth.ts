import Auth from "@entities/auth";
import { atom } from "recoil";

export const authAtom = atom<Auth>({
  key: "ListUserStore",
  default: new Auth(),
});
