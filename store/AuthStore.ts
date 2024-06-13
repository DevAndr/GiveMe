import {create} from "zustand";

type State = {
    signInDialog: {
        show: boolean
    },
    signUpDialog: {
        show: boolean
    }
}

type Actions = {
    hideSignInDialog: () => void
    openSignInDialog: () => void
    hideSignUpDialog: () => void
    openSignUpDialog: () => void
}

const useAuthDialogsStore = create<State & Actions>((set, get) => ({
    signUpDialog: {
        show: false
    },
    signInDialog: {
        show: false
    },
    hideSignInDialog: () => {
        set({signInDialog: {show: false}})
    },
    openSignInDialog: () => {
        set({signInDialog: {show: true}})
    },
    hideSignUpDialog: () => {
        set({signUpDialog: {show: false}})
    },
    openSignUpDialog: () => {
        set({signUpDialog: {show: true}})
    },
}))
export default useAuthDialogsStore