import { create } from 'zustand';

type LoginStore = {
    loginPromptVisible: boolean;
    signupPromptVisible: boolean;

    setSignupPromptVisible: (value: boolean) => void;
    setLoginPromptVisible: (value: boolean) => void;
}

export const UseLoginStore = create<LoginStore>((set) => ({
    loginPromptVisible: false,
    signupPromptVisible: false,

    setSignupPromptVisible: (value) => set({ signupPromptVisible: value }),
    setLoginPromptVisible: (value) => set({ loginPromptVisible: value })
}))