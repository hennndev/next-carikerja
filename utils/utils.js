export const utilValSearch = (val) => {
    return val.toLowerCase().trim().replaceAll(' ', '')
}


export const utilFetch = async (url, method, values) => {
    const req = await fetch(`http://localhost:3000/api/${url}`, {
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
    const req = await fetch(`http://localhost:3000/api/${url}`)
    const res = await req.json()
    return res
}
