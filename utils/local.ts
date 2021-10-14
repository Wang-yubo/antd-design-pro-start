const Storage = {
    l: {
        set(key: string, value: object | string) {
            localStorage.setItem(
                key,
                value instanceof Object ? JSON.stringify(value) : value
            )
        },
        get(key: string) {
            try {
                const value: any = localStorage.getItem(key)
                return JSON.parse(value)
            } catch (e) {
                return localStorage.getItem(key)
            }
        },
        del(key: string) {
            localStorage.removeItem(key)
        },
        clear() {
            localStorage.clear()
        },
    },
    s: {
        set(key: string, value: object | string) {
            sessionStorage.setItem(
                key,
                value instanceof Object ? JSON.stringify(value) : value
            )
        },
        get(key: string) {
            try {
                const value: any = sessionStorage.getItem(key)
                return JSON.parse(value)
            } catch (e) {
                return sessionStorage.getItem(key)
            }
        },
        del(key: string) {
            sessionStorage.removeItem(key)
        },
        clear() {
            sessionStorage.clear()
        },
    }
}

export {Storage}
