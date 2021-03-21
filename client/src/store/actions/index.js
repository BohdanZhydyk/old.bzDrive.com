import { statistic } from './statistic'
import { drive } from './drive'
import { news } from './news'
import { cv } from './cv'

const actions = (action, state, setState)=>{
  switch(action.app){
    case "statistic":		statistic(action, state, setState);		break
    case "drive":				drive(action, state, setState);				break
    case "news":				news(action, state, setState);				break
    case "cv":					cv(action, state, setState);					break
    default: break
  }
}

export default actions