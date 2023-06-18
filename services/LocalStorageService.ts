class LocalStorageService {
    add(field: string, value: string) {
        localStorage.setItem(field, value)
    }

    remove(field: string) {
        localStorage.removeItem(field)
    }

    update(field: string, value: string) {
        localStorage.removeItem(field)
        localStorage.setItem(field, value)
    }

    get(field: string) {
        return localStorage.getItem(field)
    }
}

export default new LocalStorageService()