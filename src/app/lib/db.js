"use server"

import asyncRedis from 'async-redis'

async function connect() {
    return asyncRedis.createClient({
        url: 'redis://127.0.0.1:6379/0'
    });
}

const addClick = async (user_id, value) => {
    const client = await connect();
    await client.set(`user_counter:${ user_id }`, value)
}

const get = async (user_id) => {
    const client = await connect();
    return await client.get(`user_counter:${ user_id }`)
}
export { addClick, get }
