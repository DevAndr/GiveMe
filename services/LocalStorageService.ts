export default class LocalStorageService {
    static setValueObject(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value))
    }

    static setValue(key: string, value: any) {
        localStorage.setItem(key, `${value}`)
    }

    static getValue<T = string>(key: string): T | null {
        const value = localStorage.getItem(key)
        return value as T ?? null
    }

    static getValueObject<T>(key: string): T | null {
        const value = localStorage.getItem(key)
        return value ? JSON.parse(value) as T : null
    }

    static remove(key: string) {
        localStorage.removeItem(key)
    }
}
