import {create} from "zustand";

type State = {
    isAuth: boolean
    dialog: {
        show: boolean
    }
}

type Actions = {
    hideDialog: () => void
    openDialog: () => void
}

const useAuthStore = create<State & Actions>((set, get) => ({
    isAuth: false,
    dialog: {
        show: false
    },
    hideDialog: () => {
        set({dialog: {show: false}})
    },
    openDialog: () => {
        set({dialog: {show: true}})
    }
}))