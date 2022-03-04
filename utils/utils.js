import { apiRoute } from "config/config"

export const utilValSearch = (val = '') => {
    return val?.toLowerCase()?.trim()?.replaceAll(' ', '')
}

export const utilFetch = async (url, method, values) => {
    const req = await fetch(`${apiRoute}/api/${url}`, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
    })
    const res = await req.json()
    return res
}

export const utilFetchGet = async (url) => {
    const res = await fetch(`${apiRoute}/api/${url}`)
    const data = await res.json()
    return data
}
