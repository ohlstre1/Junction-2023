import { makeAutoObservable } from "mobx"

class ThemeStore {
    theme = 'dark'

    constructor() {
        makeAutoObservable(this)
    }

    setTheme = (nemTheme: string) => {
        this.theme = nemTheme;
    }
}

const themeStore = new ThemeStore()
export default themeStore;