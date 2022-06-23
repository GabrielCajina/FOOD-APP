import create from "zustand";
interface UseMenu {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
}
export const useMenu = create<UseMenu>((set) => ({
  isOpen: false,
  setIsOpen: (v) => set({ isOpen: v }),
}));
