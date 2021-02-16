import { getUser } from './functions'


export const initialState = {
  initialState: true,
  drive:{
    nav: false,
    auth: false,
    copy: false
  },
  user: getUser()
}