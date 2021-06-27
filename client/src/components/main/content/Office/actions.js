
export const GET_STATE = (fn)=> fn({ app:"office", type:"GET_STATE" })

export const GET_MODE = (fn, payload)=> fn({ app:"office", type:"GET_MODE", payload })

export const ADD_INVOICE = (fn, payload)=> fn({ app:"office", type:"ADD_INVOICE"})