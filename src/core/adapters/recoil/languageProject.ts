import { atom } from "recoil";

export const LanguageAtom = atom<string>({
  key: "LanguageAtom",
  default: "USA",
});
